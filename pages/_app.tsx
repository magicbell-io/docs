// @ts-ignore
import { MDXProvider } from '@mdx-js/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/material.css';
import Callout from '../src/components/Callout';
import Card from '../src/components/Card';
import HighlightedCode from '../src/components/code/HighlightedCode';
import Grid from '../src/components/Grid';
import NotificationInboxPreview from '../src/components/magicbell/NotificationInboxPreview';
import Table from '../src/components/Table';
import Tabs from '../src/components/tabs/Tabs';

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
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
