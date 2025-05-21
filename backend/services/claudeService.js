const axios = require("axios");

exports.getSummaryFromLLM = async (todos) => {
  const todoText = todos.map((t) => `- ${t.title}`).join("\n");

  const prompt = `Summarize the following list of to-do items in a concise and helpful way:\n\n${todoText}`;

  try {
    const res = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data && res.data.content && res.data.content.length > 0) {
      return res.data.content[0].text;
    } else {
      throw new Error("Unexpected response structure from Claude API");
    }
  } catch (error) {
    console.error("Claude API Error:", error.response?.data || error.message);
    throw new Error("Failed to generate summary using Claude");
  }
};
