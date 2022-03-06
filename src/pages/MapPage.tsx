import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import Page from '../components/common/Page/Page';
import { getCurrentPosition } from '../libs/geolocation';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const MapPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      getCurrentPosition().then(({ latitude, longitude }) => {
        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        const map = new kakao.maps.Map(mapRef.current, options);

        // 현재 위치 마커
        var markerPosition = new kakao.maps.LatLng(latitude, longitude);

        // 마커 생성
        var marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // kakao.maps.event.addListener(marker, 'click', function () {
        //   window.open('http://kko.to/zjqllOCLO');
        // });
      });
    }
  }, []);

  return (
    <Page fullWidth>
      <FlexColumn>
        <FilterContainer>
          <div>별점 ⭐️⭐️⭐️⭐️⭐️</div>
        </FilterContainer>
        <KakaoMap ref={mapRef} />
      </FlexColumn>
    </Page>
  );
};

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FilterContainer = styled.div`
  padding: 0 20px;
  min-height: 40px;
  display: flex;
  align-items: center;
`;

const KakaoMap = styled.div`
  width: 100%;
  flex-grow: 1;
`;

export default MapPage;
