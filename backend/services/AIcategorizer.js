const {GoogleGenerativeAI} = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function categorizeExpense(description) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

        const prompt = `
        Categorize the following expense into only one of these categories:
        Food, Travel, Bills, Groceries, Apparels, Entertainment, Health, Other.

        Expense: "${description}"

        Only return the category name.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().trim();

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