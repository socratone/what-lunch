const DEFAULT_LATITUDE = 37.4979517;
const DEFAULT_LONGITUDE = 127.0276188;

export const getCurrentPosition = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // success
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          // error
          resolve({
            latitude: DEFAULT_LATITUDE,
            longitude: DEFAULT_LONGITUDE,
          });
        }
      );
    } else {
      resolve({
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE,
      });
    }
  });
};
