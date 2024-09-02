import {Button, Col} from 'nhsuk-react-components';
import {useClientDataStore} from '../store/client-data.ts';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../routing/routes.ts';
import {useEffect} from 'react';

function Login() {
  const clientDataStore = useClientDataStore();
  const navigate = useNavigate();

  function loginMSDS() {
    clientDataStore.signIn(true);
    navigate(ROUTES.HOME);
  }

  function loginNonMSDS() {
    clientDataStore.signIn(false);
    navigate(ROUTES.HOME);
  }

  useEffect(() => {
    clientDataStore.reset();
  }, []);

  return (
    <>
      <div className='nhsuk-u-width-two-thirds'>
        <h1 className='nhsuk-heading-xl' data-test-id='heading-one'>
          Strategic Data Collection Service in the cloud (SDCS Cloud)
        </h1>
      </div>
      <div className='nhsuk-grid-row'>
        <Col width={'one-quarter'}>
          <Button onClick={loginMSDS}>Login as MSDS user</Button>
        </Col>
        <Col width={'two-thirds'}>
          <Button onClick={loginNonMSDS}>Login as non MSDS user</Button>
        </Col>
      </div>
    </>
  );
}

export {Login};
