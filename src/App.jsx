import { useState } from 'react';
import {Chat} from './components/Chat/Chat';
import {Controls} from './components/Chat/Controls/Controls';
import {GoogleAI} from './assistants/googleai';
import styles from './App.module.css';



function App() {

  const assistant = new GoogleAI('gemini-1.5-flash');

  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  const handleContentChange = async (content) => {
    addMessage({role: 'user', content});

    try {
      const result = await assistant.sendMessage(content);
      addMessage({role: 'assistant', content: result});
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
