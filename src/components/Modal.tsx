import Button from "./Button";
import styles from "./Modal.module.css";

const Modal = ({
  showModal,
  finalLink,
  resetApp,
}: {
  showModal: boolean;
  finalLink?: string;
  resetApp: () => void;
}) => {
  if (!showModal) return;
  return (
    <div className={styles.modal_overlay}>
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
              btnText="Copy Link"
              onClickAction={() => {
                resetApp();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
