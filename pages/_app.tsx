// @ts-ignore
import { MDXProvider } from '@mdx-js/react';
import type { AppProps } from 'next/app';
import Callout from '../src/components/Callout';
import Card from '../src/components/Card';
import HighlightedCode from '../src/components/code/HighlightedCode';
import Grid from '../src/components/Grid';
import dynamic from 'next/dynamic';
import Table from '../src/components/Table';
import Tabs from '../src/components/tabs/Tabs';
import '../styles/globals.css';
import '../styles/material.css';
import 'botz/styles.css';
import { SupportWidget } from '@magicbell/support-widget';

const NotificationInboxPreview = dynamic(
  import('../src/components/magicbell/NotificationInboxPreview'),
);

const components = {
  code: HighlightedCode,
  table: Table,
  Note: Callout,
  Grid,
  Card,
  Tabs,
  HighlightedCode,
  NotificationInboxPreview,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
      <SupportWidget />
    </>
  );
}

export default MyApp;
