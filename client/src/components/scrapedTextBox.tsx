import React, { useState } from "react";

const ScrapedTextBox: React.FC<ScrapedTextBoxProps> = (props) => {
  const [textAreaContent, setTextAreaContent] = useState(""); // State variable to keep track of textarea content

  const paragraphs = props.text
    .split("***")
    .filter((paragraph) => paragraph.trim().length > 0) // Ignore empty paragraphs
    .map((paragraph) => `• ${paragraph}`);
  const formattedText = paragraphs.join("\n");

  // Update the state variable whenever the textarea content changes
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaContent(event.target.value);
  };

  const handleSubmit = () => {
    console.log(textAreaContent);
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
