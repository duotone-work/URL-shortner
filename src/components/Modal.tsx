import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import Button from "./Button";
import styles from "./Modal.module.css";
import Clipboardjs from "clipboard";

const Modal = ({
  showModal,
  finalLink,
  resetApp,
  setLink,
  singleCloudRef,
  doubleCloudRef,
}: {
  showModal: boolean;
  finalLink?: string;
  setLink: Dispatch<SetStateAction<string>>;
  resetApp: () => void;
  singleCloudRef: RefObject<HTMLImageElement | null>;
  doubleCloudRef: RefObject<HTMLImageElement | null>;
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
        if (!modalRef.current) return;
        modalRef.current.classList.remove(styles.modal_move_up_animated);
        if (singleCloudRef.current)
          singleCloudRef.current.classList.remove("modal_single_cloud_move");
        if (doubleCloudRef.current)
          doubleCloudRef.current.classList.remove("modal_double_cloud_move");
      }, 10);
      setTimeout(() => {
        setCopied(false);
        resetApp();
      }, 1000);
    });

    return () => {
      clipboard.destroy();
    };
  }, [btnRef.current, finalLink]);

  useEffect(() => {
    setLink("");
    if (modalRef.current) {
      if (showModal) {
        if (singleCloudRef.current)
          singleCloudRef.current.classList.add("modal_single_cloud_move");
        if (doubleCloudRef.current)
          doubleCloudRef.current.classList.add("modal_double_cloud_move");
        setTimeout(() => {
          if (!modalRef.current) return;
          modalRef.current.classList.add(styles.modal_move_up_animated);
        }, 50);
      }
    }
  }, [showModal]);

  if (!showModal) return;

  return (
    <div className={styles.modal_overlay} ref={modalRef}>
      <div className={styles.modal}>
        <div className={styles.psuedo_border}></div>
        <div className={styles.psuedo_border}></div>
        <div className={styles.modal_actions}>
          <img
            src="/assets/images/close-button.png"
            width={40}
            height={40}
            alt=""
            onClick={() => {
              setLink("");
              setTimeout(() => {
                if (!modalRef.current) return;
                modalRef.current.classList.remove(
                  styles.modal_move_up_animated
                );
                if (singleCloudRef.current)
                  singleCloudRef.current.classList.remove(
                    "modal_single_cloud_move"
                  );
                if (doubleCloudRef.current)
                  doubleCloudRef.current.classList.remove(
                    "modal_double_cloud_move"
                  );
              }, 10);
              setTimeout(() => {
                resetApp();
              }, 1000);
            }}
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
              ref={btnRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
