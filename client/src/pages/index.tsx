import React, { Fragment } from "react";
import Link from "next/link";
import styles from '../styles/Index.module.scss';

export default function Home() {
  return (
    <Fragment>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to your automatic brain.</h1>
      </div>
      <div className={styles.linkContainer}>
        <Link href="/scraper">Scrape</Link>
        <br />
        <Link href="/notes">Notes</Link>
      </div>
    </Fragment>
  );
}
