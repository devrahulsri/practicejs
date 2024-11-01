//pages/sitemap.xml.js
function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
    ${Object.keys(posts)
      ?.map((item, index) => {
        const postItem = posts[item].split('\r\n');
        return `
        <url>
        <loc>${postItem[0]}</loc>
        <lastmod>${postItem[1]}</lastmod>
        </url>
      `;
      })
      .join('')}
  </urlset>
`;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(res) {
  // We make an API call to gather the URLs for our site
  const locale = res.locale;
  const krollSiteMap = JSON.parse(process?.env?.SITES || '[]');
  //const hostSite = krollSiteMap.find((x) => x.hostName === res.req.headers.host);
  let site;
  if (locale !== 'en' && locale !== 'en-US') {
    site = krollSiteMap.find((x) => x.language === locale);
  }
  else {
    site = krollSiteMap.find((x) => x.hostName === res.req.headers.host);
  }

  const siteName = site?.name || (process?.env?.JSS_APP_NAME ? process?.env?.JSS_APP_NAME : 'kroll');
  const language = res?.locale;
  const EXTERNAL_DATA_URL = `${process?.env?.SITECORE_API_HOST}/api/kroll/Sitemap/GetContent?sitename=${siteName}&language=${language}`;
  const request = await fetch(EXTERNAL_DATA_URL);
  const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.res.write(sitemap);
  res.res.end();

  return {
    props: { posts },
  };
}

export default SiteMap;
