import React, { useState, KeyboardEvent } from "react";
import { useEntryStore } from "../scrapedTextBox";
function TagsInput() {
  const { tags, setTags } = useEntryStore();

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    const value = e.currentTarget.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.currentTarget.value = "";
  }

  function removeTag(index: number) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <div className="tags-input-container" style={{ display: 'flex', alignItems: 'center' }}>
      <input
        onKeyDown={handleKeyDown}
        type="text"
        className="tags-input"
        placeholder="Add a tag :)"
        style={{ marginRight: '10px' }} 
      />
      {tags.map((tag, index) => (
        <div className="tag-item" key={index} style={{ margin: '0 5px' }}>
          <span className="text">{tag}</span>
          <span className="close" onClick={() => removeTag(index)}>
            &times;
          </span>
        </div>
      ))}
    </div>
  );  
}

export default TagsInput;
