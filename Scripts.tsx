/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { VisitorIdentification, withSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Script from 'next/script';

const Scripts = ({ sitecoreContext }): JSX.Element => {
  const metaData = sitecoreContext?.route?.placeholders?.content
    ?.filter((item) => item?.componentName === 'MetaData')
    .pop();
  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <Script src="https://code.jquery.com/jquery-3.5.1.min.js" strategy="beforeInteractive" />
      <Script src="/db.js" />
      <Script src="/scroll.js" />

      {metaData?.fields?.['OneTrust Identifier'] ? (
        <>
          <Script
            type="text/javascript"
            src={`https://cdn.cookielaw.org/consent/${metaData?.fields?.['OneTrust Identifier']}/OtAutoBlock.js`}
          />

          <Script
            src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
            type="text/javascript"
            charset="UTF-8"
            data-document-language="true"
            data-domain-script={metaData?.fields?.['OneTrust Identifier']}
          />
          <Script type="text/javascript" id="onetrust">
            function OptanonWrapper() {}
          </Script>
        </>
      ) : null}

      {metaData?.fields?.['Google Tag ID'] ? (
        <Script id="google-analytics" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${metaData?.fields?.['Google Tag ID']}');`}
        </Script>
      ) : null}
      {/* End Google Tag Manager (noscript) */}
      {/* searchstax analytics */}
      <Script strategy="beforeInteractive" type="text/javascript" id="searchstaxanalytics">
        {`var _msq = _msq || []; //declare object
        var analyticsBaseUrl = 'https://analytics-eu-west.searchstax.com';
        function SearchStaxAnalytics() {
          var ms = document.createElement("script");
          ms.type = "text/javascript";
          ms.src = "https://static.searchstax.com/studio-js/v3/js/studio-analytics.js";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(ms, s);
        }
        SearchStaxAnalytics();`}
      </Script>
      <Script strategy="beforeInteractive" type="text/javascript" id="setSearchCookie">
        {`function getAnalyticsCookie(e) {
          var t = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
          return t ? decodeURIComponent(t[1]) : void 0;
          }
          function setAnalyticsCookie(e, t) {
              var n = encodeURIComponent(e) + "=" + encodeURIComponent(t) + "; path=/; secure; max-age=3600";
              document.cookie = n;
          }
          function makeid(e) {
              for (var t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = n.length, i = 0; i < e; i++) t += n.charAt(Math.floor(Math.random() * r));
              return t;
          }
          function getOrSetAnalyticsCookie(e) {
              var t = getAnalyticsCookie(e);
              null == t && ((t = makeid(25)), setAnalyticsCookie(e, t));
          }
          getOrSetAnalyticsCookie("searchcookie")`}
      </Script>
      <VisitorIdentification />
    </>
  );
};

export default withSitecoreContext()(Scripts);
