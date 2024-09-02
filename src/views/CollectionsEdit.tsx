import {useCollectionConfigStore} from '../store/collection-config.ts';
import {Col, Row, SummaryList, Table} from 'nhsuk-react-components';
import {Link, useSearchParams} from 'react-router-dom';
import {ROUTES} from '../routing/routes.ts';

function CollectionsEdit() {
  const collectionConfigStore = useCollectionConfigStore();
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get('id');

  if (!collectionId) {
    return <>{null}</>;
  }

  const collection = collectionConfigStore.getCollection(collectionId);
  const schemas = collectionConfigStore.getCollectionSchemas(collectionId);

  return (
    <>
      <Row>
        <Col width={'two-thirds'}>
          <h4>Collection</h4>
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
      </Row>
      <Row>
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
                      <Link to={ROUTES.COLLECTION_EDIT(collection.collection_id)}>Edit</Link>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>
                  <Link to={ROUTES.ADD_COLLECTION_SCHEMA(collection.collection_id)}>
                    Add Schema
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Col>
      </Row>
    </>
  );
}

export {CollectionsEdit};
