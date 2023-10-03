import React, { useEffect, useState } from "react";
import styles from "./Rooms.module.css";
import RoomCard from "../../components/RoomCard/RoomCard";
import AddRoomModal from "../../components/AddRoomModal/AddRoomModal";
import { getAllRooms } from "../../http";

const Rooms = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      const { data } = await getAllRooms();
      setRooms(data);
    }
    fetchRooms();
  }, []);
  // const rooms = [
  //   {
  //     id: 1,
  //     topic: "Which framework best for frontend ?",
  //     speakers: [
  //       {
  //         id: 1,
  //         name: "Anushka Sharma",
  //         avatar: "/images/Monkey-icon.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Virat Kohli",
  //         avatar: "/images/Monkey-icon.png",
  //       },
  //     ],
  //     totalPeople: 40,
  //   },
  //   {
  //     id: 3,
  //     topic: "What’s new in machine learning?",
  //     speakers: [
  //       {
  //         id: 1,
  //         name: "Sam Billings",
  //         avatar: "/images/Monkey-icon.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Maria Sharapoa",
  //         avatar: "/images/Monkey-icon.png",
  //       },
  //     ],
  //     totalPeople: 40,
  //   },
  //   {
  //     id: 4,
  //     topic: "Why people use stack overflow?",
  //     speakers: [
  //       {
  //         id: 1,
  //         name: "Barak Obama",
  //         avatar: "/images/Monkey-icon.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Michele Obama",
  //         avatar: "/images/Monkey-icon.png",
  //       },
  //     ],
  //     totalPeople: 40,
  //   },
  //   {
  //     id: 5,
  //     topic: "Artificial inteligence is the future?",
  //     speakers: [
  //       {
  //         id: 1,
  //         name: "Raghav Juyal",
  //         avatar: "/images/Monkey-icon.png",
  //       },
  //       {
  //         id: 2,
  //         name: "Shakti Mohan",
  //         avatar: "/images/Monkey-icon.png",
  //       },
  //     ],
  //     totalPeople: 40,
  //   },
  // ];

  function handleOpenClose() {
    setShowModal(!showModal);
  }

  return (
    <>
      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>Active voice rooms</span>
            <div className={styles.searchBox}>
              <img src={"/images/search.svg"} alt="search" />
              <input type="text" className={styles.input} />
            </div>
          </div>
          <div className={styles.right}>
            <button className={styles.startRoom} onClick={handleOpenClose}>
              <span style={{ fontSize: "24px" }}>🔈</span>
              <span>Start a room</span>
            </button>
          </div>
        </div>

        <div className={styles.roomList}>
          {rooms.map((room) => {
            return <RoomCard room={room} key={room.id} />;
          })}
        </div>
      </div>
      {showModal && <AddRoomModal handleOpenClose={handleOpenClose} />}
    </>
  );
};

export default Rooms;
