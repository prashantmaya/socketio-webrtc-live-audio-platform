import React, { useEffect, useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import globalStyles from "../../../App.module.css";
import styles from "./StepAvatar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http";
import { setAuth } from "../../../store/authSlice";
import Loader from "../../../components/shared/Loader/Loader";

const StepAvatar = ({ onNext }) => {
  const { name, avatar } = useSelector((state) => state.activateSlice);
  const [image, setImage] = useState("/images/Monkey-icon.png");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dispatch = useDispatch();

  const activateUser = async () => {
    try {
      setLoading(true);
      const { data } = await activate({ name, avatar });
      if (data.auth && !mounted) {
        dispatch(setAuth(data));
      }
    } catch (error) {
      console.log("Error: activateUser: ", error);
    } finally {
      setLoading(false);
    }
  };

  function submit() {
    activateUser();
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

  useEffect(() => {
    return () => {
      setMounted(true);
    };
  }, []);

  if (loading) return <Loader message="Activation in progress..." />;
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
