import { OpenAPIV3 } from 'openapi-types';
import React from 'react';

interface Props {
  param?: OpenAPIV3.ParameterObject;
}

export default function Parameter({ param }: Props) {
  if (!param) return null;
  return (
    <div className="mb-4 bg-gray-100 bg-opacity-75 rounded p-2">
      <p className="font-mono flex items-center m-0">
        {param.name}
        {param.required && <span className="text-red-500 mx-4 text-xs">required</span>}
      </p>
      <p className="opacity-60 m-0">{param.description}</p>
      <p className="opacity-60 m-0 capitalize">
        {/* @ts-ignore */}
        {param.schema?.type}
      </p>
    </div>
  );
}
