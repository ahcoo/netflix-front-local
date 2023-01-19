import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import Slider from "react-slick";
import "../styles/SlideImg2.scss";
import SlideImg2 from "./SlideImg2";

const SlideItems2 = ({ openModal, kDramas, check, ranking, setCheck }) => {
  const [ranks, setRanks] = useState([]);
  const [dramas, setDramas] = useState([]);
  const [riseups, setRiseups] = useState([]);
  const [actionAnimes, setActionAnimes] = useState([]);
  const [populars, setPopulars] = useState([]);
  const [only, setOnly] = useState([]);
  const [zindex, setZindex] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const ranks = await axios.get(`${BACKEND_URL}/contents?kw=RANK`);
      const dramas = await axios.get(`${BACKEND_URL}/contents?kw=DRAMA`);
      const riseups = await axios.get(`${BACKEND_URL}/contents?kw=RISE-UP`);
      const actionAnimes = await axios.get(
        `${BACKEND_URL}/contents?kw=ANI-ACT`
      );
      const populars = await axios.get(
        `${BACKEND_URL}/contents?kw=NETFLIX-POP`
      );
      const only = await axios.get(`${BACKEND_URL}/contents?kw=NETFLIX-ONLY`);

      setRanks(ranks.data);
      setDramas(dramas.data);
      setRiseups(riseups.data);
      setActionAnimes(actionAnimes.data);
      setPopulars(populars.data);
      setOnly(only.data);
    };
    getData();
  }, []);

  // Slick 세팅 시작
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex", backgroundColor: "" }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex", background: "" }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false, //carousel 밑에 지정 콘텐츠로 바로 이동할 수 있는 버튼을 뜻한다. flase 할시 사라진다.
    arrows: true,
    infinite: true, // 콘텐츠 끝까지 갔을 때 다음 콘텐츠를 처음 콘텐츠로 가져와 반복한다.
    slidesToShow: 6, //한 화면에 보이는 콘텐츠 개수를 말한다.
    slidesToScroll: 6, //한 번에 넘어가는 콘텐츠 수이다. 2로 정하면 2개씩 넘어간다.
    autoplay: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      // 반응형 옵션
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  // Slick 세팅 끝

  return (
    <div>
      <div className="list-group list-group-1">
        <div className="playlist-title">한국 영화</div>

        <div className="slide-box">
          <div className="slide-list">
            <Slider {...settings}>
              {/* rank 1 */}
              {dramas.map((ele, index) => {
                return (
                  <SlideImg2
                    key={index}
                    index={index}
                    ele={ele}
                    openModal={openModal}
                    setZindex={setZindex}
                    check={check}
                    ranking={ranking}
                    setCheck={setCheck}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
      <div className="list-group list-group-2">
        <div className="playlist-title">한국 영화</div>

        <div className="slide-box">
          <div className="slide-list">
            <Slider {...settings}>
              {/* rank 1 */}
              {dramas.map((ele, index) => {
                return (
                  <SlideImg2
                    key={index}
                    index={index}
                    ele={ele}
                    openModal={openModal}
                    setZindex={setZindex}
                    check={check}
                    ranking={ranking}
                    setCheck={setCheck}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideItems2;
