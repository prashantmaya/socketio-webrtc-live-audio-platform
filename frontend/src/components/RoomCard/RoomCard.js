import React from "react";
import styles from "./RoomCard.module.css";
import { useHistory } from "react-router-dom";

const RoomCard = ({ room }) => {
  const history = useHistory();
  return (
    <div
      className={styles.card}
      onClick={() => history.push(`/room/${room.id}`)}
    >
      <h3>{room.topic}</h3>
      <div
        className={`${styles.speakers} ${
          room.speakers.length === 1 && styles.singleSpeaker
        }`}
      >
        <div className={styles.avatars}>
          {room.speakers.map((speaker) => {
            return (
              <div key={speaker.id}>
                <img src={speaker.avatar} alt="avatar" />
              </div>
            );
          })}
        </div>
        <div className={styles.names}>
          {room.speakers.map((speaker) => {
            return (
              <div className={styles.nameWrapper} key={speaker.id}>
                <span>{speaker.name}</span>
                <span> 💭</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.peopleCount}>
        <span>{room.totalPeople}</span>
        <span> 🙍🏻‍♂️</span>
      </div>
    </div>
  );
};

export default RoomCard;
