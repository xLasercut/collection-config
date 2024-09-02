import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/nhsuk-frontend/dist/nhsuk.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/notification-test-two/*'} element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
