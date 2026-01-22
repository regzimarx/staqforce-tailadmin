import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import MainApp from './Components/App'
import { Ziggy } from './ziggy'
import { route } from 'ziggy-js'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    // Make route helper globally available
    window.route = route;
    route.Ziggy = Ziggy;
    
    const root = createRoot(el);
    root.render(
      <MainApp>
        <App {...props} />
      </MainApp>
    )
  },
})