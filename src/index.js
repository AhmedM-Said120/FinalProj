import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import { QueryClient, QueryClientProvider } from 'react-query';


import { ReactQueryDevtools, ReactQueryDevtoolsPanel } from "react-query/devtools"

const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

reportWebVitals();
