import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {BackLink, Button, Col, Row} from 'nhsuk-react-components';
import {ROUTES} from '../routing/routes.ts';
import {useCollectionConfigStore} from '../store/collection-config.ts';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormSelect} from '../components/FormSelect.tsx';
import {FormCheckboxMultiSelect} from '../components/FormCheckboxMultiSelect.tsx';
import {v4} from 'uuid';
import {FormInput} from '../components/FormInput.tsx';

function AddCollectionDataset() {
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get('id');
  const collectionConfigStore = useCollectionConfigStore();
  const navigate = useNavigate();

  const FormSchema = z.object({
    schema_id: z.string(),
    dataset_name: z.string(),
    reporting_fields: z.array(z.string()),
  });

  const formHandler = useForm({
    resolver: zodResolver(FormSchema),
    values: {
      schema_id: '',
      reporting_fields: [],
      dataset_name: '',
    },
  });

  const selectedSchemaId = formHandler.watch('schema_id');

  if (!collectionId) {
    return <>{null}</>;
  }

  const onSubmit = formHandler.handleSubmit(data => {
    console.log(data);
    const schema = collectionConfigStore.getCollectionSchema(collectionId, data.schema_id);
    collectionConfigStore.addDataset({
      dataset_id: `dataset-${v4()}`,
      dataset_name: data.dataset_name,
      collection_id: collectionId,
      reporting_fields: data.reporting_fields,
      model: schema.schema_id,
      schema_id: data.schema_id,
    });
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
          <h4>Add Dataset</h4>
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

export {AddCollectionDataset};
