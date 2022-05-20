import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React, { ReactNode } from 'react';
import DocPageLayout from './layout/DocPageLayout';

interface Props {
  title?: string;
  subtitle?: string;
  mdxSource?: MDXRemoteSerializeResult;
  children?: JSX.Element | JSX.Element[];
  editUrl?: string;
}

const components: Record<string, ReactNode> = {
    a: ({children, href}: { children: ReactNode, href: string }) => {
        const isMagicBell = /magicbell.com/i.test(href);
        const isProduct = (/(app|api).magicbell.com/i.test(href));

        const rel = isProduct ? 'nofollow' : isMagicBell ? '' : 'noopener';
        return <a href={href} rel={rel}>{children}</a>
    }
};

export default function DocPage({ title, subtitle, mdxSource, editUrl, children }: Props) {
  const pageTitle = title || 'Docs';

  return (
    <DocPageLayout title={pageTitle} description={subtitle}>
      <h1 className="mt-16 mb-1 text-center">{title}</h1>
      <p className="mb-16 font-normal text-gray-500 text-center text-xl">{subtitle}</p>
      {mdxSource ? (
        <article className="mdx-content">
          <MDXRemote components={components} {...mdxSource} />
        </article>
      ) : (
        <p>Loading...</p>
      )}
      <section>{children}</section>

      {editUrl ? <div className="mt-16">
        <a href={editUrl}>Edit this page</a>
      </div> : null}
    </DocPageLayout>
  );
}
