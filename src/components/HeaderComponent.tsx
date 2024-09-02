import {Header} from 'nhsuk-react-components';
import {Link, useNavigate} from 'react-router-dom';
import {ROUTES} from '../routing/routes.ts';

function HeaderNav() {
  return (
    <Header.Nav>
      <Header.NavItem asElement={Link} to={ROUTES.HOME} mobileOnly>
        Home
      </Header.NavItem>
      <Header.NavItem asElement={Link} to={ROUTES.HOME}>
        Collections
      </Header.NavItem>
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
        <Header.Logo asElement={Link} to={ROUTES.HOME} />
        <Header.ServiceName href='' onClick={goHome}>
          Strategic Data Collection Service
        </Header.ServiceName>
        <Header.Content>
          <Header.MenuToggle />
        </Header.Content>
      </Header.Container>
      <HeaderNav></HeaderNav>
    </Header>
  );
}

export {HeaderComponent};
