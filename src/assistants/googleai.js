import { GoogleGenerativeAI } from '@google/generative-ai';


const GoogleAIKey = import.meta.env.VITE_GOOGLE_API_KEY;
console.log(GoogleAIKey);
const genAI = new GoogleGenerativeAI(GoogleAIKey);



export class GoogleAI {
    constructor(model){
        
        this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        this.history = this.model.startChat({history: []});
    }

    async sendMessage(message){
        try {
            const result = await this.history.sendMessage(message);
            return result.response.text();
        } catch (error) {
            throw error;
        }
    }

    async *sendMessageWithStream(message){
        try {
            const result = await this.history.sendMessageStream(message);

            for await(const chunk of result.stream){
                yield chunk.text()
            }
        } catch (error) {
            throw error;
        }
    }
}
