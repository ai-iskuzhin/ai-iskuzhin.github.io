import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider } from './router'

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>
)

// Production pages ship prerendered markup, so hydrate them. The dev server and
// the 404 fallback serve an empty shell, which has to be client-rendered.
if (container.firstChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
