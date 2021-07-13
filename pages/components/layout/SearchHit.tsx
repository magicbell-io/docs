import Link from 'next/link';
import React from 'react';

interface Props {
  hit: {
    objectID: string;
    title: string;
    content: string;
    slug: string;
    _highlightResult: {
      title: { value: string };
      content: { value: string };
    };
  };
}

export default function SearchHit({ hit }: Props) {
  const { _highlightResult, slug } = hit;

  return (
    <Link href={slug} passHref>
      <article className="p-8 text-white hover:bg-gray-700 cursor-pointer">
        <p
          className="m-0"
          dangerouslySetInnerHTML={{ __html: _highlightResult.title.value }}
        />
        <div
          className="m-0 text-gray-400 truncate text-sm"
          dangerouslySetInnerHTML={{ __html: _highlightResult.content.value }}
        />
      </article>
    </Link>
  );
}
