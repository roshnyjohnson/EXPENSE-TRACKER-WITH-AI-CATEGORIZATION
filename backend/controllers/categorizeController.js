const { GoogleGenerativeAI } = require('@google/generative-ai');
 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
 
const VALID_CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other'];
 
const categorizeExpense = async (req, res) => {
  try {
    const { description } = req.body;
 
    if (!description || description.trim().length === 0) {
      return res.status(400).json({ message: 'Description is required' });
    }
 
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
 
    // A tightly constrained prompt — tells the model exactly what to return
    const prompt = `You are an expense categorization assistant.
    Categorize the following expense description into exactly ONE of these categories:
    Food, Transport, Shopping, Bills, Health, Entertainment, Other.
 
    Rules:
    - Reply with ONLY the category name, nothing else
    - No punctuation, no explanation, no extra words
    - If unsure, reply: Other
 
    Expense description: "${description}"`;
 
    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();
 
    // Validate the response is one of our known categories
    // If the model returns something unexpected, fall back to 'Other'
    const category = VALID_CATEGORIES.includes(raw) ? raw : 'Other';
 
    res.status(200).json({ category });
  } catch (error) {
    console.error('Categorization error:', error.message);
    // Always return a fallback — never let a failed LLM call crash the app
    res.status(200).json({ category: 'Other' });
  }
};
 
module.exports = { categorizeExpense };
