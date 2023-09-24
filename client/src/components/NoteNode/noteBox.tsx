import { request } from "http";
import React, { useState, useEffect, ChangeEvent } from "react";

function NoteBox() {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    text: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const initialState = {
    author: "",
    title: "",
    text: "",
    tags: [],
  };

  useEffect(() => {
    setIsChanged(JSON.stringify(initialState) !== JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  function handleTagInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTagInput(e.target.value);
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter" || !tagInput.trim()) return;
    setFormData({
      ...formData,
      tags: [...formData.tags, tagInput],
    });
    setTagInput("");
  }

  function removeTag(index: number) {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  }

  const handleSubmit = async () => {
    // Destructure the formData object
    const { author, title, tags } = formData;

    // Validate author and title
    if (author.trim().length === 0 || title.trim().length === 0) {
      console.error("Author and title are required.");
      return;
    }

    // Log the current state before sending the request
    console.log(`Submitting the following data: `, formData);

    try {
      // Send a POST request to the server
      const response = await fetch("http://127.0.0.1:5000/submitEntry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send formData directly
      });

      // Check the response status and log an appropriate message
      const logMessage =
        response.status === 204
          ? "Entry submitted successfully."
          : `Failed to submit the entry. Status: ${response.statusText}`;
      console.log(logMessage);

      // Optionally reset the form data if the submission is successful
      if (response.status === 204) {
        setFormData(initialState);
        setTagInput("");
        setIsChanged(false);
      }
    } catch (error) {
      // Log any error that occurs during the fetch operation
      console.error("Failed to submit the entry due to an error:", error);
    }
  };

  return (
    <div className="notebox">
      <p>Author</p>
      <input
        onChange={(e) => handleChange(e, "author")}
        value={formData.author}
        type="text"
        placeholder="Author"
      />
      <p>Title</p>
      <input
        onChange={(e) => handleChange(e, "title")}
        value={formData.title}
        type="text"
        placeholder="Title"
      />
      <p>Text</p>
      <input
        onChange={(e) => handleChange(e, "text")}
        value={formData.text}
        type="text"
        placeholder="Text"
      />
      <p>Tags</p>
      <div
        className="tags-input-container"
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          onChange={handleTagInputChange}
          onKeyDown={handleTagKeyDown}
          value={tagInput}
          type="text"
          className="tags-input"
          placeholder="Add a tag :)"
          style={{ marginRight: "10px" }}
        />
        {formData.tags.map((tag, index) => (
          <div className="tag-item" key={index} style={{ margin: "0 5px" }}>
            <span className="text">{tag}</span>
            <span className="close" onClick={() => removeTag(index)}>
              &times;
            </span>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={!isChanged}>
        Submit
      </button>
    </div>
  );
}

export default NoteBox;
