import React from 'react';
import { SitemapItem } from '../../../lib/sitemap';
import Menu from './Menu';

interface Props {
  navigationItems: SitemapItem[];
}

export default function DesktopMenu({ navigationItems }: Props) {
  return (
    <div className="sticky top-28 h-full">
      <div
        className="flex-shrink-0 w-72 hidden md:block overflow-y-scroll ml-2"
        style={{ maxHeight: '85vh' }}
      >
        <Menu navigationItems={navigationItems} />
      </div>
    </div>
  );
}
