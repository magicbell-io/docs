import SwaggerParser from '@apidevtools/swagger-parser';
import fs from 'fs';
import * as matter from 'gray-matter';
import { GetStaticProps } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import React from 'react';
import DocPage from '../../src/components/DocPage';
import Document from '../../src/components/openapi/Document';

interface Props {
  metadata?: { [key: string]: any };
  mdxAuthenticationSource?: MDXRemoteSerializeResult;
  openapi: any;
}

export default function reference({
  mdxAuthenticationSource,
  openapi,
  metadata = {},
}: Props) {
  return (
    <DocPage mdxSource={mdxAuthenticationSource} {...metadata}>
      <div className="my-12">
        <Document document={openapi} />
      </div>
    </DocPage>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const docsDirectory = path.join(process.cwd(), 'docs');
  const filePath = path.join(docsDirectory, 'rest-api/authentication.mdx');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const openapiFilePath = path.join(docsDirectory, 'rest-api/reference/openapi.json');
  const openapiFileContents = fs.readFileSync(openapiFilePath, 'utf8');
  let openapi = await SwaggerParser.validate(JSON.parse(openapiFileContents));

  // @ts-ignore
  const { content, data } = matter(fileContents);
  const mdxAuthenticationSource = await serialize(content);
  return {
    props: {
      mdxAuthenticationSource,
      metadata: data,
      openapi,
    },
  };
};
