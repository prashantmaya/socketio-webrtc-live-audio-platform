import React from "react";
import styles from "./TextInput.module.css";

const TextInput = ({ ...rest }) => {
  return (
    <div>
      <input type="text" {...rest} className={styles.input} />
    </div>
  );
};

export default TextInput;
