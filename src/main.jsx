import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MyRouts from './MyRouts/MyRouts.jsx'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-photo-view/dist/react-photo-view.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import AuthProviders from './firebase/authProvider/AuthProviders.jsx'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <div className='max-w-7xl mx-auto'>
        <React.StrictMode>
          <AuthProviders>
            <RouterProvider router={MyRouts} />
          </AuthProviders>
        </React.StrictMode>
      </div>
    </QueryClientProvider>
  </HelmetProvider>
  ,
)
