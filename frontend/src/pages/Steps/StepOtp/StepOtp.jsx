import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepOtp.module.css";
import globalStyles from "../../../App.module.css";
import { verifyOtp } from "../../../http";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../../store/authSlice";

const StepOtp = ({ onNext }) => {
  const [OTP, setOTP] = useState("");
  const auth = useSelector((state) => state.authSlice.otp);
  const dispatch = useDispatch();

  async function submit() {
    try {
      const { data } = await verifyOtp({
        otp: OTP,
        phone_number: auth.phone,
        hash: auth.hash,
      });
      console.log("Data: ", data);
      dispatch(setAuth({ user: data }));
      // onNext();
    } catch (error) {
      console.log("Error: verifyOTP ", error);
    }
  }

  return (
    <div className={globalStyles.cardWrapper}>
      <Card title="Enter the code we just texted you." icon="🔐">
        <TextInput value={OTP} onChange={(e) => setOTP(e.target.value)} />
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
    </div>
  );
};

export default StepOtp;
