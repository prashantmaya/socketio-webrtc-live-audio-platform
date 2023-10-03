import React, { useEffect, useState } from "react";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRoom } from "../../http/index";

import styles from "./Room.module.css";

const Room = () => {
  const [room, setRoom] = useState(null);
  const [isMute, setIsMute] = useState(true);
  const { user } = useSelector((state) => state.authSlice);
  const { id: roomId } = useParams();
  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
  const history = useHistory();
  console.log("client: ", clients);

  function handleManualLeave() {
    history.push("/rooms");
  }

  useEffect(() => {
    handleMute(isMute, user);
  }, [isMute]);

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      console.log("data: ", data);
      setRoom((prev) => data);
    };
    fetchRoom();
  }, [roomId]);

  function handleMuteClick(clientId) {
    if (clientId !== user.id) return;
    setIsMute((isMute) => !isMute);
  }
  return (
    <div>
      <div className={"container"}>
        <button className={styles.goBack} onClick={handleManualLeave}>
          <span style={{ fontSize: "24px" }}>←</span>
          <span className={styles.Heading}>All Voicerooms</span>
        </button>
      </div>
      <div className={styles.clientsWrap}>
        <div className={styles.clientsHeader}>
          <h2 className={styles.topic}>{room?.topic}</h2>
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <span className={styles.actionBtnIcon}>✋🏻</span>
            </button>
            <button className={styles.actionBtn} onClick={handleManualLeave}>
              <span className={styles.actionBtnIcon}>✌🏻</span>
              <span className={styles.actionBtnText}>Leave quietly</span>
            </button>
          </div>
        </div>

        <div className={styles.clientsList}>
          {clients.map((client) => {
            console.log("Client:l , ", client);
            return (
              <div className={styles.client} key={client.id}>
                <div className={styles.userHead}>
                  <audio
                    ref={(instance) => provideRef(instance, client.id)}
                    autoPlay
                  />
                  <img
                    src={`${process.env.REACT_APP_API_URL}${client.avatar}`}
                    className={styles.userAvatar}
                    alt="avatar"
                  />
                  <button
                    className={styles.micBtn}
                    onClick={() => handleMuteClick(client.id)}
                  >
                    {client.muted ? (
                      <img src="/images/mic-mute.svg" alt="mic-mute-icon" />
                    ) : (
                      <img src="/images/mic.svg" alt="mic-icon" />
                    )}
                  </button>
                </div>
                <h4 className={styles.clientName}>{client.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Room;
