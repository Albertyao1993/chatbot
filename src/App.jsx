import { useState } from 'react';
import {Chat} from './components/Chat/Chat';
import {Controls} from './components/Chat/Controls/Controls';
import styles from './App.module.css';

function App() {
  const [messages, setMessages] = useState([]);

  const handleContentChange = (content) =>{
    setMessages([...messages, {role: 'user', content}]);
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
