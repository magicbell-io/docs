import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react';
import DocPageLayout from './layout/DocPageLayout';

interface Props {
  title?: string;
  subtitle?: string;
  mdxSource?: MDXRemoteSerializeResult;
  children?: JSX.Element | JSX.Element[];
  editUrl?: string;

}

export default function DocPage({ title, subtitle, mdxSource, editUrl, children }: Props) {
  const pageTitle = title || 'Docs';

  return (
    <DocPageLayout title={pageTitle} description={subtitle}>
      <h1 className="mt-16 mb-1 text-center">{title}</h1>
      <p className="mb-16 font-normal text-gray-500 text-center text-xl">{subtitle}</p>
      {mdxSource ? (
        <article className="mdx-content">
          <MDXRemote {...mdxSource} />
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
