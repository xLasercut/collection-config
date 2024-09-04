import {useCollectionConfigStore} from '../store/collection-config.ts';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {BackLink, Button, Col, Input, Row} from 'nhsuk-react-components';
import {SchemaField} from '../components/add-collection-schema/SchemaField.tsx';
import {useCollectionEditStore} from '../store/collection-edit.ts';
import {v4} from 'uuid';
import {ROUTES} from '../routing/routes.ts';

function AddCollectionSchema() {
  const collectionConfigStore = useCollectionConfigStore();
  const collectionEditStore = useCollectionEditStore();
  const {collectionId} = useParams();
  const navigate = useNavigate();

  if (!collectionId) {
    return <>{null}</>;
  }

  const schemaInEdit = collectionEditStore.schemaInEdit;

  function addField() {
    collectionEditStore.addSchemaField(`schema-field-${v4()}`);
  }

  function updateSchemaName(e: React.ChangeEvent<HTMLInputElement>) {
    collectionEditStore.updateSchemaName(e.target.value);
  }

  function checkSchema() {
    console.log(schemaInEdit);
  }

  function addSchema() {
    if (!collectionId) {
      return;
    }

    collectionConfigStore.addSchema({
      ...schemaInEdit,
      collection_id: collectionId,
      schema_id: `schema-${v4()}`,
    });
    navigate(ROUTES.COLLECTION_EDIT(collectionId));
  }

  return (
    <>
      <Row>
        <Col width={'full'}>
          <BackLink asElement={Link} to={ROUTES.COLLECTION_EDIT(collectionId)}>
            Back
          </BackLink>
        </Col>
      </Row>
      <Row>
        <Col width={'full'}>
          <h4>Add Schema</h4>
        </Col>
      </Row>
      <Row>
        <Col width={'two-thirds'}>
          <Input
            label={'Schema Name'}
            value={schemaInEdit.schema_name}
            onChange={updateSchemaName}
          ></Input>
        </Col>
      </Row>
      {schemaInEdit.fields.map(field => {
        return (
          <SchemaField
            key={field.field_id}
            fieldId={field.field_id}
            collectionId={collectionId}
          ></SchemaField>
        );
      })}
      <Row>
        <Col width={'full'}>
          <Button onClick={addField}>Add Field</Button>
        </Col>
        <Col width={'one-quarter'}>
          <Button onClick={checkSchema}>Check</Button>
        </Col>
        <Col width={'one-quarter'}>
          <Button onClick={addSchema}>Confirm</Button>
        </Col>
      </Row>
    </>
  );
}

export {AddCollectionSchema};
