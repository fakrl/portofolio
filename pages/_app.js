import '../styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Initialize theme
    if (localStorage.getItem('darkMode') === 'true') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return <Component {...pageProps} />
}