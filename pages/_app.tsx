// @ts-ignore
import { MDXProvider } from '@mdx-js/react';
import type { AppProps } from 'next/app';
import { Intercom, LiveChatLoaderProvider } from 'react-live-chat-loader';
import Callout from '../src/components/Callout';
import Card from '../src/components/Card';
import HighlightedCode from '../src/components/code/HighlightedCode';
import Grid from '../src/components/Grid';
import dynamic from 'next/dynamic';
import Table from '../src/components/Table';
import Tabs from '../src/components/tabs/Tabs';
import '../styles/globals.css';
import '../styles/material.css';

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
      <LiveChatLoaderProvider provider="intercom" providerKey="d0f6dew9">
        <Intercom color="rgb(82, 37, 193)" />
      </LiveChatLoaderProvider>
    </>
  );
}

export default MyApp;
