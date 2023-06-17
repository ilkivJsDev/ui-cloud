import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles, uploadFile } from "../../actions/file";
import "./disk.scss";
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import {
  setCurrentDir,
  setFileView,
  setPopupDisplay,
} from "../../reducers/fileReducer";
import Uploader from "./uploader/Uploader";
import BackIcon from "../../assets/img/back-button.png";
import { Button } from "../UI/button/Button";

const Disk = () => {
  const dispatch = useDispatch();
  const { currentDir } = useSelector((state) => state.files);
  const { dirStack } = useSelector((state) => state.files);
  const { loader } = useSelector((state) => state.app);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("type");

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  const showPopupHandler = () => dispatch(setPopupDisplay("flex"));

  const backClickHandler = () => {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  };
  const fileUploadHandler = (e) => {
    const files = [...e.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };
  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  };

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }
  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="disk__btns">
        <button className="disk__back" onClick={() => backClickHandler()}>
          <img src={BackIcon} alt="" />
        </button>
        <div className="create__dir">
        <Button
          className="disk__create"
          subClassName="green"
          onClick={() => showPopupHandler()}
        >
          Create directory
        </Button>
        </div>

        <div className="disk__upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">
            Download file
          </label>
          <input
            multiple={true}
            onChange={(e) => fileUploadHandler(e)}
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="disk__select"
        >
          <option value="name">By name</option>
          <option value="type">By type</option>
          <option value="date">By date</option>
        </select>
        <button
          className="disk__plate"
          onClick={() => dispatch(setFileView("plate"))}
        />
        <button
          className="disk__list"
          onClick={() => dispatch(setFileView("list"))}
        />
      </div>
      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className="drop-area"
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      drag files here
    </div>
  );
};

export default Disk;
