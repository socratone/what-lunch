import styled from '@emotion/styled';
import React, { useState } from 'react';
import TextInput from '../components/signIn/TextInput/TextInput';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Container>
      <Title>🤔 점심 뭐 먹지?</Title>
      <Message>
        아직도 뭐 먹을지 고민해?
        <br />
        로그인하고 가까운 음식점을 찾아봐!
      </Message>
      <TextInput
        value={email}
        onChange={handleChangeEmail}
        placeholder="이메일"
        style={{ marginBottom: '10px' }}
      />
      <TextInput
        value={password}
        onChange={handleChangePassword}
        placeholder="비밀번호"
        type="password"
        style={{ marginBottom: '15px' }}
      />
      <button>로그인</button>
    </Container>
  );
};

const Container = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 25px;
  margin-bottom: 10px;
`;

const Message = styled.p`
  text-align: center;
  line-height: 1.5;
  margin-bottom: 10px;
`;

export default SignInPage;
