import React, { useEffect } from "react";
import { useLocation } from "react-router";
import proj4 from "proj4";

function NaverMap() {
  const location = useLocation();
  const { naver } = window;

  proj4.defs("WGS84", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");
  proj4.defs(
    "TM128",
    "+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"
  );
  //console.log("location:", location);

  // let infoOfPlace = useMemo(() => {
  //   return location.data.data.items;
  // }, [location.data]);
  // console.log("infoOfPlace:", infoOfPlace);

  console.log("location:", location);

  let infoOfPlace = location.data.data.items;

  let lng = parseInt(infoOfPlace[0].mapx, 10);
  let lat = parseInt(infoOfPlace[0].mapy, 10);

  let xy = [lng, lat];
  let resLocation = proj4("TM128", "WGS84", xy);

  const mapOptions = {
    center: new naver.maps.LatLng(33.386625156730965, 126.52905333401526),
    zoom: 10,
  };
  // 지도위에 찍을 마커들 모은 배열
  const markers = [];

  // 각 마커들에 대한 정보 배열
  const infoWindows = [];

  console.log("전달 받은 데이터 1: ", location);
  // console.log("전달 받은 데이터 lng:", lng, "전달 받은 데이터 lat:", lat);

  // 마커로 표시할 장소 정보
  const locations = [
    {
      place: "제주 국제 공항",
      lat: 33.51037769855868,
      lng: 126.49137485571009,
    },
    {
      place: "신라호텔 제주",
      lat: 33.24738520818772,
      lng: 126.40803709803367,
    },
    {
      place: "섬앤썸 카페",
      lat: 33.489076685258944,
      lng: 126.39094935570954,
    },
    {
      place: "국립 제주 박물관",
      lat: 33.5135001616777,
      lng: 126.54894786920391,
    },
    {
      place: "제주 담아",
      lat: 33.353119113457616,
      lng: 126.1865064226368,
    },

    {
      place: infoOfPlace[0].title,
      lat: resLocation[1], // resLocation은 경도 위도를 하나의 배열안에 넣어 둔것이다
      lng: resLocation[0],
    },
  ];
  console.log("locations: ", locations);

  useEffect(() => {
    const map = new naver.maps.Map("map", mapOptions);

    for (let i = 0; i < locations.length; i++) {
      // 위 정보들을 이용하여 마커 생성
      let marker = new naver.maps.Marker({
        map: map,
        title: locations[i].place,
        position: new window.naver.maps.LatLng(
          locations[i].lat,
          locations[i].lng
        ),
        zIndex: 100,
      });

      let contentString = [
        '<div style="width:200px;text-align:center;padding:10px;"><b>',
        locations[i].place,
        //'<a href=`${locations[i].url}` target="_blank">www.airport.co.kr/jeju</a>',
        "</b><br>-네이버 지도 -</div>",
      ].join("");
      //`${locations[i].webSite}`. , https://www.airport.co.kr/jeju/index.do
      // a태그 안에 속성값으로 변수 = url로 지정해서 넣기

      // 생성된 마커의 정보를 xml형식으로
      let infoWindow = new naver.maps.InfoWindow({
        content: contentString,
      });

      markers.push(marker);
      infoWindows.push(infoWindow);

      const getClickHandler = (seq) => {
        return function (e) {
          // 클릭한 마커와 마커의 정보
          let marker = markers[seq],
            infoWindow = infoWindows[seq];

          // 정보를 지도위 마커에 표시
          infoWindow.open(map, marker);
        };
      };

      for (let i = 0, ii = markers.length; i < ii; i++) {
        window.naver.maps.Event.addListener(
          markers[i],
          "click",
          getClickHandler(i)
        );
      }
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "1000px", height: "600px" }}></div>
    </div>
  );
}

export default NaverMap;
