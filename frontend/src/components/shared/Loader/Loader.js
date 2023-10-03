import React from "react";
import Card from "../Card/Card";
import styles from "./Loader.module.css";

const Loader = ({ message }) => {
  return (
    <div className={styles.cardWrapper}>
      <Card>
        {/* <img
          src="/images/loading1.gif"
          alt="loader"
          className={styles.spinner}
        /> */}
        <span className={styles.message}>{message}</span>
      </Card>
    </div>
  );
};

export default Loader;
