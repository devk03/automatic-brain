import React from "react";
import NoteBox from "@/components/NoteNode/noteBox";
import Draggable from "react-draggable";
import styles from "@/styles/Graph.module.scss";
import { Fragment } from "react";
import { useEffect } from "react";
function setData(data: any) {
    throw new Error("Function not implemented.");
}
export default function Graph() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-graph");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
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


