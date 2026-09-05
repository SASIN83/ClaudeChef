import { GoogleGenAI } from '@google/genai'

// Initialize using the API key from AI Studio
const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
})

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. Format your response in markdown to make it easier to render to a web page.
`

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemma-4-31b-it', // Can also use 'gemma-2-2b-it'
            contents: `${SYSTEM_PROMPT}\n\nI have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
            config: {
                maxOutputTokens: 1024,
            }
        })
        
        return response.text
    } catch (err) {
        console.error("Gemma API Error:", err.message)
        throw err
    }
}