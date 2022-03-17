import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import Button from '../components/common/Button/Button';
import Loader from '../components/common/Loader/Loader';
import Page from '../components/common/Page/Page';
import TextInput from '../components/common/TextInput/TextInput';
import { getCurrentPosition } from '../libs/geolocation';
import { SearchItem } from '../libs/kakaoMap/types';

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

type Location = { latitude: number; longitude: number };

const MapPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<any>();
  const createdMarkers = useRef<any[]>([]);

  const [searchValue, setSearchValue] = useState('');
  const [searchItems, setSearchItems] = useState<SearchItem[] | null>(null);
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

        map.current = new kakao.maps.Map(mapRef.current, options);

        // 현재 위치 마커
        const markerPosition = new kakao.maps.LatLng(latitude, longitude);

        // 마커 생성
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map.current); // 마커가 지도 위에 표시되도록 설정

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
      (result: SearchItem[], status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          clearMarker();

          setSearchItems(result);
          result.forEach((item) => {
            createMarker(item);
          });
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

  const createMarker = (item: SearchItem) => {
    const { y: latitude, x: longitude } = item;

    const markerPosition = new kakao.maps.LatLng(latitude, longitude); // 마커가 표시될 위치
    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'; // 마커 이미지의 이미지 주소
    const imageSize = new kakao.maps.Size(24, 35); // 마커 이미지의 이미지 크기

    // 마커 이미지 생성
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커 생성
    const marker = new kakao.maps.Marker({
      map: map.current,
      position: markerPosition,
      image: markerImage, // 마커 이미지
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', () => {
      moveMap(Number(latitude), Number(longitude));
    });

    createdMarkers.current.push(marker);
  };

  const clearMarker = () => {
    createdMarkers.current.forEach((marker) => {
      marker.setMap(null);
    });
  };

  const moveMap = (latitude: number, longitude: number) => {
    const moveLatLon = new kakao.maps.LatLng(latitude, longitude); // 이동할 위도 경도 위치를 생성
    map.current.panTo(moveLatLon); // 지도 중심을 부드럽게 이동, 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동
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
        <SearchItemContainer>
          {searchItems?.map((item) => (
            <SearchItemChip
              key={item.id}
              onClick={() => moveMap(Number(item.y), Number(item.x))}
            >
              {item.place_name}
            </SearchItemChip>
          ))}
        </SearchItemContainer>
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

const SearchItemContainer = styled.div`
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

const SearchItemChip = styled.div`
  cursor: pointer;
  background: dodgerblue;
  border-radius: 5px;
  color: white;
  padding: 5px;
`;

export default MapPage;
