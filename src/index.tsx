import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import '../src/style/_main.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Providers } from './contexts/Providers';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Provider store={store}>
      <Providers>
        <App />
      </Providers>
    </Provider>
  </Router>,
);
