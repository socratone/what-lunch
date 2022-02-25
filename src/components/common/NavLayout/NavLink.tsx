import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

type NavLinkProps = {
  selected?: boolean;
  children: string;
  to: string;
};

const NavLink = ({ children, to, selected }: NavLinkProps) => {
  if (selected) {
    return <SelectedLink to={to}>{children}</SelectedLink>;
  }

  return <UnSelectedLink to={to}>{children}</UnSelectedLink>;
};

const SelectedLink = styled(Link)`
  background-color: green;
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 0 10px;
  display: flex;
  align-items: center;
`;

const UnSelectedLink = styled(Link)`
  color: #828282;
  font-size: 16px;
  font-weight: 500;
  padding: 0 10px;
  display: flex;
  align-items: center;
`;

export default NavLink;
