import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import NavLink from './NavLink';

const NavLayout = () => {
  const location = useLocation();

  return (
    <Container>
      <Header>
        <Nav>
          <NavLink to="/home" selected={location.pathname === '/home'}>
            홈
          </NavLink>
          <NavLink to="/signin" selected={location.pathname === '/signin'}>
            로그인
          </NavLink>
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
  height: 60px;
  border-bottom: 1px solid #e4e4e4;
`;

const Nav = styled.nav`
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 30px 0 20px;
`;

const Main = styled.main`
  height: calc(100% - 60px);
  background: #f6f6f6;
`;

export default NavLayout;
