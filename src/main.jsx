import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ClerkProvider} from "@clerk/clerk-react";
import {BrowserRouter} from "react-router";
import * as Sentry from "@sentry/react";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {Toaster} from "react-hot-toast";
import {
    createBrowserRouter,
    createRoutesFromChildren,
    matchRoutes,
    useLocation,
    useNavigationType,
} from "react-router";
import AuthProvider from "./providers/AuthProvider.jsx";

const queryClient = new QueryClient()

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key')
}
Sentry.init({
    dsn: "https://8ab860bf8b5025d0e0cb4f12fb3a2e03@o4510386496602112.ingest.us.sentry.io/4510396886417408",
    integrations: [
        Sentry.reactRouterV7BrowserTracingIntegration({
            useEffect: React.useEffect,
            useLocation,
            useNavigationType,
            createRoutesFromChildren,
            matchRoutes,
        }),
    ],
    tracesSampleRate: 1.0,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
           <BrowserRouter>
               <QueryClientProvider client={queryClient}>
                   <AuthProvider>
                      <App />
                   </AuthProvider>
                   <Toaster position="top-right"/>
               </QueryClientProvider>
           </BrowserRouter>
      </ClerkProvider>
  </StrictMode>,
)
