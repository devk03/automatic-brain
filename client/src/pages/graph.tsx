import React, { useEffect, useState } from "react";
import NoteBox from "@/components/Nodes/NoteNode/noteBox";
import Draggable from "react-draggable";
import styles from "../styles/Graph.module.scss";
import PORT_NUMBER from "../constants/constants";
import Flow from "@/components/Flow";
import 'reactflow/dist/style.css';

export default function Graph() {
  return (
    //add height of 100% to div
    <div className={styles.App}>
      <Flow />
      <h1>Graph</h1>
    </div>
  );
}
