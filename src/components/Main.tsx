import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import axios from "axios";
import { BASE_SHORT_URL } from "../constants/misc";

const Main = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [finalLink, setFinalLink] = useState("");
  const marioJumpRef = useRef<HTMLImageElement>(null);
  const marioStopRef = useRef<HTMLImageElement>(null);
  const singleCloudRef = useRef<HTMLImageElement>(null);
  const doubleCloudRef = useRef<HTMLImageElement>(null);

  const resetApp = () => {
    setLoading(false);
    setShowModal(false);
    setFinalLink("");
  };

  const onButtonClick = () => {
    setLoading(true);
    axios
      .post(`${BASE_SHORT_URL}/short`, {
        longUrl: link,
      })
      .then((res) => {
        setFinalLink(`${BASE_SHORT_URL}/${res.data}`);
        setLoading(false);
        setShowModal(true);
      });
  };

  useEffect(() => {
    if (loading) {
      if (marioStopRef.current?.style) {
        marioStopRef.current.style.opacity = "0";
      }
      if (marioJumpRef.current?.style) {
        marioJumpRef.current.style.opacity = "1";
        marioJumpRef.current.classList.add("bounce");
      }
    } else {
      if (marioStopRef.current?.style) {
        marioStopRef.current.style.opacity = "1";
      }
      if (marioJumpRef.current?.style) {
        marioJumpRef.current.style.opacity = "0";
        marioJumpRef.current.classList.remove("bounce");
      }
    }
  }, [loading]);

  return (
    <>
      <Modal
        showModal={showModal}
        resetApp={resetApp}
        setLink={setLink}
        finalLink={finalLink}
        singleCloudRef={singleCloudRef}
        doubleCloudRef={doubleCloudRef}
      />
      <main className="header_container">
        <div className="title_container">
          <img
            className="title_double_cloud"
            src="/assets/images/double_cloud.png"
            alt="double-clouds"
            ref={doubleCloudRef}
          />
          <img
            className="title_single_cloud"
            src="/assets/images/single_cloud.png"
            alt="single-clouds"
            ref={singleCloudRef}
          />
          <div className="font_title">Shorten URL</div>
        </div>
        <div className="font_subtitle">Tiny links for big wins</div>
        <Input setLink={setLink} link={link} />
        <div className="submit_container">
          <img
            className={`btn_mario ${link.length > 0 ? "move_up_animated" : ""}`}
            src="/assets/images/mario_stop.png"
            alt=""
            ref={marioStopRef}
          />
          <img
            className="btn_mario_jump"
            src="/assets/images/mario_jump.png"
            alt=""
            ref={marioJumpRef}
          />
          <Button
            btnText={loading ? "Loading..." : "Shorten"}
            disabled={link.length <= 0 || loading}
            onClickAction={onButtonClick}
          />
        </div>
      </main>
    </>
  );
};

export default Main;
