import styled from '@emotion/styled';

type TextInputProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  type?: 'password';
};

const TextInput = ({
  value,
  onChange,
  placeholder,
  fullWidth,
  style,
  type,
}: TextInputProps) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: fullWidth ? '100%' : undefined, ...style }}
      type={type}
    />
  );
};

const Input = styled.input`
  border: 1px solid #d2d2d2;
  height: 52px;
  font-size: 16px;
  border-radius: 4px;
  padding: 0 14px;

  ::placeholder {
    color: #b8b8b8;
  }
`;

export default TextInput;
