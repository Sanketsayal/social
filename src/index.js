import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import {App} from './components';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, PostProvider } from './providers';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster />
      <AuthProvider>
        <PostProvider>
          
          <App />
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);