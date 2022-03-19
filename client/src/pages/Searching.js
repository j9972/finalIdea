import React, { useState, useEffect, useCallback } from "react";
// import SearchData from "../components/SearchData";
import { useNavigate } from "react-router-dom";
// import { naverLocalApi } from "../api";
import proj4 from "proj4";
import axios from "axios";

// function Locals({ site }) {
//   return (
//     <div className="locals">
//       {site.map((item, index) => (
//         <SearchData
//           key={index}
//           //id={item.link}
//           title={item.title}
//           description={item.description}
//           telephone={item.telephone}
//           link={item.link}
//           address={item.address}
//           roadAddress={item.roadAddress}
//           //카텍좌표계 값으로 제공된다. 이 좌표값은 지도 API와 연동 가능하다 mapx ,mapy
//           // 카텍 좌표계 = TM좌표계와 유사한 필요성에 의해 주로 네비게이션 회사가 사용하는 좌표계
//           mapx={item.mapx}
//           mapy={item.mapy}
//         />
//       ))}
//     </div>
//   );
// }

function Searching({ res, appSiteInfo, setAppSiteInfo }) {
  const [site, setSite] = useState([]);
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const getSearchLocation = useCallback(async () => {
    // C언어 기반의 PROJ를 Javascript 언어로 그대로 만들어낸 proj4.js를 사용하여 좌표를 전환?
    proj4.defs("WGS84", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");
    proj4.defs(
      "TM128",
      "+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"
    );

    try {
      // if문으로 검색하지 않을때 검색창을 볼 수 있게 loading 페이지를 false로 만들기
      if (value === "") {
        setSite([]);
      } else {
        await axios
          .post("http://localhost:3003/search/search", { search: value })
          .then((response) => {
            if (response.error) {
              console.log(response.error);
            } else {
              console.log(response.data);
              setSite(value);
            }
          });
      }
    } catch (e) {
      console.log(e);
    }
  }, [value]);

  /*
        res = await naverLocalApi.search(search);

        const siteInfo = res.data.items;

        console.log("siteInfo:", siteInfo);

        setSite(siteInfo);
        setAppSiteInfo(siteInfo);

        let lng = parseInt(siteInfo[0].mapx, 10);
        let lat = parseInt(siteInfo[0].mapy, 10);

        let xy = [lng, lat];
        let resLocation = proj4("TM128", "WGS84", xy);
        console.log("경도 위도 : ", resLocation);
        setIsLoading(false);
      }*/

  // const memoSearchLocation = useMemo(getSearchLocation, [res]);

  // rendering 되는 부분들은 hook에서 useEffect 안에 넣어서 rendering 하기
  // useEffect(async () => {
  //   console.log("useEffect 실행됨");
  //   await getSearchLocation();
  // }, []);

  useEffect(() => {
    console.log("site2:", site);
  }, [site]);

  const navigateFunc = () => {
    navigate("/map", {
      data: {
        res,
      },
    });
  };

  // value가 변하는걸 체크
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // submit시 변경되게 체크
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await getSearchLocation();
      //navigateFunc();
    },
    [value, site]
  );

  return (
    <section className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="input_div">
            <h1>지역 검색</h1>
            <input
              className="input_search"
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="지역를 검색해 보세요."
            />
          </div>
          {/* <Locals site={site} /> */}
        </div>
      </form>
    </section>
  );
}

export default Searching;

/*
location && location.items.map(() => {}) 이렇게 하는 이유는 map에 관한 2개의 에러때문
1. cannot read property 'map' of undefined
  ->  location && location
2. map is not a function
  -> location.items.map 해야함

  -> 정확한 이유는 notion error  부분 체크하기
*/
