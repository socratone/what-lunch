import Router from './Router';
import { AccessTokenContextProvider } from './contexts/AccessTokenContext';

function App() {
  return (
    <AccessTokenContextProvider>
      <Router />
    </AccessTokenContextProvider>
  );
}

export default App;
