import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { GetStaticProps } from 'next';
import { SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs';
import SitecorePage from './[[...path]]';
// import NotFound from 'src/NotFound';

export const getStaticProps: GetStaticProps = async (context) => {
  let props = { notFound: false };
  props = await sitecorePagePropsFactory.create({
    ...context,
    params: { ...context.params, path: '/_404' },
  });
  // if (props) {
  return {
    props,
    revalidate: 5, // In seconds
    notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
  };
  // } else {
  //   return <NotFound />;
  // }
};

export default function Custom404Page({
  notFound,
  layoutData,
  componentProps,
  headLinks,
}: SitecorePageProps): JSX.Element {
  return (
    <SitecorePage
      notFound={notFound}
      layoutData={layoutData}
      componentProps={componentProps}
      headLinks={headLinks}
      dictionary={{}}
      locale=""
      site={layoutData?.sitecore?.context?.site as SiteInfo}
    />
  );
}
