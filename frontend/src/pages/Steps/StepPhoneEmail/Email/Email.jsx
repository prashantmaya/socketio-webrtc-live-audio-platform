import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import styles from "../StepPhoneEmail.module.css";
import TextInput from "../../../../components/shared/TextInput/TextInput";

const Email = ({ onTypeChange, onNext }) => {
  const [email, setEmail] = useState("");
  return (
    <Card title="Enter your email" icon="✉️">
      <TextInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="iamshaaann@gmail.com"
      />
      <div>
        <div className={styles.ctaButton}>
          <Button text="Next" onClick={onNext} />
        </div>
        <p className={styles.buttomParagraph}>
          By entering your number, you're agreeing to our Terms of Service and
          Privacy Policy, Thank you.
        </p>
      </div>
    </Card>
  );
};

export default Email;
