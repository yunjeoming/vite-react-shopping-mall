import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
