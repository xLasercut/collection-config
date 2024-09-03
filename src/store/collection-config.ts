import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import {TCollection, TCollectionSchema, TCollectionSchemaFieldRule} from '../models/collection.ts';
import {COLLECTION_SCHEMAS, COLLECTIONS, SCHEMA_FIELD_RULES} from './default-data.ts';

interface TCollectionConfigStoreData {
  collections: TCollection[];
  collectionSchemas: TCollectionSchema[];
  schemaFieldRules: TCollectionSchemaFieldRule[];
}

interface TCollectionConfigStoreState extends TCollectionConfigStoreData {
  getCollection: (collectionId: string) => TCollection;
  getCollectionSchemas: (collectionId: string) => TCollectionSchema[];
  getSchemaFieldRule: (collectionId: string, name: string) => TCollectionSchemaFieldRule;
  addSchema: (schema: TCollectionSchema) => void;
  editSchema: (schema: TCollectionSchema) => void;
  getAllAvailableFieldRules: (collectionId: string) => TCollectionSchemaFieldRule[];
  getCollectionTransformedSchemas: (collectionId: string) => string;
}

const initialData: TCollectionConfigStoreData = {
  collections: [...COLLECTIONS],
  collectionSchemas: [...COLLECTION_SCHEMAS],
  schemaFieldRules: [...SCHEMA_FIELD_RULES],
};

const collectionConfigStore = createStore<TCollectionConfigStoreState>((set, get) => {
  return {
    ...initialData,
    getCollection: (collectionId: string): TCollection => {
      for (const collection of get().collections) {
        if (collection.collection_id === collectionId) {
          return collection;
        }
      }
      throw new Error('cannot find collection');
    },
    getCollectionSchemas: (collectionId: string): TCollectionSchema[] => {
      return get().collectionSchemas.filter(
        collectionSchema => collectionSchema.collection_id === collectionId
      );
    },
    getSchemaFieldRule: (collectionId: string, name: string): TCollectionSchemaFieldRule => {
      for (const rule of get().getAllAvailableFieldRules(collectionId)) {
        if (rule.name === name) {
          return rule;
        }
      }
      throw new Error('cannot find rule');
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
            constraints: [],
          };
        });
      return builtInRules.concat(modelRules);
    },
    getCollectionTransformedSchemas: (collectionId: string): string => {
      const schemas = get().getCollectionSchemas(collectionId);
      return JSON.stringify(
        Object.assign(
          {},
          ...schemas.map(schema => {
            return {
              [schema.schema_name]: Object.assign(
                {},
                ...schema.fields.map(field => {
                  return {
                    [field.name]: {
                      [field.rule.type]: field.rule.name,
                      constraints: Object.assign(
                        {},
                        ...field.rule.constraints
                          .filter(constraint => {
                            return constraint.value;
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
            };
          })
        ),
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
