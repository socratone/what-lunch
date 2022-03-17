import styled from '@emotion/styled';
import { PRIMARY } from '../../../styles/colors';

type SearchItemChipProps = {
  onClick: () => void;
  selected?: boolean;
  children: string;
};

const SearchItemChip = ({
  onClick,
  selected,
  children,
}: SearchItemChipProps) => {
  return (
    <Button
      onClick={onClick}
      style={{
        background: selected ? PRIMARY : 'white',
        color: selected ? 'white' : PRIMARY,
      }}
    >
      {children}
    </Button>
  );
};

const Button = styled.button`
  cursor: pointer;
  border: 1px solid ${PRIMARY};
  border-radius: 5px;
  color: white;
  padding: 5px;
`;

export default SearchItemChip;
