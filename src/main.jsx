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
import { FaArrowUp } from 'react-icons/fa'
import AnimatedCursor from 'react-animated-cursor'
import './all.css'
import ScrollToTop from 'react-scroll-to-top'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <div className='max-w-7xl mx-auto'>
      <ScrollToTop 
            className="scroll-btn"
            smooth={true}
            top={30}
            color="white"
            component={<p className="arrow-button"><FaArrowUp></FaArrowUp></p>}
            style={{background: 'black', borderRadius: '100%',  color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '20'}}
             />
    <AnimatedCursor
            
            showSystemCursor={true}
                innerSize={0}
                outerSize={40}
                color='9, 9, 9'
                outerAlpha={0.4}
                innerScale={1}
                outerScale={3}
                trailingSpeed={5}
            />
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
