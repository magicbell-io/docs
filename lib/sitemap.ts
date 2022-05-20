import { flatten, isNil, reject } from 'ramda';
import sitemap from '../sitemap.json';

export type SitemapItem = {
  name: string;
  to?: string;
  icon?: string;
  children?: SitemapItem[];
  staticRoute?: boolean;
};

export default sitemap as SitemapItem[];

export function getAllChildrenPaths(element: any): string[] {
  if (element.to) return element.to;
  if (element.hide) return element.hide;
  return reject(isNil, flatten(element.children.map(getAllChildrenPaths)));
}

/**
 * Helper function to flatten the sitemap
 * @param sitemap the sitemap to flatten
 * @returns an array of elements of the sitemap
 */
export function getAllSitemapItems(sitemap: SitemapItem[]): SitemapItem[] {
  let items:SitemapItem[] = []
  const traverse = (item: SitemapItem) => {
    items.push(item)
    if(item.children){
      item.children.forEach(traverse)
    }
  }
  sitemap.forEach(traverse)
  return items;
}
