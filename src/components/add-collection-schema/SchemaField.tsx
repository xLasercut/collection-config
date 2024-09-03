import {Card, Col, Input, Label, Radios, Row, Select} from 'nhsuk-react-components';
import {useCollectionConfigStore} from '../../store/collection-config.ts';
import {useCollectionEditStore} from '../../store/collection-edit.ts';
import {SchemaFieldRuleStringConstraint} from './SchemaFieldRuleStringConstraint.tsx';
import {SchemaFieldRuleNumberConstraint} from './SchemaFieldRuleNumberConstriant.tsx';

interface TSchemaFieldProps {
  fieldId: string;
  collectionId: string;
}

function SchemaField({fieldId, collectionId}: TSchemaFieldProps) {
  const collectionConfigStore = useCollectionConfigStore();
  const collectionEditStore = useCollectionEditStore();

  function updateRule(e: React.ChangeEvent<HTMLSelectElement>) {
    const name = e.target.value;
    if (name) {
      const rule = collectionConfigStore.getSchemaFieldRule(collectionId, name);
      collectionEditStore.setFieldRule(fieldId, rule);
    } else {
      collectionEditStore.setFieldRule(fieldId, {name: '', type: '', constraints: []});
    }
  }

  function updateFieldName(e: React.ChangeEvent<HTMLInputElement>) {
    collectionEditStore.updateFieldName(fieldId, e.target.value);
  }

  function updateMandatoryField(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === 'true') {
      collectionEditStore.addMandatoryField(fieldId);
    } else {
      collectionEditStore.removeMandatoryField(fieldId);
    }
  }

  const field = collectionEditStore.getSchemaField(fieldId);

  return (
    <Card>
      <Card.Content>
        <Card.Description>
          <Row>
            <Col width={'one-third'}>
              <Input label={'Field Name'} value={field.name} onChange={updateFieldName}></Input>
            </Col>
            <Col width={'one-third'}>
              <Select label={'Type'} onChange={updateRule} value={field.rule.name}>
                <Select.Option value={''}></Select.Option>
                {collectionConfigStore.getAllAvailableFieldRules(collectionId).map(rule => {
                  return <Select.Option value={rule.name}>{rule.name}</Select.Option>;
                })}
              </Select>
            </Col>
            <Col width={'one-third'}>
              <Radios label={'Mandatory Field'} inline={true} onChange={updateMandatoryField}>
                <Radios.Radio
                  value={'true'}
                  checked={collectionEditStore.isMandatoryField(fieldId)}
                >
                  {'Yes'}
                </Radios.Radio>
                <Radios.Radio
                  value={'false'}
                  checked={!collectionEditStore.isMandatoryField(fieldId)}
                >
                  {'No'}
                </Radios.Radio>
              </Radios>
            </Col>
            {field.rule.constraints.length > 0 ? (
              <Col width={'full'}>
                <Label>Constraints</Label>
              </Col>
            ) : null}
            {field.rule.name
              ? field.rule.constraints.map(constraint => {
                  if (constraint.type === 'number') {
                    return (
                      <SchemaFieldRuleNumberConstraint
                        key={constraint.name}
                        constraint={constraint}
                        fieldId={fieldId}
                      ></SchemaFieldRuleNumberConstraint>
                    );
                  }

                  return (
                    <SchemaFieldRuleStringConstraint
                      key={constraint.name}
                      constraint={constraint}
                      fieldId={fieldId}
                    ></SchemaFieldRuleStringConstraint>
                  );
                })
              : null}
          </Row>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export {SchemaField};
