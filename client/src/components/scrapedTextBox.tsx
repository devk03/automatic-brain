import React, { useState } from "react";
import PORT_NUMBER from "../constants/constants";
const ScrapedTextBox: React.FC<ScrapedTextBoxProps> = (props) => {
  const [textAreaContent, setTextAreaContent] = useState(props.text); // State variable to keep track of textarea content
  const [author, setAuthor] = useState(""); // State variable to keep track of textarea content
  const [title, setTitle] = useState(""); // State variable to keep track of textarea content

  const paragraphs = props.text
    .split("***")
    .filter((paragraph) => paragraph.trim().length > 0) // Ignore empty paragraphs
    .map((paragraph) => `• ${paragraph}`);
  const formattedText = paragraphs.join("\n");

  // Update the state variable whenever the textarea content changes
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaContent(event.target.value);
  };
  const handleAuthorChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAuthor(event.target.value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };
  const handleSubmit = async () => {
    console.log(`listening on ${PORT_NUMBER}`, textAreaContent);
    try {
      const response = await fetch(
        `http://127.0.0.1:${PORT_NUMBER}/submitEntry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ author: author, title:title, text: textAreaContent }), // Send the textAreaContent as 'data'
        }
      );

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
      <textarea defaultValue={""} onChange={handleAuthorChange} />
      <textarea defaultValue={""} onChange={handleTitleChange} />
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
      <div>
        TAGS WILL GO HERE.
        https://dev.to/0shuvo0/lets-create-an-add-tags-input-with-react-js-d29
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ScrapedTextBox;
