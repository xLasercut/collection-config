import {HeaderComponent} from './components/HeaderComponent.tsx';
import {Footer} from 'nhsuk-react-components';
import {Route, Routes} from 'react-router-dom';
import {Home} from './views/Home.tsx';
import {NotificationSettingsPage} from './views/NotificationSettingsPage.tsx';
import {Login} from './views/Login.tsx';
import {LoginRedirect} from './views/LoginRedirect.tsx';

function App() {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div className='nhsuk-width-container'>
        <main className='nhsuk-main-wrapper' id='maincontent' role='main'>
          <Routes>
            <Route path={'/'} element={<Login />}></Route>
            <Route element={<LoginRedirect />}>
              <Route path={'/home'} element={<Home />}></Route>
              <Route
                path={'/notification-settings'}
                element={<NotificationSettingsPage></NotificationSettingsPage>}
              ></Route>
            </Route>
          </Routes>
        </main>
      </div>
      <Footer>
        <Footer.List>
          <Footer.ListItem href='https://digital.nhs.uk/services/strategic-data-collection-service-in-the-cloud-sdcs-cloud/accessibility-statement'>
            Accessibility
          </Footer.ListItem>
          <Footer.ListItem href='https://digital.nhs.uk/about-nhs-digital/privacy-and-cookies'>
            Privacy and Cookies
          </Footer.ListItem>
          <Footer.ListItem href='https://digital.nhs.uk/about-nhs-digital/contact-us/freedom-of-information'>
            Freedom of Information
          </Footer.ListItem>
          <Footer.ListItem href='https://digital.nhs.uk/about-nhs-digital/terms-and-conditions'>
            Terms and Conditions
          </Footer.ListItem>
          <Footer.ListItem href='https://digital.nhs.uk/about-nhs-digital/contact-us'>
            Contact Us
          </Footer.ListItem>
        </Footer.List>
        <Footer.Copyright>&copy; Crown copyright</Footer.Copyright>
      </Footer>
    </>
  );
}

export default App;
