import {z} from 'zod';

const Collection = z.object({
  collection_id: z.string(),
  name: z.string(),
  version: z.string(),
});

const CollectionSchemaFieldRuleConstraint = z.object({
  name: z.string(),
  type: z.string(),
  value: z.any(),
});

const CollectionSchemaFieldRule = z.object({
  name: z.string(),
  type: z.string(),
  constraints: z.array(CollectionSchemaFieldRuleConstraint),
});

const CollectionSchemaField = z.object({
  field_id: z.string(),
  name: z.string(),
  rule: CollectionSchemaFieldRule,
});

const CollectionSchema = z.object({
  schema_id: z.string(),
  collection_id: z.string(),
  schema_name: z.string(),
  fields: z.array(CollectionSchemaField),
  mandatory_fields: z.array(z.string()),
});

type TCollection = z.infer<typeof Collection>;
type TCollectionSchema = z.infer<typeof CollectionSchema>;
type TCollectionSchemaFieldRule = z.infer<typeof CollectionSchemaFieldRule>;
type TCollectionSchemaField = z.infer<typeof CollectionSchemaField>;
type TCollectionSchemaFieldRuleConstraint = z.infer<typeof CollectionSchemaFieldRuleConstraint>;

export {Collection, CollectionSchema, CollectionSchemaFieldRule, CollectionSchemaField};
export type {
  TCollection,
  TCollectionSchema,
  TCollectionSchemaFieldRule,
  TCollectionSchemaField,
  TCollectionSchemaFieldRuleConstraint,
};
