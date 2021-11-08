import classNames from 'classnames';
import React from 'react';
import PageLink from './PageLink';

interface Props {
  operationKey: string;
  operation: any;
}

export default function OperationLink({ operationKey, operation }: Props) {
  if (!operation) return null;
  return (
    <PageLink
      to={`/rest-api/reference#${operation.operationId}`}
      name={
        <div className="flex space-x-2">
          <div className="mt-1">
            <span
              className={classNames(
                'uppercase font-mono w-6 block',
                operationKey === 'post' && 'text-green-500',
                operationKey === 'get' && 'text-blue-500',
                operationKey === 'put' && 'text-purple-500',
                operationKey === 'delete' && 'text-red-500',
              )}
              style={{ fontSize: '10px', lineHeight: 1.3 }}
            >
              {operationKey.replace('delete', 'del')}
            </span>
          </div>
          <div>{operation.summary}</div>
        </div>
      }
      style={{ padding: '6px 0' }}
    />
  );
}
