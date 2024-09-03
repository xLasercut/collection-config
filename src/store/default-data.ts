import {TCollection, TCollectionSchema, TCollectionSchemaFieldRule} from '../models/collection.ts';

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
    fields: [
      {
        field_id: 'schema-field-57e551a4-aa29-4d22-9e88-2dd8ceb7900c',
        name: 'ResCstID',
        rule: {
          name: 'str',
          type: 'callable',
          constraints: [],
        },
      },
      {
        field_id: 'schema-field-45f066be-b963-4058-a1ad-94943ad6595e',
        name: 'TotCst',
        rule: {
          name: 'Cost',
          type: 'callable',
          constraints: [],
        },
      },
    ],
    mandatory_fields: [
      'schema-field-57e551a4-aa29-4d22-9e88-2dd8ceb7900c',
      'schema-field-45f066be-b963-4058-a1ad-94943ad6595e',
    ],
  },
];

const SCHEMA_FIELD_RULES: TCollectionSchemaFieldRule[] = [
  {
    name: 'conformatteddate',
    type: 'callable',
    constraints: [{name: 'date_format', type: 'string'}],
  },
  {
    name: 'str',
    type: 'callable',
    constraints: [],
  },
  {
    name: 'Cost',
    type: 'callable',
    constraints: [],
  },
  {
    name: 'condecimal',
    type: 'callable',
    constraints: [
      {name: 'max_digits', type: 'number'},
      {name: 'decimal_places', type: 'number'},
    ],
  },
];

export {COLLECTIONS, COLLECTION_SCHEMAS, SCHEMA_FIELD_RULES};
