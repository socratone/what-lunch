import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button/Button';
import TextInput from '../components/common/TextInput/TextInput';
import { signUp } from '../libs/firebase/auth';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeVerifyPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerifyPassword(event.target.value);
  };

  const handleSubmit = async () => {
    if (password !== verifyPassword) {
      return alert('비밀번호가 일치하지 않습니다!');
    }

    try {
      await signUp(email, password);
      navigate('/signin');
    } catch (error) {
      console.log('error:', error);
    }
  };

  return (
    <Container>
      <Title>📨 이메일로 회원 가입</Title>
      <Message>
        좋은 생각이야!
        <br />
        후딱 가입하고 결정 장애를 극복해보자~
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
        style={{ marginBottom: '10px' }}
      />
      <TextInput
        value={verifyPassword}
        onChange={handleChangeVerifyPassword}
        placeholder="비밀번호 확인"
        type="password"
        style={{ marginBottom: '15px' }}
      />
      <Button onClick={handleSubmit}>회원 가입</Button>
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

export default SignUpPage;
