import {BackLink, Button, Col, Row} from 'nhsuk-react-components';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {ROUTES} from '../routing/routes.ts';
import {useForm} from 'react-hook-form';
import {Collection, TCollection} from '../models/collection.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormInput} from '../components/FormInput.tsx';
import {useCollectionConfigStore} from '../store/collection-config.ts';

function AddCollection() {
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get('id');
  const collectionConfigStore = useCollectionConfigStore();
  const navigate = useNavigate();
  const formHandler = useForm<TCollection>({
    resolver: zodResolver(Collection),
    values: {
      collection_id: collectionId || '',
      name: '',
      version: '',
    },
  });

  const onSubmit = formHandler.handleSubmit(data => {
    collectionConfigStore.addCollection(data);
    navigate(ROUTES.HOME);
  });

  if (!collectionId) {
    return <>{null}</>;
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
      <form onSubmit={onSubmit}>
        <Row>
          <Col width={'two-thirds'}>
            <h4>Add Collection</h4>
          </Col>
          <Col width={'two-thirds'}>
            <FormInput
              formHandler={formHandler}
              disabled={true}
              label={'ID'}
              formField={'collection_id'}
            ></FormInput>
          </Col>
          <Col width={'two-thirds'}>
            <FormInput formHandler={formHandler} formField={'name'} label={'Name'}></FormInput>
          </Col>
          <Col width={'two-thirds'}>
            <FormInput
              formHandler={formHandler}
              formField={'version'}
              label={'Version'}
            ></FormInput>
          </Col>
        </Row>
        <Row>
          <Col width={'two-thirds'}>
            <Button type={'submit'}>Confirm</Button>
          </Col>
        </Row>
      </form>
    </>
  );
}

export {AddCollection};
