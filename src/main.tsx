import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/global.css'
import { StoreProvider } from './common/contexts/StoreContext.tsx'
import queryClient from './common/configs/queryClient.ts'
import { QueryClientProvider } from '@tanstack/react-query'
import { ModalContextProvider } from './common/contexts/ModalContext.tsx'
import ModalManager from './components/ui/ModalManager.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <ModalContextProvider>
          <App />
          <ModalManager />
        </ModalContextProvider>
      </StoreProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
