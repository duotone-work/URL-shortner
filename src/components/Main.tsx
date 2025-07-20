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
  const [hasPlayed, setHasPlayed] = useState(false);
  const marioJumpRef = useRef<HTMLImageElement>(null);
  const marioStopRef = useRef<HTMLImageElement>(null);
  const singleCloudRef = useRef<HTMLImageElement>(null);
  const doubleCloudRef = useRef<HTMLImageElement>(null);
  const marioThemeAudioRef = useRef<HTMLAudioElement>(null);
  const marioJumpAudioRef = useRef<HTMLAudioElement>(null);

  const resetApp = () => {
    setLoading(false);
    setShowModal(false);
    setFinalLink("");
  };

  const onButtonClick = () => {
    try {
      let processedLink = link;

      // Add protocol if missing
      if (!link.startsWith("http://") && !link.startsWith("https://")) {
        processedLink = "https://" + link;
      }
      const url = new URL(processedLink);
      if (url.protocol === "http:" || url.protocol === "https:") {
        if (marioThemeAudioRef.current) marioThemeAudioRef.current.pause();
        if (marioJumpAudioRef.current) marioJumpAudioRef.current.play();
        setLoading(true);
        axios
          .post(`${BASE_SHORT_URL}/short`, {
            longUrl: link,
          })
          .then((res) => {
            setTimeout(() => {
              setFinalLink(`${BASE_SHORT_URL}/${res.data}`);
              setLoading(false);
              setShowModal(true);
            }, 1500);
          });
      }
    } catch (err) {
      // err
      console.log("Invalid URL", err);
    }
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

  useEffect(() => {
    const handleFirstInteraction = async () => {
      if (marioThemeAudioRef.current && !hasPlayed) {
        try {
          await marioThemeAudioRef.current.play();
          setHasPlayed(true);
          // Remove listeners after playing
          document.removeEventListener("click", handleFirstInteraction);
          document.removeEventListener("keydown", handleFirstInteraction);
        } catch (error) {
          console.log("Audio play failed:", error);
        }
      }
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [hasPlayed]);

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
      <form className="header_container">
        <audio
          id="my_audio"
          src="/assets/audio/mario_theme.mp3"
          ref={marioThemeAudioRef}
        ></audio>
        <audio
          id="my_audio"
          src="/assets/audio/mario_jump.mp3"
          ref={marioJumpAudioRef}
        ></audio>
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
      </form>
    </>
  );
};

export default Main;
