import {Col, Input} from 'nhsuk-react-components';
import {useCollectionEditStore} from '../../store/collection-edit.ts';
import {TCollectionSchemaFieldRuleConstraint} from '../../models/collection.ts';

interface TSchemaFieldRuleNumberConstraintProps {
  constraint: TCollectionSchemaFieldRuleConstraint;
  fieldId: string;
}

function SchemaFieldRuleNumberConstraint({
  constraint,
  fieldId,
}: TSchemaFieldRuleNumberConstraintProps) {
  const collectionEditStore = useCollectionEditStore();

  function updateConstraintValue(e: React.ChangeEvent<HTMLInputElement>) {
    collectionEditStore.updateConstraintValue(fieldId, constraint.name, Number(e.target.value));
  }

  return (
    <Col width={'one-quarter'}>
      <Input
        label={constraint.name}
        value={constraint.value ? String(constraint.value) : ''}
        onChange={updateConstraintValue}
      ></Input>
    </Col>
  );
}

export {SchemaFieldRuleNumberConstraint};
