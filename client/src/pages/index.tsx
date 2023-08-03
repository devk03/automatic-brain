import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import scraper from "./scraper";
export default function Home() {
  useEffect(() => {
    fetch("http://127.0.0.1:8000/scrape")
      .then((res: any) => res.json())
      .then((data: any) => console.log(data));
  }, []);
  return (
    <Fragment>
      <div>
        <h1>Welcome to your automatic brain.</h1>
      </div>
      <div>
        <Link href="/scraper">Scrape</Link>
      </div>
    </Fragment>
  );
}
