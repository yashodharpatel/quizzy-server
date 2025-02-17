# Quizzy Server - Backend API

Quizzy Server is a backend API that manages quizzes, questions, and user responses. It allows users to create, update, delete quizzes, and submit their responses. This server provides endpoints to manage quizzes and their associated questions, track user responses, and calculate scores.

## APIs

| Method | Endpoint               | Description                                                           |
| ------ | ---------------------- | --------------------------------------------------------------------- |
| POST   | `/api/quizzes`         | Create a new quiz                                                     |
| GET    | `/api/quizzes`         | Get all quizzes                                                       |
| GET    | `/api/quizzes/:id`     | Get a single quiz by ID                                               |
| PUT    | `/api/quizzes/:id`     | Update a quiz by ID                                                   |
| DELETE | `/api/quizzes/:id`     | Delete a quiz by ID                                                   |
| POST   | `/api/questions`       | Create a new question                                                 |
| PUT    | `/api/questions/:id`   | Edit a specific question by ID                                        |
| DELETE | `/api/questions/:id`   | Delete a specific question by ID                                      |
| POST   | `/api/responses`       | Submit user responses and calculate score                             |
| POST   | `/api/log-abandonment` | Send mail to user and log into database when a user abandons the quiz |

## Setup

To run the project locally, follow these steps:

### Prerequisites

- Node.js (v16 or later)
- MongoDB (running locally or through a cloud service like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yashodharpatel/quizzy-server.git
   ```

2. Navigate into the project directory:

   ```bash
   cd quizzy-server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Rename a .env.example file to .env and fill the following environment variables:

   ```bash
   DB_URI=your-mongodb-uri-here
   DB_NAME=your-db-name
   PORT=your-preferred-port
   MAILSERVICE_USER=your-mailservice-username
   MAILSERVICE_PASS=your-mailservice-password
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Testing

You can test the API endpoints using tools like Postman or Insomnia. A Postman collection is available in the repository to help you test all the endpoints easily. Simply import the collection into Postman, and you'll have all the necessary requests set up for you.
