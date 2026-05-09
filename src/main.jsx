import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Always start a fresh visit at the top of the page with no hash anchor,
// so reloads can't drop the user mid-experience while the document is
// still scroll-locked behind the FUTURE zoom.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
if (window.location.hash) {
  window.history.replaceState(
    null,
    '',
    window.location.pathname + window.location.search
  )
}
window.scrollTo(0, 0)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
