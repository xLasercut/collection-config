import {Col, Input} from 'nhsuk-react-components';
import {useCollectionEditStore} from '../../store/collection-edit.ts';
import {TCollectionSchemaFieldRuleConstraint} from '../../models/collection.ts';

interface TSchemaFieldRuleStringConstraintProps {
  constraint: TCollectionSchemaFieldRuleConstraint;
  fieldId: string;
}

function SchemaFieldRuleStringConstraint({
  constraint,
  fieldId,
}: TSchemaFieldRuleStringConstraintProps) {
  const collectionEditStore = useCollectionEditStore();

  function updateConstraintValue(e: React.ChangeEvent<HTMLInputElement>) {
    collectionEditStore.updateConstraintValue(fieldId, constraint.name, e.target.value);
  }

  return (
    <Col width={'one-quarter'}>
      <Input
        label={constraint.name}
        value={constraint.value}
        onChange={updateConstraintValue}
      ></Input>
    </Col>
  );
}

export {SchemaFieldRuleStringConstraint};
