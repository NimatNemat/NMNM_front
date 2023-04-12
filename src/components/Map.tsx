import React, { useEffect } from 'react';

interface Props {
  x: string;
  y: string;
  name: string;
}

const { kakao } = window as any;
function Map(props: Props) {
  const { x, y, name } = props;
  const X = parseFloat(y);
  const Y = parseFloat(x);
  // const X = 37.5463365886719;
  // const Y = 127.075735440582;
  console.log(X, Y);
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(X, Y),
      level: 2,
      disableDoubleClickZoom: true,
      scrollwheel: false,
    };
    const map = new kakao.maps.Map(container, options);
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(X, Y),
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
