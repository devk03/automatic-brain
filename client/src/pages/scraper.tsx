import React, { useState, FormEvent, ChangeEvent } from 'react';

const Scraper: React.FC = () => {
    const [url, setUrl] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const urlObject = { url };

        try {
            const response = await fetch('http://localhost:8000/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(urlObject),
            });
            const data = await response.json(); // Parse the JSON response
            console.log('Response:', data);     // Log the response data
            if (data.scrapedData) {            // Check if 'scrapedData' is present
                console.log('Scraped Data:', data.scrapedData); // Log the scraped data
            } else {
                console.log('Failed to scrape the URL.'); // Log a failure message
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Type in a URL to scrape:
                <input 
                    type="url" 
                    value={url} 
                    onChange={handleInputChange}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Scraper;
