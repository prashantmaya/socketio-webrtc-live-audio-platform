import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { logout } from "../../../http";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";

const Navigation = () => {
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.authSlice);

  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log("Error - logoutUser: ", error);
    }
  }

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <span style={{ fontSize: 30 }}>👋🏻</span>
        <span style={logoText}>Codershouse</span>
      </Link>
      {isAuth && (
        <div className={styles.navRight}>
          <h3>{user?.name}</h3>
          <Link to="/">
            <img
              className={styles.avatar}
              src={
                user.avatar
                  ? `${process.env.REACT_APP_API_URL}${user.avatar}`
                  : "/images/Monkey-icon.png"
              }
              width="40"
              height="40"
              alt="avatar"
            />
          </Link>

          <button onClick={logoutUser} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
