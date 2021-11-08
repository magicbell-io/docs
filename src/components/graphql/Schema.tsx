import { GraphQLSchema } from 'graphql';
import React from 'react';
import Operation from './Operation';

interface Props {
  schema: GraphQLSchema;
}

export default function Schema({ schema }: Props) {
  if (!schema) return null;

  const query = schema.getQueryType();
  const mutation = schema.getMutationType();

  return (
    <section>
      {query && <Operation schema={schema} operation={query} />}
      {mutation && <Operation schema={schema} operation={mutation} />}
    </section>
  );
}
