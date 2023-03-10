import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BsPlusLg,
  BsPlayFill,
  BsHandThumbsUp,
  BsChevronDown,
  BsHandThumbsDown,
} from "react-icons/bs";
import { BACKEND_URL } from "../utils";
import { AiOutlineCheck } from "react-icons/ai";
import AllContents from "./AllContents";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SlideImg2.scss";

const SlideImg2 = ({
  ele,
  openModal,
  setZindex,
  key,
  index,
  check,
  ranking,
  setCheck,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [mouseEnter, setMouseEnter] = useState(false);

  const like = async () => {
    await axios({
      url: `${BACKEND_URL}/browse/my-list`,
      method: "POST",
      headers: {
        Authorization: sessionStorage.getItem("userToken"),
      },
      params: {
        useremail: sessionStorage.getItem("email"),
        contentId: ele?.id,
      },
    });
    const data = await axios({
      url: `${BACKEND_URL}/browse/my-list/check`,
      method: "GET",
      headers: {
        Authorization: sessionStorage.getItem("userToken"),
      },
      params: {
        useremail: sessionStorage.getItem("email"),
      },
    });
    setCheck(data.data);
  };
  useEffect(() => {
    try {
      const getCategory = async () => {
        const data = await axios({
          url: `${BACKEND_URL}/category`,
          method: "GET",
          params: { id: ele?.id },
        });
        setCategory(data.data);
      };
      getCategory();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const playState = () => {
    navigate("/player", {
      state: ele,
    });
    // navigate("/player", { state: ele });
  };

  return (
    <>
      <div className="netflix-card"
>
        <div className="netflix-card__img-box">
          {/* <img
            src="https://occ-0-993-325.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABXu4kW8ZTdoCyxHF7neSmPN8zCRQ335V4qg2AAyI3JifkUubXAEwcsT3rvKTb44agqTFpJ24wRNAlUkx9s8eDYAOACKcJHLdPCM.webp?r=a84"
            alt=""
          /> */}
          <Link to={isActive ? "/player" : null} state={ele}>
            <img src={ele?.contentImg} alt="" />
          </Link>
        </div>
        <div className="thumbnail-content2">
          <div className="thumbnail-content__icon2">
            <div className="icon-left2">
              <BsPlayFill
                onClick={isActive ? playState : null}
                className="playBtn"
              />

              {check[ele?.id - 1]?.likeStatus ? (
                <AiOutlineCheck onClick={like} style={{ cursor: "pointer" }} />
              ) : (
                <BsPlusLg onClick={like} style={{ cursor: "pointer" }} />
              )}

              <BsHandThumbsUp
                style={{ cursor: "pointer" }}
                className="good"
                onMouseEnter={() => {
                  setMouseEnter(true);
                }}
                onMouseLeave={() => {
                  setMouseEnter(false);
                }}
              />

              <div
                className={mouseEnter ? "hover_box_run" : "hover_box_none"}
                onMouseEnter={() => {
                  setMouseEnter(true);
                }}
                onMouseLeave={() => {
                  setMouseEnter(false);
                }}
              >
                <BsHandThumbsDown />
                <BsHandThumbsUp />
                <div className="good_overlapping">
                  <BsHandThumbsUp />
                  <BsHandThumbsUp />
                </div>
              </div>
            </div>
            <div className="icon-right2"
            style={{cursor: "pointer"}}
            onClick={() => {
              openModal(ele ? ele : null);
              console.log("?????? ?????? : ", ele);
            }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="Hawkins-Icon Hawkins-Icon-Standard"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <div className="content-info">
            <span>97% ??????</span>
            <span style={{marginLeft:"10px"}}>15+</span>
            <span style={{marginLeft:"10px"}}>???????????? 16???</span>
          </div>
          <div className="content-tag video_genre2 flex">
          {category.map((data, index) => {
            return <li key={index}>{data?.categoryType}</li>;
          })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SlideImg2;
