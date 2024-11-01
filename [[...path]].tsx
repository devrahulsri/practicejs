import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import NotFound from 'src/NotFound';
import Layout from 'src/Layout';
//import url from 'url';
import { URL } from 'url';
import {
  RenderingType,
  SitecoreContext,
  ComponentPropsContext,
  EditingComponentPlaceholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { handleEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { componentBuilder } from 'temp/componentBuilder';

const SitecorePage = ({
  notFound,
  componentProps,
  layoutData,
  headLinks,
}: SitecorePageProps): JSX.Element => {
  useEffect(() => {
    // Since Sitecore editors do not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
    handleEditorFastRefresh();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'prevUrl',
      Boolean(localStorage.getItem('currentUrl')) ? String(localStorage.getItem('currentUrl')) : ''
    );
    localStorage.setItem('currentUrl', location.href);
  });

  if (notFound || !layoutData.sitecore.route) {
    // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
    return <NotFound />;
  }

  const isEditing = layoutData.sitecore.context.pageEditing;
  const isComponentRendering =
    layoutData.sitecore.context.renderingType === RenderingType.Component;

  return (
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext
        componentFactory={componentBuilder.getComponentFactory({ isEditing })}
        layoutData={layoutData}
      >
        {/*
          Sitecore Pages supports component rendering to avoid refreshing the entire page during component editing.
          If you are using Experience Editor only, this logic can be removed, Layout can be left.
        */}
        {isComponentRendering ? (
          <EditingComponentPlaceholder rendering={layoutData.sitecore.route} />
        ) : (
          <Layout layoutData={layoutData} headLinks={headLinks} />
        )}
      </SitecoreContext>
    </ComponentPropsContext>
  );
};

// This function gets called at request time on server-side.
export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await sitecorePagePropsFactory.create(context);
  context?.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  console.log('context set response', context.res.getHeader('Cache-Control'));

  const contextURL = context?.locale
    ? '/' +
      context.locale +
      (context.req.url?.startsWith('/?') ? context.req.url.substring(1) : context.req.url)
    : context.req.url;
  const sourceurl = contextURL?.endsWith('/') ? contextURL.replace(/.$/, '') : contextURL;
  const urlQuery = new URL(`${process?.env?.SITECORE_API_HOST}${context.req.url}`)?.search;
  console.log('urlQuery', urlQuery);
  const targeturl =
    props?.layoutData?.sitecore?.context?.itemPath + decodeURIComponent(urlQuery) ?? '';
  console.log('targeturl', targeturl);
  console.log('decodedQuery', decodeURIComponent(urlQuery));
  const shouldRewrite =
    props?.layoutData?.sitecore?.context?.site?.name?.toLowerCase() !== 'kroll_ppc' &&
    props?.layoutData?.sitecore?.context?.site?.name?.toLowerCase() !== 'kroll_careers' &&
    sourceurl &&
    !targeturl?.includes('404') &&
    !sourceurl?.includes('.json') &&
    targeturl.toLowerCase() !== sourceurl.toLowerCase() &&
    !urlQuery;
  console.log('shouldRewrite', shouldRewrite);
  //
  if (shouldRewrite && targeturl && targeturl?.toLowerCase() !== sourceurl.toLowerCase()) {
    return {
      props,
      notFound: props.notFound,
      redirect: {
        destination: targeturl,
        permanent: false,
      },
    };
  } else {
    return {
      props,
      notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
    };
  }
};

export default SitecorePage;
