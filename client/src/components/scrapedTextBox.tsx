import React, { useState } from "react";
import PORT_NUMBER from '../constants/constants';
const ScrapedTextBox: React.FC<ScrapedTextBoxProps> = (props) => {
  const [textAreaContent, setTextAreaContent] = useState(props.text); // State variable to keep track of textarea content

  const paragraphs = props.text
    .split("***")
    .filter((paragraph) => paragraph.trim().length > 0) // Ignore empty paragraphs
    .map((paragraph) => `• ${paragraph}`);
  const formattedText = paragraphs.join("\n");

  // Update the state variable whenever the textarea content changes
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaContent(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(`listening on ${PORT_NUMBER}`,textAreaContent);
    try {
      const response = await fetch(`http://127.0.0.1:${PORT_NUMBER}/submitEntry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: textAreaContent }),  // Send the textAreaContent as 'data'
      });
  
      if (response.status === 204) {
        console.log("Data submitted successfully.");
      } else {
        console.log("Failed to submit the data.");
      }
    } catch (err) {
      console.error("Error:", err); // Log the error
    }
  };  
  return (
    <div>
      <textarea
        defaultValue={formattedText}
        onChange={handleTextChange} // Update the state variable when the textarea content changes
        style={{
          width: "80%",
          minHeight: "200px",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ScrapedTextBox;
