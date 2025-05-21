const axios = require("axios");

exports.sendToSlack = async (summary) => {
  try {
    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `📝 *Todo Summary:*\n${summary}`,
    });
  } catch (error) {
    console.error("Slack Error:", error.response?.data || error.message);
    throw new Error("Failed to send summary to Slack");
  }
};
