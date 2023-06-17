import React from "react";
import { useDispatch } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";
import './profile.scss';
import { Button } from "../UI/button/Button";

const Profile = () => {
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  };

  return (
    <div>
      <Button subClassName="red" onClick={() => dispatch(deleteAvatar())}>delete avatar</Button>
      <label htmlFor="file-upload" className="custom-file-upload">
        Завантажити файл
      </label>
      <input
        id="file-upload"
        accept="image/*"
        onChange={(e) => changeHandler(e)}
        type="file"
        placeholder="Upload avatar"
        name="Upload avatar"
      />
    </div>
  );
};

export default Profile;
