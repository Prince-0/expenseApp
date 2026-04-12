const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Say hello"
    });

    console.log("RESULT:", response.text);

  } catch (err) {
    console.log("FULL ERROR:", err);
  }
}

test();

async function categorizeExpense(description) {
    try {
        const model = await ai.models.generateContent({ model: "gemini-2.5-flash" });

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
        const response = await result.response;
        let text = response.text.trim();

        text = text.split("\n")[0].replace(/[^a-zA-Z]/g, "");

        const validCategories = [
            "Food","Travel","Bills","Groceries",
            "Apparels","Entertainment","Health","Other"
        ];

        if (!validCategories.includes(text)) {
            return "Other";
        }

        return text;

    } catch (err) {
        console.log("AI Error:", err);
        return "Other";
    }
}

module.exports = categorizeExpense;