import styles from './Chat.module.css';


const WelcomeMessage = {
    role: 'assistant',
    content: 'Hi, I am the AI Chatbot, how can I help you today?'
}

export function Chat({ messages }) {
    return (
        <div className={styles.Chat}>
           <div className={styles.Message}>
            {[WelcomeMessage,...messages].map(({role, content}, index) => (
                <div key={index} className={`${styles.Message} ${styles[role]}`}>
                    {content}
                </div>
            ))}
           </div>
        </div>
    );
}

