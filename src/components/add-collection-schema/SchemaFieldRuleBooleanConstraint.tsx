import {Col, Radios} from 'nhsuk-react-components';
import {useCollectionEditStore} from '../../store/collection-edit.ts';
import {TCollectionSchemaFieldRuleConstraint} from '../../models/collection.ts';

interface TSchemaFieldRuleBooleanConstraintProps {
  constraint: TCollectionSchemaFieldRuleConstraint;
  fieldId: string;
}

function SchemaFieldRuleBooleanConstraint({
  constraint,
  fieldId,
}: TSchemaFieldRuleBooleanConstraintProps) {
  const collectionEditStore = useCollectionEditStore();

  function updateConstraintValue(e: React.ChangeEvent<HTMLInputElement>) {
    collectionEditStore.updateConstraintValue(fieldId, constraint.name, e.target.value === 'true');
  }

  return (
    <Col width={'one-third'}>
      <Radios label={constraint.name} onChange={updateConstraintValue} inline>
        <Radios.Radio value={'true'} checked={constraint.value}>
          Yes
        </Radios.Radio>
        <Radios.Radio value={'false'} checked={!constraint.value}>
          No
        </Radios.Radio>
      </Radios>
    </Col>
  );
}

export {SchemaFieldRuleBooleanConstraint};
