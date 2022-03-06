import styled from '@emotion/styled';

type LoaderProps = {
  color?: string;
};

const Loader = ({ color = 'black' }: LoaderProps) => {
  return (
    <Container color={color}>
      <CircularLoader viewBox="25 25 50 50">
        <LoaderPath
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke={color}
          stroke-width="2"
        />
      </CircularLoader>
    </Container>
  );
};

const Container = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;

  @-webkit-keyframes rotate {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes rotate {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124;
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124;
    }
  }
  @-webkit-keyframes color {
    0% {
      stroke: ${(props) => props.color};
    }
    40% {
      stroke: ${(props) => props.color};
    }
    66% {
      stroke: ${(props) => props.color};
    }
    80%,
    90% {
      stroke: ${(props) => props.color};
    }
  }
  @keyframes color {
    0% {
      stroke: ${(props) => props.color};
    }
    40% {
      stroke: ${(props) => props.color};
    }
    66% {
      stroke: ${(props) => props.color};
    }
    80%,
    90% {
      stroke: ${(props) => props.color};
    }
  }
`;

const CircularLoader = styled.svg`
  -webkit-animation: rotate 2s linear infinite;
  animation: rotate 2s linear infinite;
  -webkit-transform-origin: center center;
  -ms-transform-origin: center center;
  transform-origin: center center;

  /* position: absolute; */
  /* top: 0;
  left: 0; */
  margin: auto;
`;

const LoaderPath = styled.circle`
  stroke-dasharray: 150, 200;
  stroke-dashoffset: -10;
  -webkit-animation: dash 1.5s ease-in-out infinite,
    color 6s ease-in-out infinite;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
`;

export default Loader;
