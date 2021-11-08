import { useRouter } from 'next/router';
import React from 'react';
import { SitemapItem } from '../../../lib/sitemap';
import OpenAPILinks from './OpenAPILinks';
import PageLink from './PageLink';
import ParentMenuItem from './ParentMenuItem';

export default function MenuItem(props: SitemapItem) {
  const router = useRouter();

  if (props.children) return <ParentMenuItem {...props} />;
  if (props.to) {
    if (props.to === '/rest-api/reference' && router.asPath.startsWith('/rest-api'))
      return (
        <>
          <PageLink {...props} />
          <OpenAPILinks />
        </>
      );
    return <PageLink {...props} />;
  }
  return null;
}
