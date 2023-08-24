import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import globalStyles from "../../../App.module.css";
import styles from "./StepAvatar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http";
import { setAuth } from "../../../store/authSlice";

const StepAvatar = ({ onNext }) => {
  const { name, avatar } = useSelector((state) => state.activateSlice);
  const [image, setImage] = useState("/images/Monkey-icon.png");
  const dispatch = useDispatch();

  async function submit() {
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        dispatch(setAuth({ user: data }));
      }
    } catch (error) {
      console.log("error: While activating user: ", error);
    }
  }

  function captureImage(event) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = function () {
      setImage(fileReader.result);
      dispatch(setAvatar(fileReader.result));
    };
  }

  return (
    <>
      <div className={globalStyles.cardWrapper}>
        <Card title={`Hey ${name}, Add your Avatar.`} icon="">
          <p className={styles.subHeading}>How's this picture?</p>
          <div className={styles.avatarWrapper}>
            <img src={image} alt="monkey" className={styles.avatarImage} />
          </div>
          <div>
            <input
              onChange={(e) => captureImage(e)}
              type="file"
              id="avatarInput"
              className={styles.avatarInput}
            />
            <label htmlFor="avatarInput" className={styles.avatarLabel}>
              Choose a different picture.
            </label>
          </div>
          <div className={styles.ctaButton}>
            <Button text="Next" onClick={submit} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepAvatar;
