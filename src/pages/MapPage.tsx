import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import Button from '../components/common/Button/Button';
import Loader from '../components/common/Loader/Loader';
import Page from '../components/common/Page/Page';
import TextInput from '../components/common/TextInput/TextInput';
import { getCurrentPosition } from '../libs/geolocation';
import { SearchResult } from '../libs/kakaoMap/types';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

type Location = { latitude: number; longitude: number };

const MapPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );
  const [mapLoading, setMapLoading] = useState(true);

  const [myLocation, setMyLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      getCurrentPosition().then(({ latitude, longitude }) => {
        setMyLocation({ latitude, longitude });

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

        setMapLoading(false);
      });
    }
  }, []);

  const handleChangeSearchValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const keywordSearch = () => {
    if (!myLocation) return;

    const places = new kakao.maps.services.Places();

    places.keywordSearch(
      searchValue,
      (result: SearchResult[], status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log('result:', result);
          setSearchResults(result);
        }
      },
      {
        x: myLocation.longitude,
        y: myLocation.latitude,
        radius: 1000, // 1000m
        size: 5,
        sort: kakao.maps.services.SortBy.DISTANCE,
      }
    );
  };

  return (
    <Page fullWidth>
      <FlexColumn>
        <FilterContainer>
          <div>별점 ⭐️⭐️⭐️⭐️⭐️</div>
        </FilterContainer>
        <SearchContainer>
          <TextInput value={searchValue} onChange={handleChangeSearchValue} />
          <Button onClick={keywordSearch}>검색</Button>
        </SearchContainer>
        <SearchItems>
          {searchResults?.map((item) => (
            <SearchItem key={item.id}>{item.place_name}</SearchItem>
          ))}
        </SearchItems>
        <KakaoMap ref={mapRef}>{mapLoading && <Loader />}</KakaoMap>
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

const SearchContainer = styled.div`
  padding: 0 20px;
  min-height: 40px;
  margin-bottom: 10px;

  > *:first-of-type {
    margin-right: 10px;
  }
`;

const KakaoMap = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchItems = styled.div`
  display: flex;
  padding: 0 20px;
  flex-wrap: wrap;

  > * {
    margin-bottom: 10px;
  }

  > * {
    margin-right: 10px;
  }
`;

const SearchItem = styled.div`
  cursor: pointer;
  background: dodgerblue;
  border-radius: 5px;
  color: white;
  padding: 5px;
`;

export default MapPage;
