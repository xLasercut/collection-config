const BASE_ROUTE = '/collection-config';

const ROUTES = {
  HOME: `${BASE_ROUTE}/`,
  COLLECTION_EDIT: (collectionId: string): string => {
    return `${BASE_ROUTE}/collection/${collectionId}`;
  },
  ADD_COLLECTION_SCHEMA: (collectionId: string): string => {
    return `${BASE_ROUTE}/add-collection-schema/${collectionId}`;
  },
  EDIT_COLLECTION_SCHEMA: (collectionId: string): string => {
    return `${BASE_ROUTE}/edit-collection-schema/${collectionId}`;
  },
  ADD_COLLECTION: (collectionId: string): string => {
    return `${BASE_ROUTE}/add-collection/${collectionId}`;
  },
  ADD_COLLECTION_DATASET: (collectionId: string): string => {
    return `${BASE_ROUTE}/add-collection-dataset/${collectionId}`;
  },
  EDIT_COLLECTION_DATASET: (collectionId: string): string => {
    return `${BASE_ROUTE}/edit-collection-dataset/${collectionId}`;
  },
} as const;

export {ROUTES};
