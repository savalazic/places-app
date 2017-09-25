import React from 'react';
import Head from 'next/head';
import stylesheet from '../styles/style.styl';

export default () => (
  <Head>
    <title>Places</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="robots" content="noindex" />
    <meta httpEquiv="cache-control" content="max-age=0" />
    <meta httpEquiv="cache-control" content="no-cache" />
    <meta httpEquiv="expires" content="0" />
    <meta httpEquiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta httpEquiv="pragma" content="no-cache" />
    <link rel="shortcut icon" href="/static/assets/icons/favicon.png" />
    <style dangerouslySetInnerHTML={{ __html: stylesheet.replace(/\n/g, '') }} />
  </Head>
);
