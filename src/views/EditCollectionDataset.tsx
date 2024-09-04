import {Link, useNavigate, useParams} from 'react-router-dom';
import {BackLink, Button, Col, Row} from 'nhsuk-react-components';
import {ROUTES} from '../routing/routes.ts';
import {useCollectionConfigStore} from '../store/collection-config.ts';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormSelect} from '../components/FormSelect.tsx';
import {FormCheckboxMultiSelect} from '../components/FormCheckboxMultiSelect.tsx';
import {FormInput} from '../components/FormInput.tsx';
import {CollectionDataset} from '../models/collection.ts';
import {useCollectionEditStore} from '../store/collection-edit.ts';

function EditCollectionDataset() {
  const {collectionId} = useParams();
  const collectionConfigStore = useCollectionConfigStore();
  const collectionEditStore = useCollectionEditStore();
  const navigate = useNavigate();

  const formHandler = useForm({
    resolver: zodResolver(CollectionDataset),
    values: {
      ...collectionEditStore.datasetInEdit,
    },
  });

  const selectedSchemaId = formHandler.watch('schema_id');

  if (!collectionId) {
    return <>{null}</>;
  }

  const onSubmit = formHandler.handleSubmit(data => {
    collectionConfigStore.editDataset(data);
    navigate(ROUTES.COLLECTION_EDIT(collectionId));
  });

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
        <Col width={'two-thirds'}>
          <h4>Edit Dataset</h4>
        </Col>
      </Row>
      <form onSubmit={onSubmit}>
        <Row>
          <Col width={'two-thirds'}>
            <FormInput
              formField={'dataset_name'}
              formHandler={formHandler}
              label={'Name'}
            ></FormInput>
          </Col>
        </Row>
        <Row>
          <Col width={'two-thirds'}>
            <FormSelect
              label={'Model'}
              formField={'schema_id'}
              formHandler={formHandler}
              items={[
                {value: '', text: ''},
                ...collectionConfigStore.getCollectionSchemas(collectionId).map(schema => {
                  return {value: schema.schema_id, text: schema.schema_name};
                }),
              ]}
            ></FormSelect>
          </Col>
        </Row>
        {selectedSchemaId ? (
          <Row>
            <Col width={'two-thirds'}>
              <FormCheckboxMultiSelect
                formField={'reporting_fields'}
                formHandler={formHandler}
                items={collectionConfigStore
                  .getCollectionSchema(collectionId, selectedSchemaId)
                  .fields.map(field => {
                    return {text: field.name, value: field.field_id};
                  })}
                label={'Reporting Fields'}
              ></FormCheckboxMultiSelect>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col width={'two-thirds'}>
            <Button type={'submit'}>Confirm</Button>
          </Col>
        </Row>
      </form>
    </>
  );
}

export {EditCollectionDataset};
