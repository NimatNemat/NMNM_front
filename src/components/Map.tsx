import React, { useEffect } from 'react';

interface Props {
  x: number;
  y: number;
  name: string;
}

const { kakao } = window as any;
function Map(props: Props) {
  const { x, y, name } = props;

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(x, y),
      level: 2,
      disableDoubleClickZoom: true,
      scrollwheel: false,
    };
    const map = new kakao.maps.Map(container, options);
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(x, y),
    });
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const infoWindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;">${name}</div>`,
    });

    infoWindow.open(map, marker);
    marker.setMap(map);
  }, []);

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
}

export default Map;
