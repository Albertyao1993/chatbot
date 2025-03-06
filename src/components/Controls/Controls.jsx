import { useState, useRef, useEffect } from "react";
import styles from "./Controls.module.css";
import TextareaAutosize from 'react-textarea-autosize';

export function Controls({isDisabled = false, onSend }) {
  const testarea = useRef(null);
  const [content, setContent] = useState("");

  useEffect(()=>{
    if(!isDisabled ){
      testarea.current.focus();
    }
  },[isDisabled])

  function handleContentChange(event) {
    // 在这里设置断点，可以查看 event 对象的内容
    setContent(event.target.value);
  }

  function handleContentSend() {
    if (content.length > 0) {
      // 在这里设置断点，可以查看发送的内容
      onSend(content);
      setContent("");
    }
  }

  function handleEnterPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleContentSend();
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <TextareaAutosize
          minRows={1}
          maxRows={5}
          ref={testarea}
          className={styles.TextArea}
          placeholder="Message AI Chatbot"
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleEnterPress}
        />
      </div>
      <button className={styles.Button} onClick={handleContentSend} disabled={isDisabled}>
        <SendIcon />
      </button>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#5f6368"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
}