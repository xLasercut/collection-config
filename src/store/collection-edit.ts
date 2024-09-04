import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import {
  TCollectionDataset,
  TCollectionSchema,
  TCollectionSchemaField,
  TCollectionSchemaFieldRule,
} from '../models/collection.ts';

interface TCollectionEditStoreData {
  schemaInEdit: TCollectionSchema;
  datasetInEdit: TCollectionDataset;
}

interface TCollectionEditStoreState extends TCollectionEditStoreData {
  addSchemaField: (fieldId: string) => void;
  getSchemaField: (fieldId: string) => TCollectionSchemaField;
  updateFieldName: (fieldId: string, name: string) => void;
  setFieldRule: (fieldId: string, rule: TCollectionSchemaFieldRule) => void;
  updateConstraintValue: (
    fieldId: string,
    constraintName: string,
    value: number | string | boolean
  ) => void;
  updateSchemaName: (name: string) => void;
  setSchemaInEdit: (schema: TCollectionSchema) => void;
  reset: () => void;
  isMandatoryField: (fieldId: string) => boolean;
  addMandatoryField: (fieldId: string) => void;
  removeMandatoryField: (fieldId: string) => void;
  removeSchemaField: (fieldId: string) => void;
  setDatasetInEdit: (dataset: TCollectionDataset) => void;
}

const initialData: TCollectionEditStoreData = {
  schemaInEdit: {
    schema_id: '',
    collection_id: '',
    schema_name: '',
    fields: [],
    mandatory_fields: [],
  },
  datasetInEdit: {
    collection_id: '',
    dataset_id: '',
    model: '',
    schema_id: '',
    dataset_name: '',
    reporting_fields: [],
  },
};

const collectionEditStore = createStore<TCollectionEditStoreState>((set, get) => {
  return {
    ...initialData,
    setDatasetInEdit: (dataset: TCollectionDataset): void => {
      return set(() => {
        return {
          datasetInEdit: dataset,
        };
      });
    },
    addSchemaField: (fieldId: string): void => {
      return set(state => {
        return {
          schemaInEdit: {
            ...state.schemaInEdit,
            fields: [
              ...state.schemaInEdit.fields,
              {field_id: fieldId, name: '', rule: {name: '', type: '', constraints: []}},
            ],
          },
        };
      });
    },
    getSchemaField: (fieldId: string): TCollectionSchemaField => {
      const field = get().schemaInEdit.fields.find(field => field.field_id === fieldId);
      if (!field) {
        throw new Error('cannot find field');
      }
      return field;
    },
    updateSchemaName: (name: string): void => {
      return set(state => {
        return {
          schemaInEdit: {
            ...state.schemaInEdit,
            schema_name: name,
          },
        };
      });
    },
    updateFieldName: (fieldId: string, name: string): void => {
      return set(state => {
        return {
          schemaInEdit: {
            ...state.schemaInEdit,
            fields: state.schemaInEdit.fields.map(field => {
              if (field.field_id === fieldId) {
                return {
                  ...field,
                  name: name,
                };
              }
              return field;
            }),
          },
        };
      });
    },
    setFieldRule: (fieldId: string, rule: TCollectionSchemaFieldRule): void => {
      return set(state => {
        return {
          schemaInEdit: {
            ...state.schemaInEdit,
            fields: state.schemaInEdit.fields.map(field => {
              if (field.field_id === fieldId) {
                return {
                  ...field,
                  rule: rule,
                };
              }
              return field;
            }),
          },
        };
      });
    },
    updateConstraintValue: (
      fieldId: string,
      constraintName: string,
      value: number | string | boolean
    ): void => {
      return set(state => {
        return {
          schemaInEdit: {
            ...state.schemaInEdit,
            fields: state.schemaInEdit.fields.map(field => {
              if (field.field_id === fieldId) {
                return {
                  ...field,
                  rule: {
                    ...field.rule,
                    constraints: field.rule.constraints.map(constraint => {
                      if (constraintName === constraint.name) {
                        return {
                          ...constraint,
                          value: value,
                        };
                      }
                      return constraint;
                    }),
                  },
                };
              }
              return field;
            }),
          },
        };
      });
    },
    setSchemaInEdit: (schema: TCollectionSchema): void => {
      return set(() => {
        return {
          schemaInEdit: schema,
        };
      });
    },
    reset: () => {
      return set(() => {
        return {
          ...initialData,
        };
      });
    },
    isMandatoryField: (fieldId: string): boolean => {
      return get().schemaInEdit.mandatory_fields.includes(fieldId);
    },
    addMandatoryField: (fieldId: string): void => {
      return set(state => {
        return {
          schemaInEdit: {
            ...state.schemaInEdit,
            mandatory_fields: [...state.schemaInEdit.mandatory_fields, fieldId],
          },
        };
      });
    },
    removeMandatoryField: (fieldId: string): void => {
      return set(state => {
        return {
          schemaInEdit: {
            ...state.schemaInEdit,
            mandatory_fields: state.schemaInEdit.mandatory_fields.filter(field => {
              return field !== fieldId;
            }),
          },
        };
      });
    },
    removeSchemaField: (fieldId: string): void => {
      return set(state => {
        return {
          schemaInEdit: {
            ...state.schemaInEdit,
            fields: state.schemaInEdit.fields.filter(field => field.field_id !== fieldId),
          },
        };
      });
    },
  };
});

function useCollectionEditStore() {
  return useStore(collectionEditStore);
}

export {collectionEditStore, useCollectionEditStore};
