import React from "react";
import "./file.scss";
import dirLogo from "../../../../assets/dir.svg";
import fileLogo from "../../../../assets/file.svg";
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import { downloadFile, deleteFile } from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";
import { Button } from "../../../UI/button/Button";

const File = ({ file }) => {
  const dispatch = useDispatch();
  const { currentDir, view } = useSelector((state) => state.files);

  const openDirHandler = (file) => {
    if (file.type === "dir") {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  };
  const downLoadClickHandler = (e) => {
    e.stopPropagation();
    downloadFile(file);
  };
  const deleteClickHandler = (e) => {
    e.stopPropagation();
    dispatch(deleteFile(file));
  };

  if (view === "list") {
    return (
      <div className="file" onClick={() => openDirHandler(file)}>
        <img src={file.type === "dir" ? dirLogo : fileLogo} alt="" />
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
        {file.type !== "dir" && (
          <div className="file__btn file__download">
            <Button onClick={downLoadClickHandler} subClassName="blue">
              download
            </Button>
          </div>
        )}
        <div className="file__btn file__delete">
          <Button onClick={(e) => deleteClickHandler(e)} subClassName="red">
            delete
          </Button>
        </div>
      </div>
    );
  }
  if (view === "plate") {
    return (
      <div className="file-plate" onClick={() => openDirHandler(file)}>
        <img
          className="file-plate__img"
          src={file.type === "dir" ? dirLogo : fileLogo}
          alt=""
        />
        <div className="file-plate__name">{file.name}</div>

        <div className="file-plate__btns">
          {file.type !== "dir" && (
            <div className="file-plate__btn file-plate__download">
              <Button onClick={downLoadClickHandler} subClassName="blue">
                download
              </Button>
            </div>
          )}
          <div className="file-plate__btn file-plate__delete">
            <Button onClick={(e) => deleteClickHandler(e)} subClassName="red">
              delete
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default File;
