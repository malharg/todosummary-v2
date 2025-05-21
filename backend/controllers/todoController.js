const { createClient } = require("@supabase/supabase-js");
const { getSummaryFromLLM } = require("../services/cohereService");
const { sendToSlack } = require("../services/slackService");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.getTodos = async (req, res) => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.addTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const { data, error } = await supabase
    .from("todos")
    .insert([{ title }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
};

exports.summarizeTodos = async (req, res) => {
  const { data: todos, error } = await supabase.from("todos").select("*");
  if (error) return res.status(500).json({ error: "Failed to fetch todos" });

  try {
    const summary = await getSummaryFromLLM(todos);
    await sendToSlack(summary);
    res.status(200).json({ message: "Summary sent to Slack successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
