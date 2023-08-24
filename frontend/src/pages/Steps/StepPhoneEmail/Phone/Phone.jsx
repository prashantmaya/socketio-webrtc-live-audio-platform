import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import styles from "../StepPhoneEmail.module.css";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { sendOtp } from "../../../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";

const Phone = ({ onTypeChange, onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();

  async function submit() {
    const { data } = await sendOtp({ phone_number: phoneNumber });
    console.log("Data: ", data);
    dispatch(setOtp({ phone: data.phone_number, hash: data.hash }));
    onNext();
  }
  return (
    <Card title="Enter your phone number" icon="☎️">
      <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="+91 98976 76565"
      />
      <div>
        <div className={styles.ctaButton}>
          <Button text="Next" onClick={submit} />
        </div>
        <p className={styles.buttomParagraph}>
          By entering your number, you're agreeing to our Terms of Service and
          Privacy Policy, Thank you.
        </p>
      </div>
    </Card>
  );
};

export default Phone;
