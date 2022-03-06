import styled from '@emotion/styled';

type PageProps = {
  children: React.ReactNode;
  fullWidth?: boolean;
};

const Page = ({ children, fullWidth }: PageProps) => {
  return <Container fullWidth={fullWidth}>{children}</Container>;
};

const Container = styled.section<{ fullWidth?: boolean }>`
  padding: ${(props) => (props.fullWidth ? undefined : '0 20px')};
  height: 100%;
`;

export default Page;
