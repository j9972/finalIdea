import React from "react";

function tripHome() {
  return (
    <div className="main">
      <div id="headerArea">
        <nav id="headerNav" className="headerNavShadow">
          <div className="navWrapper">
            <a href="#" className="headerLeft">
              <b>여행가자</b>
              <h7 id="navLongText">&nbsp; MAKE YOUR OWN TRIP SCHEDULE</h7>
            </a>
            <a href="#" className="headerRight">
              로그인
            </a>
          </div>
        </nav>
      </div>
      <div className="contentArea">
        <div className="contentLeftArea">left</div>
        <div className="contentMiddleArea">Middle</div>
        <div className="contentRightArea">right</div>
      </div>
    </div>
  );
}

export default tripHome;
