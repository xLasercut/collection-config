import {HeaderComponent} from './components/HeaderComponent.tsx';
import {Container, Footer} from 'nhsuk-react-components';
import {Route, Routes} from 'react-router-dom';
import {Collections} from './views/Collections.tsx';
import {CollectionsEdit} from './views/CollectionsEdit.tsx';
import {AddCollectionSchema} from './views/AddCollectionSchema.tsx';
import {EditCollectionSchema} from './views/EditCollectionSchema.tsx';
import {AddCollection} from './views/AddCollection.tsx';
import {AddCollectionDataset} from './views/AddCollectionDataset.tsx';
import {EditCollectionDataset} from './views/EditCollectionDataset.tsx';

function App() {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <Container>
        <div className='nhsuk-width-container'>
          <main className='nhsuk-main-wrapper' id='maincontent' role='main'>
            <Routes>
              <Route path={'/'} element={<Collections />}></Route>
              <Route path={'/collection'} element={<CollectionsEdit />}></Route>
              <Route path={'/add-collection-schema'} element={<AddCollectionSchema />}></Route>
              <Route path={'/edit-collection-schema'} element={<EditCollectionSchema />}></Route>
              <Route path={'/add-collection'} element={<AddCollection />}></Route>
              <Route path={'/add-collection-dataset'} element={<AddCollectionDataset />}></Route>
              <Route path={'/edit-collection-dataset'} element={<EditCollectionDataset />}></Route>
            </Routes>
          </main>
        </div>
      </Container>
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
