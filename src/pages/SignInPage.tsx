import styled from '@emotion/styled';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button/Button';
import TextInput from '../components/common/TextInput/TextInput';
import { AccessTokenContext } from '../contexts/AccessTokenContext';
import { signin } from '../libs/firebase/auth';
import { storeUserToken } from '../libs/userTokenStorage';

const SignInPage = () => {
  const navigate = useNavigate();
  const { changeAccessToken } = useContext(AccessTokenContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickSignUp = () => {
    navigate('/signup');
  };

  const handleSubmit = async () => {
    const trimedEmail = email.trim();
    const trimedPassword = password.trim();

    if (!trimedEmail || !trimedPassword) {
      return alert('값을 입력하세요!');
    }

    try {
      const user = await signin(trimedEmail, trimedPassword);
      changeAccessToken(user.accessToken);
      storeUserToken('access', user.accessToken);
      navigate('/');
    } catch (error) {
      console.log('error:', error);
    }
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
      <Button onClick={handleSubmit} style={{ marginBottom: '10px' }}>
        로그인
      </Button>
      <LinkText onClick={handleClickSignUp}>회원 가입</LinkText>
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

const LinkText = styled.a`
  cursor: pointer;
  color: grey;
`;

export default SignInPage;
