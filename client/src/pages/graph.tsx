import React, { useEffect, useState } from "react";
import NoteBox from "@/components/NoteNode/noteBox";
import Draggable from "react-draggable";
import styles from "@/styles/Graph.module.scss";
import PORT_NUMBER from "../constants/constants";

export default function Graph() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("fetching data");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:${PORT_NUMBER}/get-graph`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseJson = await response.json(); // No need to JSON.parse(data)
        setData(responseJson["data"]); // Set data directly
        console.log(data); // Log the parsed data
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Draggable>
        <div className={styles.box}>
            <NoteBox />
        </div>
      </Draggable>
    </>
  );
}
