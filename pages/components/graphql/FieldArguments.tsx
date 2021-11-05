import { GraphQLArgument } from 'graphql';
import React from 'react';
import CollapsedSection from '../CollapsedSection';
import InputArgument from './InputArgument';

interface Props {
  args: readonly GraphQLArgument[];
}

export default function FieldArguments({ args }: Props) {
  if (!args) return null;

  return (
    <div className="mt-8 mb-12">
      <p className="uppercase text-sm">GraphQL Arguments</p>
      <CollapsedSection className="border border-gray-200 rounded divide-y m-0">
        {args.map((argument, index) => (
          <InputArgument key={index} argument={argument} />
        ))}
      </CollapsedSection>
    </div>
  );
}
