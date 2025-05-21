# Todo Summary Assistant

## Project Objective

This full-stack application helps users manage to-do items, summarize tasks using an LLM, and send summaries to Slack.

---

## Features

- **To-Do Management:** Add, view, and delete to-do items.
- **AI-Powered Summarization:** Generate concise summaries of pending tasks via an LLM.
- **Slack Integration:** Send summaries to a Slack channel using Incoming Webhooks.
- **Modern UI:** Clean, minimalistic interface with dark mode and real-time feedback.

---

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js (Express)
- **Database:** Supabase (PostgreSQL)
- **LLM:** Cohere API
- **Messaging:** Slack Incoming Webhooks

---

## Setup Instructions

### Prerequisites

Ensure the following are installed:

- Node.js (LTS)
- npm or Yarn
- Git

### 1. Clone the Repository

```bash
git clone <repository_url>
cd todo-summary-assistant  # Or your project root
```

### 2. Backend Setup

```bash
cd backend
```

#### 2.1 Install Backend Dependencies

```bash
npm install # or yarn install
```

#### 2.2 Database Setup (Supabase - PostgreSQL)

Go to https://supabase.com/, log in, and create a New Project (name: todo-summary).

Set a secure Database password.

In Project → SQL Editor, run the following SQL to create the todos table:

```bash
create table todos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  created_at timestamp default now()
);
```

From Settings → Database, copy your Project URL and Anon Key.

#### 2.4 LLM Setup (Cohere)

Go to https://dashboard.cohere.com/, log in.
Navigate to API Keys and copy your generated COHERE_API_KEY.

#### 2.5 Configure Environment Variable(.env)

In the backend directory, create a .env file. Copy content from backend/.env.example and replace placeholders with your actual keys and URLs:

```bash
# backend/.env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SLACK_WEBHOOK_URL=your_slack_incoming_webhook_url
COHERE_API_KEY=your_cohere_api_key
```

#### 2.7 Run the Backend Server

```bash
node server.js
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd ../frontend # or cd frontend
```

#### 3.1 Install Frontend Dependencies

```bash
npm install # or yarn install
```

#### 3.2. Run the Frontend Development Server

```bash
npm start # or yarn start
```

The application will open in your browser, typically at http://localhost:3000.

## Design/Architecure Decisions

The application uses a client-server architecture, separating the React frontend from the Node.js backend.

```bash
+-------------------+
|       USER        |
+-------------------+
          │
          ▼ (HTTP Requests)
+-----------------------------------------------------+
|              React Frontend                         |
|  (Add/Edit/Delete/View Todos, Summarize Button)     |
+-----------------------------------------------------+
          │
          ▼ (API Endpoints)
+-----------------------------------------------------+
|              Node.js + Express Backend              |
|  - GET /todos: Fetches todos [cite: 1]              |
|  - POST /todos: Adds todo [cite: 1]                 |
|  - DELETE /todos/:id: Deletes todo [cite: 1]        |
|  - POST /summarize: Triggers summarization & Slack [cite: 1] |
+-----------------------------------------------------+
          │
          ▼ (Internal Backend Flow for /summarize)
+-----------------------------------------------------+
|  1. Fetch todos from Supabase                       |
|  2. Construct LLM prompt                            |
|  3. Call Cohere API for summarization               |
+-----------------------------------------------------+
          │
          ▼ (Summarized Text)
+-----------------------------------------------------+
|  4. Post summary to Slack Webhook                   |
+-----------------------------------------------------+
          │
          ▼
+-----------------------------------------------------+
|         Slack Channel Message                       |
+-----------------------------------------------------+

```

### Key Architectural Decisions:

- **Client-Server Separation:** Frontend handles UI; backend manages data, logic, and external APIs.
- **RESTful API Endpoints:** Standard REST for todo CRUD; POST /summarize for LLM/Slack workflow.
- **LLM Integration:** Backend securely interacts with Cohere API; sensitive keys are server-side.
- **Slack Integration:** Backend handles Slack communication via Webhooks, keeping URLs secure.
- **Database:** Supabase (PostgreSQL) for data storage, chosen for ease of use and free tier.
- **Environment Variables:** .env files manage sensitive credentials, preventing Git exposure.

### Future Enhancements (Optional)

- **User Authentication:** Implement private to-do lists.
- **Edit Functionality:** Add ability to edit to-dos.
- **Mark as Complete:** Allow marking to-dos as done.
- **Customizable Slack Channel:** Enable UI selection of Slack channel.
- **Error Handling UI:** Improve frontend error messages.
  Loading States: Enhance loading indicators for API calls.
