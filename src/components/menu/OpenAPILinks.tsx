import { prop } from 'ramda';
import React from 'react';
import OpenAPI from '../../../docs/rest-api/reference/openapi.json';
import PathLinks from './PathLinks';

export default function OpenAPILinks() {
  const { paths } = OpenAPI;

  return (
    <div className="divide-y divide-dashed divide-gray-200 px-6">
      {Object.keys(paths).map((pathKey: string) => (
        // @ts-ignore
        <PathLinks key={pathKey} path={prop(pathKey, paths)} />
      ))}
    </div>
  );
}
