const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function categorizeExpense(description) {
    try {
        //const model = await ai.models.generateContent({ model: "gemini-2.5-flash" });

        const prompt = `
        Categorize the following expense into only one of these categories:
        Food, Travel, Bills, Groceries, Apparels, Entertainment, Health, Other.

        Expense: "${description}"

        Only return the category name.
        `;

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                role: "user",
                parts: [{ text: prompt }]
                }
            ]
        });
        let text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Other";

        // clean text
        text = text.split("\n")[0].replace(/[^a-zA-Z]/g, "");

        const validCategories = [
            "Food","Travel","Bills","Groceries",
            "Apparels","Entertainment","Health","Other"
        ];

        return validCategories.includes(text) ? text : "Other";


    } catch (err) {
        console.log("AI Error:", err);
        return "Other";
    }
}

module.exports = categorizeExpense;