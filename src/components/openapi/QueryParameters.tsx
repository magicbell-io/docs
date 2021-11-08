import { OpenAPIV3 } from 'openapi-types';
import { reject } from 'ramda';
import React from 'react';
import Parameter from './Parameter';

interface Props {
  parameteres?: OpenAPIV3.ParameterObject[];
}

export default function QueryParameters({ parameteres = [] }: Props) {
  const params = reject((param) => param.in !== 'query', parameteres);

  if (!params.length) return null;
  return (
    <div className="mt-8 mb-12">
      <p className="uppercase text-sm">Query parameters</p>
      <ul className="border border-gray-200 rounded divide-y m-0">
        {params.map((param, index) => (
          <Parameter key={index} param={param} />
        ))}
      </ul>
    </div>
  );
}
