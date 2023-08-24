import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import globalStyles from "../../../App.module.css";
import styles from "./StepName.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activateSlice.name);
  const dispatch = useDispatch();

  const [fullname, setFullname] = useState(name);

  function nextStep() {
    if (!fullname) {
      return;
    }
    dispatch(setName(fullname));
    onNext();
  }

  return (
    <>
      <div className={globalStyles.cardWrapper}>
        <Card title="What is you full name?" icon="🥸">
          <TextInput
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <div>
            <div className={styles.ctaButton}>
              <Button text="Next" onClick={nextStep} />
            </div>
            <p className={styles.buttomParagraph}>
              Please use your real name at Codershouse.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepName;
