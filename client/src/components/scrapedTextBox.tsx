import React, { useEffect } from "react";
import TagsInput from "./SubmissionAttributes/customTags";
import PORT_NUMBER from "../constants/constants";
import { create } from 'zustand';

interface ScrapedTextBoxProps {
    text: string;
}

const entryStore = (set: any) => ({
  author: "",
  title: "",
  text: "",
  tags: [],
  setAuthor: (author: string) => set({ author }),
  setTitle: (title: string) => set({ title }),
  setText: (text: string) => set({ text }),
  setTags: (tags: string[]) => set({ tags }),
});

export const useEntryStore = create(entryStore);

const ScrapedTextBox: React.FC<ScrapedTextBoxProps> = ({ text }) => {
  const {
    author,
    title,
    text: storeText,
    tags,
    setAuthor,
    setTitle,
    setText
  } = useEntryStore();
  useEffect(() => {
    // Set the initial text for each field in the Zustand store
    if (!storeText) setText(text);
    if (!author) setAuthor("");
    if (!title) setTitle("");
  }, []); 
  const paragraphs = text
    .split("***")
    .filter((paragraph) => paragraph.trim().length > 0)
    .map((paragraph) => `• ${paragraph}`);

  const formattedText = paragraphs.join("\n");

  const handleSubmit = async () => {
    if (author.trim().length === 0 || title.trim().length === 0) {
      console.log("Author and title are required.");
      return;
    }
    console.log(`listening on ${PORT_NUMBER}`, storeText);

    try {
      const response = await fetch(
        `http://127.0.0.1:${PORT_NUMBER}/submitEntry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ author, title, text: storeText, tags }),
        }
      );

      const logMessage = response.status === 204
        ? "Data submitted successfully."
        : "Failed to submit the data.";
      console.log(logMessage);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <textarea 
        placeholder="Author" 
        value={author} 
        onChange={(e) => setAuthor(e.target.value)} 
      />

      <textarea 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />

      <textarea
        value={storeText || formattedText}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "80%",
          minHeight: "200px",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      <TagsInput />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ScrapedTextBox;
