import { useState } from 'react';
import {Chat} from './components/Chat/Chat';
import {Controls} from './components/Controls/Controls';
import {GoogleAI} from './assistants/googleai';
import styles from './App.module.css';
import {Loader} from './components/Loader/Loader';


function App() {

  const assistant = new GoogleAI('gemini-1.5-flash');

  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  const updateMessageContent = (content) => {
    setMessages((prevMessages) => prevMessages.map((message,index) => 
      index === prevMessages.length - 1 ? {...message, content: message.content + content} : message
    ));
  }

  const handleContentChange = async (content) => {
    addMessage({role: 'user', content});
    setIsLoading(true);
    try {
      const result = assistant.sendMessageWithStream(content);
      let isFirstChunk = false;
      for await (const chunk of result){
        if(!isFirstChunk){
          isFirstChunk = true;
          addMessage({role: 'assistant', content: ""});
          setIsLoading(false);
          setIsStreaming(true);
        }
        updateMessageContent(chunk);
      }
      setIsStreaming(false);
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({role: 'assistant', content: 'Sorry, there was an error. Please try again later.'});
      setIsStreaming(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.App}>
      {isLoading && <Loader />}
      <header className={styles.Header}>
        <img src="/chatbot.png" alt="Chatbot Logo" className={styles.Logo} />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <div>
        <Controls content={messages} onSend={handleContentChange} isDisabbled={isLoading || isStreaming} />
      </div>
    </div>
  );
}

export default App;
