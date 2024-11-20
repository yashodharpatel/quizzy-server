"# Quizzy Server - Backend API

Quizzy Server is a backend API that manages quizzes, questions, and user responses. It allows users to create, update, delete quizzes, and submit their responses. This server provides endpoints to manage quizzes and their associated questions, track user responses, and calculate scores.

## APIs

| Method | Endpoint             | Description                               |
| ------ | -------------------- | ----------------------------------------- |
| POST   | `/api/quizzes`       | Create a new quiz                         |
| GET    | `/api/quizzes`       | Get all quizzes                           |
| GET    | `/api/quizzes/:id`   | Get a single quiz by ID                   |
| PUT    | `/api/quizzes/:id`   | Update a quiz by ID                       |
| DELETE | `/api/quizzes/:id`   | Delete a quiz by ID                       |
| POST   | `/api/questions`     | Create a new question                     |
| PUT    | `/api/questions/:id` | Edit a specific question by ID            |
| DELETE | `/api/questions/:id` | Delete a specific question by ID          |
| POST   | `/api/responses`     | Submit user responses and calculate score |

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
