import React, { useState } from "react";
import "./navbar.scss";
import Logo from "../../assets/img/navbar-logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { getFiles, searchFiles } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";
import avatarLogo from "../../assets/img/avatar.svg";
import { API_URL } from "../../config";

const Navbar = () => {
  const { isAuth, currentUser } = useSelector((state) => state.user);
  const { currentDir } = useSelector((state) => state.files);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  const avatar = currentUser.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo;

  const searchChangeHandler = (e) => {
    setSearchName(e.target.value);
    if (searchTimeout != false) clearTimeout(searchTimeout);
    dispatch(showLoader());
    if (e.target.value !== "") {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFiles(value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <NavLink to="/">
          <img src={Logo} alt="" className="navbar__logo" />
        </NavLink>

        <div className="navbar__header">MERN CLOUD</div>
        {isAuth && (
          <input
            value={searchName}
            onChange={(e) => searchChangeHandler(e)}
            className="navbar__search"
            type="text"
            placeholder="File name..."
          />
        )}
        {!isAuth && (
          <div className="navbar__login">
            <NavLink to="login">Login</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className="navbar__registration">
            <NavLink to="registration">Registration</NavLink>
          </div>
        )}
        {isAuth && (
          <div className="navbar__login" onClick={() => dispatch(logout())}>
            Log out
          </div>
        )}
        {isAuth && (
          <NavLink to="/profile">
            <img className="navbar__avatar" src={avatar} alt="avatar" />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
