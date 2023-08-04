import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import scraper from "./scraper";
export default function Home() {
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
