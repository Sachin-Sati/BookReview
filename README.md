# Book Review API

A RESTful API for managing books and their reviews. Users can add books, write reviews, and search through the book collection.

## Features

- User authentication (signup/login)
- Book management (add, list, view details)
- Review system (add, update, delete reviews)
- Book search functionality
- Protected routes with JWT authentication

## Prerequisites

- Node.js
- MongoDB
- npm

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with:
```env
PORT=your_port_number
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Running Locally

Development mode with hot reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server runs at `http://localhost:3000`

## API Endpoints

### Authentication

**Sign up**
- Method: POST
- URL: `http://localhost:3000/signup`
- Headers: 
  - Content-Type: application/json
- Body:
```json
{
    "username": "testuser",
    "email": "user@example.com",
    "password": "password123"
}
```

**Login**
- Method: POST
- URL: `http://localhost:3000/login`
- Headers: 
  - Content-Type: application/json
- Body:
```json
{
    "username": "testuser",
    "password": "password123"
}
```

### Books

**Add Book**
- Method: POST
- URL: `http://localhost:3000/books`
- Headers: 
  - Content-Type: application/json
  - Authorization: Bearer {your_jwt_token}
- Body:
```json
{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction"
}
```

**Get All Books**
- Method: GET
- URL: `http://localhost:3000/books`

**Get Book Details**
- Method: GET
- URL: `http://localhost:3000/books/{bookId}`

### Reviews

**Add Review**
- Method: POST
- URL: `http://localhost:3000/books/{bookId}/reviews`
- Headers: 
  - Content-Type: application/json
  - Authorization: Bearer {your_jwt_token}
- Body:
```json
{
    "rating": 8,
    "comment": "Great book!"
}
```

**Update Review**
- Method: PUT
- URL: `http://localhost:3000/reviews/{reviewId}`
- Headers: 
  - Content-Type: application/json
  - Authorization: Bearer {your_jwt_token}
- Body:
```json
{
    "rating": 9,
    "comment": "Updated: Even better on second read!"
}
```

**Delete Review**
- Method: DELETE
- URL: `http://localhost:3000/reviews/{reviewId}`
- Headers: 
  - Authorization: Bearer {your_jwt_token}

### Search

**Search Books**
- Method: GET
- URL: `http://localhost:3000/search?q=gatsby`

## Design Decisions

1. **Authentication:**
   - JWT tokens stored in HTTP-only cookies for security
   - Passwords hashed using bcrypt

2. **Database Schema:**
   - Separate collections for Users, Books, and Reviews
   - References between collections using MongoDB ObjectIds
   - Unique constraint on username and email
   - One review per user per book enforced through index

3. **API Design:**
   - RESTful principles
   - Protected routes using middleware
   - Input validation
   - Error handling middleware for cast errors

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Book
```javascript
{
  _id: ObjectId,
  title: String,
  author: String,
  genre: String,
  description: String,
  reviews: [{ type: ObjectId, ref: 'Review' }],
  averageRating: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Review
```javascript
{
  _id: ObjectId,
  book: { type: ObjectId, ref: 'Book' },
  user: { type: ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 10 },
  comment: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Relationships
- One User can have many Reviews (1:N)
- One Book can have many Reviews (1:N)
- Each Review belongs to one User and one Book
- Compound index on `{ book, user }` to ensure one review per user per book