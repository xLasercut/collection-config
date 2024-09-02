import {useCollectionConfigStore} from '../store/collection-config.ts';
import {useSearchParams} from 'react-router-dom';
import {Button, Col, Input, Row} from 'nhsuk-react-components';
import {SchemaField} from '../components/add-collection-schema/SchemaField.tsx';
import {useCollectionEditStore} from '../store/collection-edit.ts';
import {v4} from 'uuid';

function AddCollectionSchema() {
  const collectionConfigStore = useCollectionConfigStore();
  const collectionEditStore = useCollectionEditStore();
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get('id');

  if (!collectionId) {
    return <>{null}</>;
  }

  function addField() {
    collectionEditStore.addSchemaField(`${v4()}`);
  }

  function checkSchema() {
    console.log(collectionEditStore.schemaInEdit);
  }

  return (
    <>
      <Row>
        <Col width={'two-thirds'}>
          <Input label={'Schema Name'}></Input>
        </Col>
      </Row>
      {collectionEditStore.schemaInEdit.fields.map(field => {
        return <SchemaField key={field.field_id} fieldId={field.field_id}></SchemaField>;
      })}
      <Row>
        <Col width={'two-thirds'}>
          <Button onClick={addField}>Add Field</Button>
        </Col>
        <Col width={'two-thirds'}>
          <Button onClick={checkSchema}>Check</Button>
        </Col>
      </Row>
    </>
  );
}

export {AddCollectionSchema};
