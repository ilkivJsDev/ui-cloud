import React, { useState } from "react";
import Input from "../input/Input";
import { useDispatch, useSelector } from "react-redux";
import { setPopupDisplay } from "../../reducers/fileReducer";
import { createDir } from "../../actions/file";
import crossIcon from "../../assets/img/cross.svg";
import { Button } from "../UI/button/Button";

const Popup = () => {
  const [dirName, setDirName] = useState("");
  const { popupDisplay } = useSelector((state) => state.files);
  const { currentDir } = useSelector((state) => state.files);

  const dispatch = useDispatch();

  const createHandler = () => dispatch(createDir(currentDir, dirName));

  return (
    <div
      className="popup"
      style={{ display: popupDisplay }}
      onClick={() => dispatch(setPopupDisplay("none"))}
    >
      <div className="popup__content" onClick={(e) => e.stopPropagation()}>
        <div className="popup__header">
          <div className="popup__title">Create new directory</div>
          <button
            className="popup__close"
            onClick={() => dispatch(setPopupDisplay("none"))}
          >
            <img src={crossIcon} alt="" />
          </button>
        </div>
        <Input
          type="text"
          placeholder="Enter name directory..."
          value={dirName}
          setValue={setDirName}
        />
        <div className="popup__create">
          <Button subClassName="blue" onClick={() => createHandler()}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
