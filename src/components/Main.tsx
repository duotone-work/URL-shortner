import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";

const Main = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [finalLink, setFinalLink] = useState("");
  const marioJumpRef = useRef<HTMLImageElement>(null);
  const marioStopRef = useRef<HTMLImageElement>(null);

  const resetApp = () => {
    setLink("");
    setLoading(false);
    setShowModal(false);
    setFinalLink("");
  };

  const onButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowModal(true);
      setFinalLink("https://ritik.cc");
    }, 1000);
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
      <Modal showModal={showModal} resetApp={resetApp} finalLink={finalLink} />
      <main className="header_container">
        <div className="title_container">
          <img
            className={`title_double_cloud ${
              showModal ? "modal_double_cloud_move" : ""
            }`}
            src="/assets/images/double_cloud.png"
            alt="double-clouds"
          />
          <img
            className={`title_single_cloud ${
              showModal ? "modal_single_cloud_move" : ""
            }`}
            src="/assets/images/single_cloud.png"
            alt="single-clouds"
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
