import styled from '@emotion/styled';
import SearchIcon from './SearchIcon';

type SearchInputProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
  style?: React.CSSProperties;
};

const SearchInput = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  fullWidth,
  style,
}: SearchInputProps) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      onSubmit(value);
    }
  };

  const handleClickIcon = () => {
    onSubmit(value);
  };

  return (
    <Container>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
        style={{ width: fullWidth ? '100%' : undefined, ...style }}
      />
      <IconContainer onClick={handleClickIcon}>
        <SearchIcon color={value ? 'black' : '#d2d2d2'} size={23} />
      </IconContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  height: 38px;
  display: flex;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 0 35px 0 8px;
  flex-grow: 1;
  border: 0;
  border-radius: 4px;

  ::placeholder {
    color: #b8b8b8;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 35px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default SearchInput;
