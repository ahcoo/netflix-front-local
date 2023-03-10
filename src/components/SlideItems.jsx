import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import Slider from "react-slick";
import "../styles/SlideItems.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/SlideVideo.css";
import SlideImg from "./SlideImg";

const SlideItems = ({ openModal, kDramas, check, ranking, setCheck }) => {
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

  // Slick μΈν μμ
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
    dots: false, //carousel λ°μ μ§μ  μ½νμΈ λ‘ λ°λ‘ μ΄λν  μ μλ λ²νΌμ λ»νλ€. flase ν μ μ¬λΌμ§λ€.
    arrows: true,
    infinite: true, // μ½νμΈ  λκΉμ§ κ°μ λ λ€μ μ½νμΈ λ₯Ό μ²μ μ½νμΈ λ‘ κ°μ Έμ λ°λ³΅νλ€.
    slidesToShow: 6, //ν νλ©΄μ λ³΄μ΄λ μ½νμΈ  κ°μλ₯Ό λ§νλ€.
    slidesToScroll: 6, //ν λ²μ λμ΄κ°λ μ½νμΈ  μμ΄λ€. 2λ‘ μ νλ©΄ 2κ°μ© λμ΄κ°λ€.
    autoplay: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      // λ°μν μ΅μ
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
  // Slick μΈν λ

  return (
    <div
      className="slide-body"
      style={{
        zIndex: "3",
        position: "relative",
        overflow: "hidden",
        padding: " 0 0 5vh 0",
      }}
    >
      <div className="slideItems-all-container">
        <div className="slide-container flex flex_jc_start">
          <a href="#">
            <div
              className="slide-title-text text-test"
              style={zindex ? { zIndex: "0" } : { zIndex: "1" }}
            >
              νκ΅­ λλΌλ§
              {/* <div className="slide-detail-hover"> */}
              <div className="slide-detail-text">λͺ¨λ λ³΄κΈ°</div>
              <img
                className="slide-arrow-img"
                src="https://img.icons8.com/metro/10/54b9c5/forward.png"
              />
              {/* </div> */}
            </div>
          </a>
        </div>
        <Slider {...settings}>
          {/* rank 1 */}
          {dramas.map((ele, index) => {
            return (
              <SlideImg
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

      <div className="slideItems-all-container">
        <div className="slide-container flex flex_jc_start">
          <a href="#">
            <div
              className="slide-title-text text-test"
              style={zindex ? { zIndex: "0" } : { zIndex: "1" }}
            >
              μ§κΈ λ¨λ μ½νμΈ 
              {/* <div className="slide-detail-hover"> */}
              <div className="slide-detail-text">λͺ¨λ λ³΄κΈ°</div>
              <img
                className="slide-arrow-img"
                src="https://img.icons8.com/metro/10/54b9c5/forward.png"
              />
              {/* </div> */}
            </div>
          </a>
        </div>
        <Slider {...settings}>
          {/* rank 1 */}
          {riseups.map((ele, index) => {
            return (
              <SlideImg
                ele={ele}
                key={index}
                index={index}
                openModal={openModal}
                style={{ zIndex: "10" }}
                setZindex={setZindex}
                check={check}
                setCheck={setCheck}
              />
            );
          })}
        </Slider>
      </div>

      <div className="slideItems-all-container">
        <div className="slide-container flex flex_jc_start">
          <a href="#">
            <div
              className="slide-title-text text-test"
              style={zindex ? { zIndex: "0" } : { zIndex: "1" }}
            >
              μ‘μ μ λ
              {/* <div className="slide-detail-hover"> */}
              <div className="slide-detail-text">λͺ¨λ λ³΄κΈ°</div>
              <img
                className="slide-arrow-img"
                src="https://img.icons8.com/metro/10/54b9c5/forward.png"
              />
              {/* </div> */}
            </div>
          </a>
        </div>
        <Slider {...settings}>
          {/* rank 1 */}
          {actionAnimes.map((ele, index) => {
            return (
              <SlideImg
                ele={ele}
                key={index}
                index={index}
                openModal={openModal}
                style={{ zIndex: "10" }}
                setZindex={setZindex}
                check={check}
                setCheck={setCheck}
              />
            );
          })}
        </Slider>
      </div>

      <div className="slideItems-all-container">
        <div className="slide-container flex flex_jc_start">
          <a href="#">
            <div
              className="slide-title-text text-test"
              style={zindex ? { zIndex: "0" } : { zIndex: "1" }}
            >
              λ·νλ¦­μ€ μΈκΈ° μ»¨νμΈ 
              {/* <div className="slide-detail-hover"> */}
              <div className="slide-detail-text">λͺ¨λ λ³΄κΈ°</div>
              <img
                className="slide-arrow-img"
                src="https://img.icons8.com/metro/10/54b9c5/forward.png"
              />
              {/* </div> */}
            </div>
          </a>
        </div>
        <Slider {...settings}>
          {/* rank 1 */}
          {populars.map((ele, index) => {
            return (
              <SlideImg
                ele={ele}
                key={index}
                index={index}
                openModal={openModal}
                style={{ zIndex: "10" }}
                setZindex={setZindex}
                check={check}
                setCheck={setCheck}
              />
            );
          })}
        </Slider>
      </div>

      <div
        className="slideItems-all-container"
        style={{ paddingBottom: "3vh" }}
      >
        <div className="slide-container flex flex_jc_start">
          <a href="#">
            <div
              className="slide-title-text text-test"
              style={zindex ? { zIndex: "0" } : { zIndex: "1" }}
            >
              μ€μ§ λ·νλ¦­μ€μμλ§
              {/* <div className="slide-detail-hover"> */}
              <div className="slide-detail-text">λͺ¨λ λ³΄κΈ°</div>
              <img
                className="slide-arrow-img"
                src="https://img.icons8.com/metro/10/54b9c5/forward.png"
              />
              {/* </div> */}
            </div>
          </a>
        </div>
        <Slider {...settings}>
          {/* rank 1 */}
          {only.map((ele, index) => {
            return (
              <SlideImg
                ele={ele}
                key={index}
                index={index}
                openModal={openModal}
                style={{ zIndex: "10" }}
                setZindex={setZindex}
                check={check}
                setCheck={setCheck}
              />
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default SlideItems;
