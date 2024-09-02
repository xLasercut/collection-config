import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import {TCollection, TCollectionSchema, TCollectionSchemaCallable} from '../models/collection.ts';
import {COLLECTION_SCHEMAS, COLLECTIONS, SCHEMA_CALLABLES} from './default-data.ts';

interface TCollectionConfigStoreData {
  collections: TCollection[];
  collectionSchemas: TCollectionSchema[];
  schemaCallables: TCollectionSchemaCallable[];
}

interface TCollectionConfigStoreState extends TCollectionConfigStoreData {
  getCollection: (collectionId: string) => TCollection;
  getCollectionSchemas: (collectionId: string) => TCollectionSchema[];
  getSchemaCallable: (callableId: string) => TCollectionSchemaCallable;
}

const initialData: TCollectionConfigStoreData = {
  collections: [...COLLECTIONS],
  collectionSchemas: [...COLLECTION_SCHEMAS],
  schemaCallables: [...SCHEMA_CALLABLES],
};

const collectionConfigStore = createStore<TCollectionConfigStoreState>((_, get) => {
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
    getSchemaCallable: (callableId: string): TCollectionSchemaCallable => {
      for (const callable of get().schemaCallables) {
        if (callable.callable_id === callableId) {
          return callable;
        }
      }
      throw new Error('cannot find callable');
    },
  };
});

function useCollectionConfigStore() {
  return useStore(collectionConfigStore);
}

export {collectionConfigStore, useCollectionConfigStore};
