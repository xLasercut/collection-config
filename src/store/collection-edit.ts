import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import {TCollectionSchema, TCollectionSchemaField} from '../models/collection.ts';

interface TCollectionEditStoreData {
  schemaInEdit: TCollectionSchema;
}

interface TCollectionEditStoreState extends TCollectionEditStoreData {
  addSchemaField: (fieldId: string) => void;
  getSchemaField: (fieldId: string) => TCollectionSchemaField;
  updateFieldName: (fieldId: string, name: string) => void;
}

const initialData: TCollectionEditStoreData = {
  schemaInEdit: {
    schema_id: '',
    collection_id: '',
    schema_name: '',
    fields: [],
  },
};

const collectionEditStore = createStore<TCollectionEditStoreState>((set, get) => {
  return {
    ...initialData,
    addSchemaField: (fieldId: string): void => {
      return set(state => {
        return {
          schemaInEdit: {
            ...state.schemaInEdit,
            fields: [...state.schemaInEdit.fields, {field_id: fieldId, name: '', rule: {}}],
          },
        };
      });
    },
    getSchemaField: (fieldId: string): TCollectionSchemaField => {
      for (const field of get().schemaInEdit.fields) {
        if (field.field_id === fieldId) {
          return field;
        }
      }
      throw new Error('cannot find field');
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
  };
});

function useCollectionEditStore() {
  return useStore(collectionEditStore);
}

export {collectionEditStore, useCollectionEditStore};
