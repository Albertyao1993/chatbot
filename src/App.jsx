import { useState } from 'react';
import {Chat} from './components/Chat/Chat';
import {Controls} from './components/Chat/Controls/Controls';
import styles from './App.module.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GoogleAIKey = import.meta.env.VITE_GOOGLE_API_KEY;
console.log(GoogleAIKey);
const genAI = new GoogleGenerativeAI(GoogleAIKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const history = model.startChat({history: []});

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  const handleContentChange = async (content) => {
    addMessage({role: 'user', content});

    try {
      const result = await history.sendMessage(content);
      // 从返回的对象中提取文本内容
      const responseText = result.response.text();
      addMessage({role: 'assistant', content: responseText});
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({role: 'assistant', content: 'Sorry, there was an error. Please try again later.'});
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img src="/chatbot.png" alt="Chatbot Logo" className={styles.Logo} />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <div>
        <Controls content={messages} onSend={handleContentChange}/>
      </div>
    </div>
  );
}

export default App;
