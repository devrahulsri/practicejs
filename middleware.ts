/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';
import middleware from 'lib/middleware';

function containsUppercase(str) {
  return /[A-Z]/.test(str);
}

function containsSpace(str) {
  return str.indexOf(' ') >= 0 || str.indexOf('%20') >= 0;
}

function redirect(req: NextRequest, locale: string) {
  const lowercasePath = `${locale ? `/${locale}` : ''}${req.nextUrl.pathname}`
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('%20', '-');
  const url = new URL(lowercasePath + req.nextUrl.search, req.url);
  return NextResponse.redirect(url);
}

// eslint-disable-next-line
export default async function (req: NextRequest, ev: NextFetchEvent) {
  const sitemap = JSON.parse(process.env.KROLLSITEMAP || '[]');
  const siteName = req.cookies.get('sc_site');
  const site = sitemap.find((x) => x.locale === req.nextUrl.locale);

  const PUBLIC_FILE = /\.(.*)$/;

  const response = NextResponse.next();
  const allowedOrigins = process.env.ORIGINS || '[]';
  const origin = req.headers.get('origin') ?? req.headers.origin ?? '';
  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    //response.headers.append('Access-Control-Allow-Origin', origin);
  }

  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (
    req.nextUrl.locale === 'en-US' &&
    siteName?.value !== 'kroll_ppc' &&
    process.env.JSS_APP_NAME !== 'kroll_ppc'
  ) {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en';

    return redirect(req, locale);
  }

  if (containsUppercase(req.nextUrl.pathname) || containsSpace(req.nextUrl.pathname)) {
    return redirect(req, req.nextUrl.locale);
  }
  if (site) {
    req.nextUrl.searchParams.set('sc_site', site.siteName);
  }

  if (siteName?.value === 'kroll_ppc' || process.env.JSS_APP_NAME === 'kroll_ppc') {
    req.nextUrl.searchParams.set('sc_lang', 'en');
    req.nextUrl.locale = 'en';
  }
  return middleware(req, ev);
}

export const config = {
  /*
   * Match all paths except for:
   * 1. /api routes
   * 2. /_next (Next.js internals)
   * 3. /sitecore/api (Sitecore API routes)
   * 4. /- (Sitecore media)
   * 5. /healthz (Health check)
   * 6. all root files inside /public
   */
  matcher: ['/', '/((?!api/|healthz|sitecore/api/|-/|favicon.png|sc_logo.svg).*)'],
};
