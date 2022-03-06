import styled from '@emotion/styled';
import { PRIMARY, PRIMARY_HOVER } from '../../../styles/colors';

type ButtonProps = {
  children: string;
  onClick: () => void;
  style?: React.CSSProperties;
};

const Button = ({ children, onClick, style }: ButtonProps) => {
  return (
    <Btn onClick={onClick} style={style}>
      {children}
    </Btn>
  );
};

const Btn = styled.button`
  background: ${PRIMARY};
  padding: 10px;
  color: white;
  font-weight: 700;
  border-radius: 5px;
  border: 0;
  cursor: pointer;

  :hover {
    background: ${PRIMARY_HOVER};
  }
`;

export default Button;
