const axios = require("axios");

exports.getSummaryFromLLM = async (todos) => {
  const todoText = todos.map((t) => `- ${t.title}`).join("\n");

  const prompt = `Summarize the following list of to-do items in a concise and helpful way:\n\n${todoText}`;

  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Error:", error.response?.data || error.message);
    throw new Error("Failed to generate summary");
  }
};
