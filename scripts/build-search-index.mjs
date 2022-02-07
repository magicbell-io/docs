import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';
import fs from 'fs';
import * as matter from 'gray-matter';
import path from 'path';
import { flatten, isNil, reject } from 'ramda';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import html from 'remark-html';
import searchable from 'remark-mdx-searchable';
import slugify from 'slugify';

/**
 * Read and parse the contents of an MDX file.
 * It parses the file with remark and extract the metadata with gray-matter.
 *
 * @param {string} filePath Path to the MDX file to read
 * @param {string} encoding
 * @returns An object containing the metada and its content in plain text.
 */
function parseMDXFile(filePath, context, encoding = 'utf8') {
  const fileContents = fs.readFileSync(filePath, encoding);
  const { content, data } = matter.default(fileContents);
  const compiled = remark().use(html).use(searchable).use(gfm).processSync(content);

  return compiled.data.map((item) => ({
    content: item.text,
    data: { heading: item.heading, ...data },
  }));
}

/**
 * Function to extract the `to` attribute from an entry of the the sitemap.json
 * file recursively.
 *
 * @param {Object} element
 * @returns A list of the paths
 */
function extractPath(element) {
  if (element.to) return { to: element.to, name: element.name };
  return reject(isNil, flatten(element.children.map(extractPath)));
}

function getPost(context, directory) {
  const fileName = context.to === '/' ? 'index.mdx' : context.to + '.mdx';
  const postPath = path.join(directory, fileName);
  if (!fs.existsSync(postPath)) return null;

  const contents = parseMDXFile(postPath, context);

  // {
  //   slug: string;
  //   contents: [
  //     {
  //       content: string;
  //       data: {
  //         title: string;
  //         subtitle: string;
  //         heading: string;
  //       }
  //     }
  //   ]
  // }
  return { slug: context.to, contents };
}

function getPostsFromSitemap() {
  const sitemap = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'sitemap.json')));

  const posts = [];
  const docsDirectory = path.join(process.cwd(), 'docs');
  const sitemapPaths = flatten(sitemap.map((entry) => extractPath(entry)));

  for (let entryFilePath of sitemapPaths) {
    // Do not try to index external links
    if (!entryFilePath.to.startsWith('/')) continue;

    try {
      const post = getPost(entryFilePath, docsDirectory);
      if (!post) continue;
      posts.push(post);
    } catch (err) {
      console.debug(err);
    }
  }

  return posts;
}

function buildOperationData(operation) {
  return {
    slug: `/rest-api/reference#${operation.operationId}`,
    contents: [
      {
        content: operation.description,
        data: {
          title: 'API Reference',
          heading: operation.summary,
        },
      },
    ],
  };
}

function getPostsFromOpenAPI() {
  const posts = [];
  const filePath = path.join(
    process.cwd(),
    'docs',
    'rest-api',
    'reference',
    'openapi.json',
  );

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const schema = JSON.parse(fileContents);

  for (let item of Object.keys(schema.paths)) {
    const operations = schema.paths[item];
    for (let operationKey of Object.keys(operations)) {
      const operation = operations[operationKey];
      const operationData = buildOperationData(operation);

      posts.push(operationData);
    }
  }

  return posts;
}

/**
 * Function to generate the contents of all the posts based on the sitemap.json
 * file.
 *
 * @returns An array containing all the posts' content and metadata
 */
async function getAllPosts() {
  const posts = [];
  const docsPosts = getPostsFromSitemap();
  const openAPIPosts = getPostsFromOpenAPI();

  return [...docsPosts, ...openAPIPosts];
}

function buildSearchObjects(posts) {
  return flatten(
    posts.map(({ slug, contents }) =>
      contents.map(({ content, data }, index) => ({
        objectID: slug + ':' + index,
        title: data.heading ? data.title + ' > ' + data.heading : data.title,
        breadcrumbs: [data.title, data.heading],
        slug: data.heading
          ? `${slug}#${slugify(data.heading, { lower: true, remove: /\"|\?/ })}`
          : slug,
        content,
      })),
    ),
  );
}

(async function () {
  dotenv.config();

  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_API_KEY,
  );

  try {
    const posts = await getAllPosts();
    const searchObjects = buildSearchObjects(posts);

    const index = client.initIndex('docs');
    const response = await index.saveObjects(searchObjects);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();
