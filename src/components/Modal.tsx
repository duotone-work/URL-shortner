import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import styles from "./Modal.module.css";
import Clipboardjs from "clipboard";

const Modal = ({
  showModal,
  finalLink,
  resetApp,
}: {
  showModal: boolean;
  finalLink?: string;
  resetApp: () => void;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!btnRef.current) return;
    const clipboard = new Clipboardjs(btnRef.current, {
      text: () => finalLink || "",
    });

    clipboard.on("success", () => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        resetApp();
      }, 1000);
    });

    return () => {
      clipboard.destroy();
    };
  }, [btnRef, finalLink]);

  useEffect(() => {
    if (!modalRef.current) return;
    let currentPosition = 100;
    const intervalId = setInterval(() => {
      currentPosition -= 1;
      if (!modalRef.current) {
        clearInterval(intervalId);
        return;
      }
      modalRef.current.style.top = `${currentPosition}%`;
      if (currentPosition <= 0) {
        clearInterval(intervalId);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, []);

  if (!showModal) return;

  return (
    <div className={styles.modal_overlay} ref={modalRef}>
      <div className={styles.modal}>
        <div className={styles.psuedo_border}></div>
        <div className={styles.psuedo_border}></div>
        <div className={styles.modal_actions}>
          <img
            src="/assets/images/close.png"
            width={24}
            height={24}
            alt=""
            onClick={resetApp}
          />
        </div>
        <div className="font_title">Link is ready!</div>
        <div className={styles.modal_body}>
          <div className={styles.modal_subtitle}>
            Copy the shortened URL to share
          </div>
          <input
            disabled
            className={styles.shortened_url_area}
            value={finalLink}
          />
          <div>
            <Button
              btnText={copied ? "Copied" : "Copy Link"}
              onClickAction={() => {}}
              disabled={!!btnRef.current || copied}
              ref={btnRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
