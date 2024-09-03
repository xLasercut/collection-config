import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import {
  TCollection,
  TCollectionDataset,
  TCollectionSchema,
  TCollectionSchemaFieldRule,
} from '../models/collection.ts';
import {COLLECTION_SCHEMAS, COLLECTIONS, SCHEMA_FIELD_RULES} from './default-data.ts';

interface TCollectionConfigStoreData {
  collections: TCollection[];
  collectionSchemas: TCollectionSchema[];
  schemaFieldRules: TCollectionSchemaFieldRule[];
  collectionDatasets: TCollectionDataset[];
}

interface TCollectionConfigStoreState extends TCollectionConfigStoreData {
  getCollection: (collectionId: string) => TCollection;
  getCollectionSchemas: (collectionId: string) => TCollectionSchema[];
  getSchemaFieldRule: (collectionId: string, name: string) => TCollectionSchemaFieldRule;
  addSchema: (schema: TCollectionSchema) => void;
  editSchema: (schema: TCollectionSchema) => void;
  getAllAvailableFieldRules: (collectionId: string) => TCollectionSchemaFieldRule[];
  getCollectionTransformedSchemas: (collectionId: string) => string;
  addCollection: (collection: TCollection) => void;
  getCollectionDatasets: (collectionId: string) => TCollectionDataset[];
  getCollectionSchema: (collectionId: string, schemaId: string) => TCollectionSchema;
  addDataset: (dataset: TCollectionDataset) => void;
}

const initialData: TCollectionConfigStoreData = {
  collections: [...COLLECTIONS],
  collectionSchemas: [...COLLECTION_SCHEMAS],
  schemaFieldRules: [...SCHEMA_FIELD_RULES],
  collectionDatasets: [],
};

const collectionConfigStore = createStore<TCollectionConfigStoreState>((set, get) => {
  return {
    ...initialData,
    addDataset: (dataset: TCollectionDataset) => {
      return set(state => {
        return {
          collectionDatasets: [...state.collectionDatasets, dataset],
        };
      });
    },
    getCollectionSchema: (collectionId: string, schemaId: string): TCollectionSchema => {
      const schema = get()
        .getCollectionSchemas(collectionId)
        .find(schema => schema.schema_id === schemaId);
      if (!schema) {
        throw new Error('cannot find schema');
      }
      return schema;
    },
    getCollectionDatasets: (collectionId: string): TCollectionDataset[] => {
      return get()
        .collectionDatasets.filter(dataset => {
          return dataset.collection_id === collectionId;
        })
        .map(dataset => {
          return {
            ...dataset,
            model: get().getCollectionSchema(collectionId, dataset.schema_id).schema_name,
          };
        });
    },
    addCollection: (collection: TCollection) => {
      return set(state => {
        return {
          collections: [...state.collections, collection],
        };
      });
    },
    getCollection: (collectionId: string): TCollection => {
      const collection = get().collections.find(
        collection => collection.collection_id === collectionId
      );
      if (!collection) {
        throw new Error('cannot find collection');
      }
      return collection;
    },
    getCollectionSchemas: (collectionId: string): TCollectionSchema[] => {
      return get().collectionSchemas.filter(
        collectionSchema => collectionSchema.collection_id === collectionId
      );
    },
    getSchemaFieldRule: (collectionId: string, name: string): TCollectionSchemaFieldRule => {
      const rule = get()
        .getAllAvailableFieldRules(collectionId)
        .find(rule => rule.name === name);
      if (!rule) {
        throw new Error('cannot find rule');
      }
      return rule;
    },
    addSchema: (schema: TCollectionSchema): void => {
      return set(state => {
        return {
          collectionSchemas: [...state.collectionSchemas, schema],
        };
      });
    },
    editSchema: (schema: TCollectionSchema): void => {
      return set(state => {
        return {
          collectionSchemas: state.collectionSchemas.map(existingSchema => {
            if (existingSchema.schema_id === schema.schema_id) {
              return schema;
            }
            return existingSchema;
          }),
        };
      });
    },
    getAllAvailableFieldRules: (collectionId: string): TCollectionSchemaFieldRule[] => {
      const builtInRules = get().schemaFieldRules;
      const modelRules: TCollectionSchemaFieldRule[] = get()
        .getCollectionSchemas(collectionId)
        .map(schema => {
          return {
            name: schema.schema_name,
            type: 'model',
            constraints: [{name: 'is_array', type: 'boolean', value: false}],
          };
        });
      return builtInRules.concat(modelRules);
    },
    getCollectionTransformedSchemas: (collectionId: string): string => {
      const schemas = get().getCollectionSchemas(collectionId);
      const datasets = get().getCollectionDatasets(collectionId);
      const transformedSchemas = Object.assign(
        {},
        ...schemas.map(schema => {
          return {
            [schema.schema_name]: {
              fields: Object.assign(
                {},
                ...schema.fields.map(field => {
                  return {
                    [field.name]: {
                      [field.rule.type]: field.rule.name,
                      constraints: Object.assign(
                        {},
                        ...field.rule.constraints
                          .filter(constraint => {
                            return constraint.value || constraint.value === false;
                          })
                          .map(constraint => {
                            return {
                              [constraint.name]: constraint.value,
                            };
                          })
                      ),
                    },
                  };
                })
              ),
              mandatory_fields: schema.mandatory_fields.map(item => {
                return schema.fields.find(field => field.field_id === item)?.name;
              }),
            },
          };
        })
      );
      const transformedDatasets = Object.assign(
        {},
        ...datasets.map(dataset => {
          const schema = get().getCollectionSchema(collectionId, dataset.schema_id);
          return {
            [dataset.dataset_name]: {
              model: dataset.model,
              reporting_fields: dataset.reporting_fields.map(item => {
                return schema.fields.find(field => field.field_id === item)?.name;
              }),
            },
          };
        })
      );

      return JSON.stringify(
        {
          schemas: transformedSchemas,
          datasets: transformedDatasets,
        },
        null,
        2
      );
    },
  };
});

function useCollectionConfigStore() {
  return useStore(collectionConfigStore);
}

export {collectionConfigStore, useCollectionConfigStore};
