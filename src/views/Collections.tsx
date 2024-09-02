import {Button, Col, Row, Table} from 'nhsuk-react-components';
import {useCollectionConfigStore} from '../store/collection-config.ts';
import {Link} from 'react-router-dom';
import {ROUTES} from '../routing/routes.ts';

function Collections() {
  const collectionConfigStore = useCollectionConfigStore();

  return (
    <>
      <Row>
        <Col width={'two-thirds'}>
          <h1>Collections</h1>
        </Col>
      </Row>
      <Row>
        <form>
          <Col width={'one-quarter'}>
            <Button type='submit' style={{paddingTop: 2, paddingBottom: 2, marginTop: 31}}>
              Apply
            </Button>
          </Col>
        </form>
      </Row>
      <Table responsive>
        <Table.Head>
          <Table.Row>
            <Table.Cell>ID</Table.Cell>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Version</Table.Cell>
            <Table.Cell>Action</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {collectionConfigStore.collections.map(collection => {
            return (
              <Table.Row>
                <Table.Cell>{collection.collection_id}</Table.Cell>
                <Table.Cell>{collection.name}</Table.Cell>
                <Table.Cell>{collection.version}</Table.Cell>
                <Table.Cell>
                  <Link to={ROUTES.COLLECTION_EDIT(collection.collection_id)}>Edit</Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}

export {Collections};
