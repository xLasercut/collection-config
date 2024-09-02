import {TCollection, TCollectionSchema, TCollectionSchemaCallable} from '../models/collection.ts';

const COLLECTIONS: TCollection[] = [
  {
    collection_id: 'collection-1a73911e-2640-4c53-9fc8-2636831533cc',
    name: 'MHSDS',
    version: '1.0',
  },
];

const COLLECTION_SCHEMAS: TCollectionSchema[] = [
  {
    collection_id: 'collection-1a73911e-2640-4c53-9fc8-2636831533cc',
    schema_id: 'schema-1181dd17-84f5-48ad-9417-9da0331b8962',
    schema_name: 'IAPTCstActivityResource',
    schema_rules: {
      fields: {
        ResCstID: 'str',
        TotCst: 'Cost',
      },
      mandatory_fields: ['ResCstID', 'TotCst'],
    },
  },
];

const SCHEMA_CALLABLES: TCollectionSchemaCallable[] = [
  {
    callable_id: 'callable-8affb230-09cd-4a29-81b0-6ffd0c951437',
    name: 'conformatteddate',
    supported_constraints: {
      date_format: 'string',
    },
  },
];

export {COLLECTIONS, COLLECTION_SCHEMAS, SCHEMA_CALLABLES};
