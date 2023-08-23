import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/router";
import ScrapedTextBox from "@/components/scrapedTextBox";
import PORT_NUMBER from '../constants/constants';

const Scraper: React.FC = () => {
  const router = useRouter(); //declare router
  const [url, setUrl] = useState("");
  const [scrapedData, setScrapedData] = useState("");
  useEffect(() => {
    fetch(`http://127.0.0.1:${PORT_NUMBER}/scrape`) // changed to backticks
      .then((res: any) => res.json())
      .then((data: any) => console.log(data));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const urlObject = { url };

    try {
      const response = await fetch(`http://127.0.0.1:${PORT_NUMBER}/scrape`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(urlObject),
      });
      const data = await response.json(); // Parse the JSON response
      if (data.scrapedData) {
        // Check if 'scrapedData' is present
        console.log("Scraped Data:", data.scrapedData); // Log the scraped data
        setScrapedData(data.scrapedData); // Update the state variable
      } else {
        console.log("Failed to scrape the URL."); // Log a failure message
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Type in a URL to scrape:
          <input type="url" value={url} onChange={handleInputChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
      {scrapedData && (<ScrapedTextBox text={scrapedData} />)}
    </>

  );
};
export default Scraper;
