import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

type NavLinkProps = {
  children: string;
  to: string;
};

const NavLink = ({ children, to }: NavLinkProps) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

const StyledLink = styled(Link)`
  color: black;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;

  :hover {
    font-weight: 700;
  }
`;

export default NavLink;
