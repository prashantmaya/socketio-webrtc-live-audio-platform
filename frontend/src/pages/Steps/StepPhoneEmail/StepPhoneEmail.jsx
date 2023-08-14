import React, { useState } from "react";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import styles from "./StepPhoneEmail.module.css";
import globalStyles from "../../../App.module.css";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};
const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];

  function onTypeChange() {
    setType(type === "phone" ? "email" : "phone");
  }

  return (
    <>
      <div className={globalStyles.cardWrapper}>
        <div>
          <div className={styles.buttonWrap}>
            <button
              onClick={onTypeChange}
              className={`${styles.tabButton} ${
                type === "phone" && styles.active
              }`}
            >
              <span style={{ fontSize: 40 }}>📞</span>
            </button>
            <button
              onClick={onTypeChange}
              className={`${styles.tabButton} ${
                type === "email" && styles.active
              }`}
            >
              <span style={{ fontSize: 40 }}>✉️</span>
            </button>
          </div>
          <Component onTypeChange={onTypeChange} onNext={onNext} />
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
