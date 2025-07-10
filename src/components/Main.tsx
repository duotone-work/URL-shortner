import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const Main = () => {
  const [link, setLink] = useState("");
  return (
    <main className="header_container">
      <div className="title_container">
        <img
          className="title_double_cloud"
          src="/assets/images/double_cloud.png"
          alt="double-clouds"
        />
        <img
          className="title_single_cloud"
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
        />
        <Button btnText="Shorten" disabled={link.length <= 0} />
      </div>
    </main>
  );
};

export default Main;
