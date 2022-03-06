import styled from '@emotion/styled';
import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AccessTokenContext } from '../../../contexts/AccessTokenContext';
import { removeUserToken } from '../../../libs/userTokenStorage';
import NavLink from './NavLink';

const NAV_HEIGHT = 40;

const NavLayout = () => {
  const navigate = useNavigate();
  const { changeAccessToken } = useContext(AccessTokenContext);

  const handleSignOut = () => {
    changeAccessToken('');
    removeUserToken('access');
    navigate('/signin');
  };

  return (
    <Container>
      <Header>
        <Nav>
          <NavLink to="/map">지도</NavLink>
          <SignOutButton onClick={handleSignOut}>로그아웃</SignOutButton>
        </Nav>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;

const Header = styled.header`
  height: ${NAV_HEIGHT}px;
  border-bottom: 1px solid #e4e4e4;
`;

const Nav = styled.nav`
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;

  > *:first-of-type {
    padding-left: 0;
  }
`;

const Main = styled.main`
  height: calc(100% - ${NAV_HEIGHT}px);
`;

const SignOutButton = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;

  :hover {
    font-weight: 700;
  }
`;

export default NavLayout;
