const BASE_ROUTE = '/collection-config';

const ROUTES = {
  HOME: `${BASE_ROUTE}/`,
  COLLECTION_EDIT: (collectionId: string): string => {
    const queryParams = new URLSearchParams();
    queryParams.set('id', collectionId);
    return `${BASE_ROUTE}/collection?${queryParams.toString()}`;
  },
  ADD_COLLECTION_SCHEMA: (collectionId: string): string => {
    const queryParams = new URLSearchParams();
    queryParams.set('id', collectionId);
    return `${BASE_ROUTE}/add-collection-schema?${queryParams.toString()}`;
  },
  EDIT_COLLECTION_SCHEMA: (collectionId: string): string => {
    const queryParams = new URLSearchParams();
    queryParams.set('id', collectionId);
    return `${BASE_ROUTE}/edit-collection-schema?${queryParams.toString()}`;
  },
  ADD_COLLECTION: (collectionId: string): string => {
    const queryParams = new URLSearchParams();
    queryParams.set('id', collectionId);
    return `${BASE_ROUTE}/add-collection?${queryParams.toString()}`;
  },
} as const;

export {ROUTES};
