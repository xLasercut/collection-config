import {Col, Input, Row, Select} from 'nhsuk-react-components';
import {useCollectionConfigStore} from '../../store/collection-config.ts';
import {useState} from 'react';
import {useCollectionEditStore} from '../../store/collection-edit.ts';

interface TSchemaFieldProps {
  fieldId: string;
}

function SchemaField({fieldId}: TSchemaFieldProps) {
  const collectionConfigStore = useCollectionConfigStore();
  const collectionEditStore = useCollectionEditStore();
  const [callableId, setCallableId] = useState<string>('');

  function updateCallableId(e) {
    setCallableId(e.target.value);
  }

  function updateFieldName(e) {
    collectionEditStore.updateFieldName(fieldId, e.target.value);
  }

  const field = collectionEditStore.getSchemaField(fieldId);

  return (
    <Row>
      <Col width={'two-thirds'}>
        <Input label={'Field Name'} value={field.name} onChange={updateFieldName}></Input>
      </Col>
      <Col width={'one-third'}>
        <Select label={'Type'} onChange={updateCallableId} value={callableId}>
          <Select.Option value={''}></Select.Option>
          {collectionConfigStore.schemaCallables.map(callable => {
            return <Select.Option value={callable.callable_id}>{callable.name}</Select.Option>;
          })}
        </Select>
      </Col>
      <Col width={'full'}>
        <h5>Constraints</h5>
      </Col>
      {callableId
        ? Object.entries(
            collectionConfigStore.getSchemaCallable(callableId).supported_constraints
          ).map(([key, item]) => {
            return (
              <Col width={'one-quarter'}>
                <Input label={key}></Input>
              </Col>
            );
          })
        : null}
    </Row>
  );
}

export {SchemaField};
