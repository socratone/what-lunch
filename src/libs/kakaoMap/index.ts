declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const MARKER_WIDTH = 33; // 기본, 클릭 마커의 너비
const MARKER_HEIGHT = 36; // 기본, 클릭 마커의 높이
const OFFSET_X = 12; // 기본, 클릭 마커의 기준 X좌표
const OFFSET_Y = MARKER_HEIGHT; // 기본, 클릭 마커의 기준 Y좌표
const SPRITE_MARKER_URL =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markers_sprites2.png'; // 스프라이트 마커 이미지 URL
const SPRITE_WIDTH = 126; // 스프라이트 이미지 너비
const SPRITE_HEIGHT = 146; // 스프라이트 이미지 높이
const SPRITE_GAP = 10; // 스프라이트 이미지에서 마커간 간격

const gapX = MARKER_WIDTH + SPRITE_GAP;
const originY = MARKER_HEIGHT + SPRITE_GAP;

export const createSelectedMarkerImage = () => {
  const markerSize = new kakao.maps.Size(MARKER_WIDTH, MARKER_HEIGHT);
  const markerOffset = new kakao.maps.Point(OFFSET_X, OFFSET_Y); // 기본, 클릭 마커의 기준좌표
  const clickOrigin = new kakao.maps.Point(gapX, originY);
  const spriteImageSize = new kakao.maps.Size(SPRITE_WIDTH, SPRITE_HEIGHT); // 스프라이트 이미지의 크기

  const markerImage = new kakao.maps.MarkerImage(
    SPRITE_MARKER_URL, // 스프라이트 마커 이미지 URL
    markerSize, // 마커의 크기
    {
      offset: markerOffset, // 마커 이미지에서의 기준 좌표
      spriteOrigin: clickOrigin, // 스트라이프 이미지 중 사용할 영역의 좌상단 좌표
      spriteSize: spriteImageSize, // 스프라이트 이미지의 크기
    }
  );

  return markerImage;
};

export const createMarkerImage = () => {
  const imageSrc =
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'; // 마커 이미지의 이미지 주소
  const imageSize = new kakao.maps.Size(24, 35); // 마커 이미지의 이미지 크기
  return new kakao.maps.MarkerImage(imageSrc, imageSize);
};
