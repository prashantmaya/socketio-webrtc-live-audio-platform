import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../shared/TextInput/TextInput.jsx";
import { createRoom as create } from "../../http/index";
import { useHistory } from "react-router-dom";

const AddRoomModal = ({ handleOpenClose }) => {
  const history = useHistory();
  const [activeRoomType, setActiveRoomType] = useState("open");
  const [topic, setTopic] = useState("");

  function handleTypeChange(type) {
    setActiveRoomType(type);
  }

  async function createRoom() {
    try {
      if (!topic) return;
      const { data } = await create({ topic, roomType: activeRoomType });
      history.push(`/room/${data.id}`);
    } catch (error) {
      console.log("Error: ", error.message);
    }
    //server call here.
  }
  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button className={styles.closeButton} onClick={handleOpenClose}>
          <img src="/images/close.svg" alt="close" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be discussed.</h3>
          <TextInput
            fullWidth="true"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <h2 className={styles.subheading}> Room Types</h2>
          <div className={styles.roomTypes}>
            <div
              className={`${styles.typeBox} ${
                activeRoomType === "open" ? styles.active : ""
              }`}
              onClick={() => handleTypeChange("open")}
            >
              <span className={styles.roomIcon}> 🌍 </span>
              <span className={styles.roomIconText}>Open</span>
            </div>
            <div
              className={`${styles.typeBox} ${
                activeRoomType === "social" ? styles.active : ""
              }`}
              onClick={() => handleTypeChange("social")}
            >
              <span className={styles.roomIcon}> 🕵🏻‍♀️ </span>
              <span className={styles.roomIconText}>Social</span>
            </div>
            <div
              className={`${styles.typeBox} ${
                activeRoomType === "private" ? styles.active : ""
              }`}
              onClick={() => handleTypeChange("private")}
            >
              <span className={styles.roomIcon}> 🔐 </span>
              <span className={styles.roomIconText}>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, Open for everyone!</h2>
          <button className={styles.footerButton} onClick={createRoom}>
            <span className={styles.buttonIcon}>🎉</span>
            <span className={styles.buttonText}>Let's go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
