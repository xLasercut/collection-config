import {Navigate, Outlet} from 'react-router-dom';
import {useClientDataStore} from '../store/client-data.ts';
import {ROUTES} from '../routing/routes.ts';

function LoginRedirect() {
  const clientDataStore = useClientDataStore();

  if (!clientDataStore.signedIn) {
    return <Navigate to={ROUTES.LOGIN} replace={true} />;
  }

  return <Outlet />;
}

export {LoginRedirect};
