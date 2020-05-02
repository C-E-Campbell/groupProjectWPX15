import React, { useRef, useState } from "react";
import "./ImageUpload.style.scss";
import axios from "axios";
import defaultPic from "./default.png";
const ImageUploader = props => {
  const [file, setFile] = useState("");

  const filePickerRef = useRef();
  const overlay = useRef();
  const plus = useRef();
  const img = useRef();
  const formBtn = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  // const plusOpacity1 = () => {
  //   plus.current.style.opacity = 1;
  //   img.current.style.filter = "blur(2px)";
  // };
  // const plusOpacity0 = () => {
  //   plus.current.style.opacity = 0;
  //   img.current.style.filter = "blur(0px)";
  // };

  const submitPhoto = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("file", file);

    try {
      const result = await axios.post(`/auth/imageupload/${props.id}`, fd, {
        headers: {
          "content-type": "multipart/form-data"
        }
      });
      props.getPhoto(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const pickedHandler = async e => {
    try {
      await setFile(e.target.files[0]);
      const fd = new FormData();
      fd.append("file", file);
      formBtn.current.click();
    } catch (err) {}
  };

  return (
    <div className="img-container">
      <div
        ref={overlay}

        // onMouseOver={plusOpacity1}
        // onMouseOut={plusOpacity0}
        // className="img-overlay"
      >
        <i ref={plus} className="fas fa-plus fa-lg"></i>
      </div>
      {props.pic === "" || props.pic === undefined ? (
        <img
          onClick={pickImageHandler}
          ref={img}
          className="imgUpload1"
          src={defaultPic}
          alt="preview"
        />
      ) : (
        <img
          onClick={pickImageHandler}
          ref={img}
          className="imgUpload"
          src={`.${props.pic}`}
          alt="preview"
        />
      )}

      <form
        onSubmit={e => {
          submitPhoto(e);
        }}
        encType="multipart/form-data"
      >
        <input
          ref={filePickerRef}
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={e => pickedHandler(e)}
        />
        <button style={{ display: "none" }} ref={formBtn} type="submit">
          send
        </button>
      </form>
    </div>
  );
};

export default ImageUploader;
