import React from 'react';
import { SitemapItem } from '../../../lib/sitemap';
import MenuItem from './MenuItem';

interface Props {
  navigationItems: SitemapItem[];
}

/**
 * Menu component. The `navigationItems` might be undefined when the site is
 * prerendered.
 */
export default function Menu({ navigationItems = [] }: Props) {
  return (
    <div className="pb-4 overflow-y-auto">
      <nav>
        {navigationItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </nav>
    </div>
  );
}
