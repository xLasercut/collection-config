import {useCollectionConfigStore} from '../store/collection-config.ts';
import {BackLink, Button, Col, Row, SummaryList, Table} from 'nhsuk-react-components';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {ROUTES} from '../routing/routes.ts';
import {useCollectionEditStore} from '../store/collection-edit.ts';

function CollectionsEdit() {
  const collectionConfigStore = useCollectionConfigStore();
  const collectionEditStore = useCollectionEditStore();
  const {collectionId} = useParams();
  const navigate = useNavigate();

  if (!collectionId) {
    return <>{null}</>;
  }

  const collection = collectionConfigStore.getCollection(collectionId);
  const schemas = collectionConfigStore.getCollectionSchemas(collectionId);
  const datasets = collectionConfigStore.getCollectionDatasets(collectionId);

  function downloadSchemas() {
    if (!collectionId) {
      return;
    }

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify({schemas, datasets}, null, 2)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'schema.json';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  function downloadTransformedSchemas() {
    if (!collectionId) {
      return;
    }

    const element = document.createElement('a');
    const file = new Blob([collectionConfigStore.getCollectionTransformedSchemas(collectionId)], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'transformed-schema.json';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <>
      <Row>
        <Col width={'full'}>
          <BackLink asElement={Link} to={ROUTES.HOME}>
            Back
          </BackLink>
        </Col>
      </Row>
      <Row>
        <Col width={'two-thirds'}>
          <h4>Edit Collection</h4>
          <SummaryList>
            <SummaryList.Row>
              <SummaryList.Key>ID</SummaryList.Key>
              <SummaryList.Value>{collection.collection_id}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Name</SummaryList.Key>
              <SummaryList.Value>{collection.name}</SummaryList.Value>
            </SummaryList.Row>
            <SummaryList.Row>
              <SummaryList.Key>Version</SummaryList.Key>
              <SummaryList.Value data-test-id='last-name-value'>
                {collection.version}
              </SummaryList.Value>
            </SummaryList.Row>
          </SummaryList>
        </Col>
      </Row>
      <Row>
        <Col width={'two-thirds'}>
          <h3>Schemas</h3>
        </Col>
        <Col width={'full'}>
          <Table responsive>
            <Table.Head>
              <Table.Row>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell>Name</Table.Cell>
                <Table.Cell>Action</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {schemas.map(schema => {
                return (
                  <Table.Row>
                    <Table.Cell>{schema.schema_id}</Table.Cell>
                    <Table.Cell>{schema.schema_name}</Table.Cell>
                    <Table.Cell>
                      <a
                        href={''}
                        onClick={e => {
                          e.preventDefault();
                          collectionEditStore.setSchemaInEdit(schema);
                          navigate(ROUTES.EDIT_COLLECTION_SCHEMA(collectionId));
                        }}
                      >
                        Edit
                      </a>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>
                  <a
                    href={''}
                    onClick={e => {
                      e.preventDefault();
                      collectionEditStore.reset();
                      navigate(ROUTES.ADD_COLLECTION_SCHEMA(collectionId));
                    }}
                  >
                    Add Schema
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col width={'two-thirds'}>
          <h3>Datasets</h3>
        </Col>
        <Col width={'full'}>
          <Table responsive>
            <Table.Head>
              <Table.Row>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell>Name</Table.Cell>
                <Table.Cell>Model</Table.Cell>
                <Table.Cell>Action</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {datasets.map(dataset => {
                return (
                  <Table.Row>
                    <Table.Cell>{dataset.dataset_id}</Table.Cell>
                    <Table.Cell>{dataset.dataset_name}</Table.Cell>
                    <Table.Cell>{dataset.model}</Table.Cell>
                    <Table.Cell>
                      <a
                        href={''}
                        onClick={e => {
                          e.preventDefault();
                          collectionEditStore.setDatasetInEdit(dataset);
                          navigate(ROUTES.EDIT_COLLECTION_DATASET(collectionId));
                        }}
                      >
                        Edit
                      </a>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>
                  <a
                    href={''}
                    onClick={e => {
                      e.preventDefault();
                      collectionEditStore.reset();
                      navigate(ROUTES.ADD_COLLECTION_DATASET(collectionId));
                    }}
                  >
                    Add Dataset
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col width={'one-quarter'}>
          <Button onClick={downloadSchemas}>download schemas</Button>
        </Col>
        <Col width={'one-half'}>
          <Button onClick={downloadTransformedSchemas}>download transformed schemas</Button>
        </Col>
      </Row>
    </>
  );
}

export {CollectionsEdit};
