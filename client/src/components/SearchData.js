import React from "react";
import PropTypes from "prop-types";

// prop-type 을 사용하는 이유 : 이 파일에서 보내는 데이터의 유효성을 검증하기 위해 사용

function SearchData({
  //id,
  title,
  link,
  description,
  telephone,
  address,
  roadAddress,
  mapy,
  mapx,
}) {
  return (
    <div>
      {/* <p>
        <span>{id}</span>
      </p> */}
      <p>
        <span>{title}</span>
      </p>
      <p>
        <span>{link}</span>
      </p>
      <p>
        <span>{description}</span>
      </p>
      <p>
        <span>{telephone}</span>
      </p>
      <p>
        <span>{address}</span>
      </p>
      <p>
        <span>{roadAddress}</span>
      </p>
      <p>
        <span>{mapx}</span>
      </p>
      <p>
        <span>{mapy}</span>
      </p>
    </div>
  );
}

SearchData.propTypes = {
  //id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  telephone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  roadAddress: PropTypes.string.isRequired,
  mapx: PropTypes.string.isRequired,
  mapy: PropTypes.string.isRequired,
};

export default SearchData;
