import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavLayout from './components/common/NavLayout/NavLayout';
import { AccessTokenContext } from './contexts/AccessTokenContext';
import MapPage from './pages/MapPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

const Router = () => {
  const { accessToken } = useContext(AccessTokenContext);

  return (
    <Routes>
      {accessToken ? (
        <Route element={<NavLayout />}>
          <Route path="/map" element={<MapPage />} />
          <Route path="*" element={<Navigate to="/map" />} />
        </Route>
      ) : (
        <>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
