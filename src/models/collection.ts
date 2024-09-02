import {z} from 'zod';

const Collection = z.object({
  collection_id: z.string(),
  name: z.string(),
  version: z.string(),
});

const CollectionSchemaField = z.object({
  field_id: z.string(),
  name: z.string(),
  rule: z.record(z.string(), z.any()),
});

const CollectionSchema = z.object({
  schema_id: z.string(),
  collection_id: z.string(),
  schema_name: z.string(),
  fields: z.array(CollectionSchemaField),
});

const CollectionSchemaCallable = z.object({
  callable_id: z.string(),
  name: z.string(),
  supported_constraints: z.record(z.string(), z.union([z.string(), z.number()])),
});

type TCollection = z.infer<typeof Collection>;
type TCollectionSchema = z.infer<typeof CollectionSchema>;
type TCollectionSchemaCallable = z.infer<typeof CollectionSchemaCallable>;
type TCollectionSchemaField = z.infer<typeof CollectionSchemaField>;

export {Collection, CollectionSchema, CollectionSchemaCallable, CollectionSchemaField};
export type {TCollection, TCollectionSchema, TCollectionSchemaCallable, TCollectionSchemaField};
