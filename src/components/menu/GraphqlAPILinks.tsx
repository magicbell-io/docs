import { buildSchema } from 'graphql';
import { isNil } from 'ramda';
import schemaFilePath from 'raw-loader!../../../docs/graphql-api/reference/schema.graphql';
import QueryLink from './QueryLink';

export default function GraphqlAPILinks() {
  const schema = buildSchema(schemaFilePath).toConfig();
  const queries = schema.query?.getFields();
  const mutations = schema.mutation?.getFields();

  if (isNil(queries) && isNil(mutations)) return null;

  return (
    <div className="divide-y divide-dashed divide-gray-200 px-6">
      {queries ? (
        <ul className="py-3">
          {Object.keys(queries).map((queryKey: string) => (
            <QueryLink key={queryKey} query={queries[queryKey]} />
          ))}
        </ul>
      ) : null}

      {mutations ? (
        <ul className="py-3">
          {Object.keys(mutations).map((queryKey: string) => (
            <QueryLink key={queryKey} query={mutations[queryKey]} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
