import {Header} from 'nhsuk-react-components';
import {useNavigate} from 'react-router-dom';
import {useClientDataStore} from '../store/client-data.ts';
import {ROUTES} from '../routing/routes.ts';

function LogOutLink() {
  const clientDataStore = useClientDataStore();

  if (!clientDataStore.signedIn) {
    return null;
  }

  return (
    <span
      className='nhsuk-header__navigation-link'
      style={{cursor: 'pointer', padding: '0px', paddingTop: '5px'}}
      onClick={() => {
        clientDataStore.signOut();
      }}
    >
      Log out
    </span>
  );
}

function HeaderNav() {
  const navigate = useNavigate();
  const clientDataStore = useClientDataStore();

  function goHome(e: React.MouseEvent) {
    e.preventDefault();
    navigate(ROUTES.HOME);
  }

  if (!clientDataStore.signedIn) {
    return null;
  }

  return (
    <Header.Nav>
      <Header.NavItem href='' onClick={goHome} mobileOnly>
        Home
      </Header.NavItem>
      <Header.NavItem href='' onClick={goHome}>
        Home
      </Header.NavItem>
      <Header.NavItem href='' onClick={goHome}>
        Submit a File
      </Header.NavItem>
      <Header.NavItem href='' onClick={goHome}>
        Submission History
      </Header.NavItem>
      <Header.NavItem
        href=''
        onClick={e => {
          e.preventDefault();
          navigate(ROUTES.NOTIFICATION_SETTINGS);
        }}
      >
        Notification Settings
      </Header.NavItem>
      <li
        className={
          'nhsuk-header__navigation-item--for-mobile nhsuk-u-padding-left-3 nhsuk-u-padding-bottom-3 nhsuk-u-padding-1'
        }
      >
        <LogOutLink />
      </li>
    </Header.Nav>
  );
}

function HeaderComponent() {
  const navigate = useNavigate();

  function goHome(e: React.MouseEvent) {
    e.preventDefault();
    navigate(ROUTES.HOME);
  }

  return (
    <Header>
      <Header.Container>
        <Header.Logo href='' onClick={goHome} />
        <Header.ServiceName href='' onClick={goHome}>
          Strategic Data Collection Service
        </Header.ServiceName>
        <Header.Content>
          <LogOutLink></LogOutLink>
          <Header.MenuToggle />
        </Header.Content>
      </Header.Container>
      <HeaderNav></HeaderNav>
    </Header>
  );
}

export {HeaderComponent};
