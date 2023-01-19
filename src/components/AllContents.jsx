import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Modal from "./Modal";
import RankingSlide from "./RankingSlide";
import SlideItems from "./SlideItems";
import TestVideo from "./TestVideo";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { rankingState } from "../recoil/ranking";
import SlideItems2 from "./SlideItems2";

const AllContents = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState({});
  const [ranking, setRanking] = useRecoilState(rankingState);
  const [allContents, setAllContents] = useState([]);
  const [kDramas, setKDramas] = useState([]);
  const [check, setCheck] = useState([]);

  // const targetRef = useRef(null);

  // const handleScroll = () => {
  //   if (window.screenY > 0) {
  //     targetRef.current.style.background = "red";
  //   }
  // };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => {
  //       clearInterval(timer);
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   });
  // }, []);

  const openModal = (content) => {
    setModalOpen(true);
    setCurrentContent(content);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const getRank = async () => {
      const data = await axios({
        url: `${BACKEND_URL}/rank`,
        method: "GET",
        headers: {
          Authorization: sessionStorage.getItem("userToken"),
        },
      });
      setRanking(data.data);
    };
    getRank();

    const getContent = async () => {
      const data = await axios({
        url: `${BACKEND_URL}/allcontent`,
        method: "GET",
        headers: {
          Authorization: sessionStorage.getItem("userToken"),
        },
      });
      setAllContents(data.data);
    };
    getContent();

    const getKDrama = async () => {
      const data = await axios(`${BACKEND_URL}/contents?kw=DRAMA`);
      setKDramas(kDramas.data);
    };
    getKDrama();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await axios({
        url: `${BACKEND_URL}/browse/my-list/check`,
        method: "GET",
        params: {
          useremail: sessionStorage.getItem("email"),
        },
        headers: {
          Authorization: sessionStorage.getItem("userToken"),
        },
      });
      setCheck(data.data);
    };
    getData();
  }, []);

  return (
    <div className="App">
      <TestVideo openModal={openModal} allContents={allContents[55]} />
      <RankingSlide
        openModal={openModal}
        ranking={ranking}
        allContents={allContents}
        check={check}
        setCheck={setCheck}
      />
      <SlideItems2
        openModal={openModal}
        kDramas={kDramas}
        check={check}
        ranking={ranking}
        setCheck={setCheck}
      />
      <Modal
        open={modalOpen}
        close={closeModal}
        header="Modal heading"
        currentContent={currentContent}
        check={check}
        setCheck={setCheck}
      />

      <Footer />
    </div>
  );
};

export default AllContents;
