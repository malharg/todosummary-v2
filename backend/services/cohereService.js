const axios = require("axios");

exports.getSummaryFromLLM = async (todos) => {
  const todoText = todos.map((t) => `- ${t.title}`).join("\n");

  const prompt = `Summarize the following list of to-do items in a concise and helpful way:\n\n${todoText}`;

  try {
    const res = await axios.post(
      "https://api.cohere.ai/v1/generate", // Cohere API endpoint for text generation
      {
        model: "command",
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data && res.data.generations && res.data.generations.length > 0) {
      return res.data.generations[0].text;
    } else {
      throw new Error("Unexpected response structure from Cohere API");
    }
  } catch (error) {
    console.error("Cohere API Error:", error.response?.data || error.message);
    throw new Error("Failed to generate summary using Cohere");
  }
};
