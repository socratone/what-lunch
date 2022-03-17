import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import Button from '../components/common/Button/Button';
import Loader from '../components/common/Loader/Loader';
import Page from '../components/common/Page/Page';
import TextInput from '../components/common/TextInput/TextInput';
import SearchItemChip from '../components/map/SearchItemChip/SearchItemChip';
import { getCurrentPosition } from '../libs/geolocation';
import { createMarkerImage, createSelectedMarkerImage } from '../libs/kakaoMap';
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
  const markers = useRef<{ id: string; instance: any }[]>([]);
  const selectedMarker = useRef<{ id: string; instance: any }>();
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

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
    const { y: latitude, x: longitude, id } = item;

    const markerPosition = new kakao.maps.LatLng(latitude, longitude); // 마커가 표시될 위치

    // 마커 이미지 생성
    const markerImage = createMarkerImage();

    // 마커 생성
    const marker = new kakao.maps.Marker({
      map: map.current,
      position: markerPosition,
      image: markerImage, // 마커 이미지
    });

    // 마커에 클릭이벤트 등록
    kakao.maps.event.addListener(marker, 'click', () => {
      moveMap(Number(latitude), Number(longitude));

      // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
      // 마커의 이미지를 클릭 이미지로 변경
      if (
        !selectedMarker.current ||
        selectedMarker.current.instance !== marker
      ) {
        // 클릭된 마커 객체가 null이 아니면
        // 클릭된 마커의 이미지를 기본 이미지로 변경하고
        !!selectedMarker.current &&
          selectedMarker.current.instance.setImage(markerImage);

        // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경
        marker.setImage(createSelectedMarkerImage());
      }

      // 클릭된 마커를 현재 클릭된 마커 객체로 설정
      selectedMarker.current = { id, instance: marker };
      setSelectedMarkerId(id); // chip state 변경
    });

    markers.current.push({ id, instance: marker });
  };

  const clearMarker = () => {
    markers.current.forEach((marker) => {
      marker.instance.setMap(null);
    });
  };

  const moveMap = (latitude: number, longitude: number) => {
    const moveLatLon = new kakao.maps.LatLng(latitude, longitude); // 이동할 위도 경도 위치를 생성
    map.current.panTo(moveLatLon); // 지도 중심을 부드럽게 이동, 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동
  };

  const handleClickSearchItem = (item: SearchItem) => {
    const { y, x, id } = item;
    moveMap(Number(y), Number(x)); // 맵 이동

    // 이전에 선택했던 마커의 이미지 변경
    const preSelected = markers.current.find(
      (marker) => marker.id === selectedMarkerId
    );
    if (selectedMarkerId === id) return; // 중복 클릭 방지
    preSelected && preSelected.instance.setImage(createMarkerImage());

    // 지금 선택한 마커의 이미지 변경
    const selected = markers.current.find((marker) => marker.id === id);
    if (selected) {
      selected.instance.setImage(createSelectedMarkerImage());

      // 클릭된 마커를 현재 클릭된 마커 객체로 설정
      selectedMarker.current = { id, instance: selected.instance };
      setSelectedMarkerId(id); // chip state 변경
    }
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
              onClick={() => handleClickSearchItem(item)}
              selected={item.id === selectedMarkerId}
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

export default MapPage;
