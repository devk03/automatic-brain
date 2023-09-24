import React from "react";
import NoteBox from "@/components/NoteNode/noteBox";
import Draggable from "react-draggable";
import styles from "@/styles/Graph.module.scss";
import { Fragment } from "react";
export default function graph() {
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
