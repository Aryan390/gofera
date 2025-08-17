# Gofera Backend API

A comprehensive backend API for the Gofera ride-sharing platform built with Node.js, Express, and MongoDB.

## Features

-   **User Authentication**: JWT-based authentication with signup, login, and logout
-   **User Management**: User profiles, driver registration, and account management
-   **Ride Management**: Create, update, delete, and manage rides (drivers only)
-   **Ride Booking**: Book and cancel ride seats
-   **Search & Filtering**: Advanced ride search with multiple filters
-   **Rating System**: User rating system for completed rides
-   **Security**: Rate limiting, input validation, XSS protection, and more

## Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB with Mongoose ODM
-   **Authentication**: JWT (JSON Web Tokens)
-   **Security**: bcryptjs, helmet, express-rate-limit
-   **Testing**: Jest with Supertest
-   **Validation**: Mongoose validators and custom validation

## Prerequisites

-   Node.js (v14 or higher)
-   MongoDB (local or cloud instance)
-   npm or yarn

## Installation

1. Clone the repository and navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment variables:

```bash
cp env.example .env
```

4. Update the `.env` file with your configuration:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gofera
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=90d
COOKIE_EXPIRES_IN=90
```

5. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication Routes

-   `POST /api/users/signup` - User registration
-   `POST /api/users/login` - User login
-   `GET /api/users/logout` - User logout
-   `POST /api/users/forgotPassword` - Request password reset
-   `PATCH /api/users/resetPassword/:token` - Reset password

### User Routes (Protected)

-   `GET /api/users/me` - Get current user profile
-   `PATCH /api/users/me` - Update current user profile
-   `PATCH /api/users/updateMyPassword` - Update password
-   `DELETE /api/users/me` - Delete current user account
-   `PATCH /api/users/become-driver` - Register as driver
-   `GET /api/users/stats` - Get user statistics
-   `POST /api/users/:userId/rate` - Rate a user

### Public User Routes

-   `GET /api/users/drivers` - Get list of drivers
-   `GET /api/users/search` - Search users
-   `GET /api/users/:id` - Get user by ID

### Ride Routes (Public)

-   `GET /api/rides` - Get all available rides
-   `GET /api/rides/:id` - Get ride by ID

### Ride Routes (Protected)

-   `POST /api/rides` - Create new ride (drivers only)
-   `PATCH /api/rides/:id` - Update ride (owner only)
-   `DELETE /api/rides/:id` - Delete ride (owner only)
-   `POST /api/rides/:id/book` - Book seats on a ride
-   `DELETE /api/rides/:id/cancel-booking` - Cancel booking
-   `GET /api/rides/my-rides` - Get user's rides
-   `GET /api/rides/my-rides/stats` - Get ride statistics
-   `PATCH /api/rides/:id/complete` - Complete ride (driver only)
-   `PATCH /api/rides/:id/cancel` - Cancel ride (driver only)

## Data Models

### User Model

-   Basic info: name, email, password, phone
-   Driver status and vehicle information
-   Rating system and ride statistics
-   Account status and security features

### Ride Model

-   Ride details: start/destination, date/time, ETA
-   Pricing and seat availability
-   Driver and passenger information
-   Ride status and restrictions
-   Booking management

## Security Features

-   **Password Hashing**: bcryptjs with salt rounds
-   **JWT Authentication**: Secure token-based authentication
-   **Rate Limiting**: API rate limiting to prevent abuse
-   **Input Validation**: Comprehensive input validation and sanitization
-   **XSS Protection**: Protection against cross-site scripting
-   **NoSQL Injection Protection**: MongoDB query injection prevention
-   **CORS Configuration**: Configurable cross-origin resource sharing

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm test -- --coverage
```

## Environment Variables

| Variable            | Description               | Default                            |
| ------------------- | ------------------------- | ---------------------------------- |
| `NODE_ENV`          | Application environment   | `development`                      |
| `PORT`              | Server port               | `5000`                             |
| `MONGODB_URI`       | MongoDB connection string | `mongodb://localhost:27017/gofera` |
| `JWT_SECRET`        | JWT signing secret        | Required                           |
| `JWT_EXPIRES_IN`    | JWT expiration time       | `90d`                              |
| `COOKIE_EXPIRES_IN` | Cookie expiration days    | `90`                               |

## Database Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `gofera`
3. Update the `MONGODB_URI` in your `.env` file
4. The application will automatically create collections and indexes

## API Response Format

All API responses follow a consistent format:

```json
{
	"status": "success|fail|error",
	"message": "Optional message",
	"data": {
		// Response data
	},
	"results": "Number of results (for list endpoints)"
}
```

## Error Handling

The API uses a centralized error handling system with:

-   HTTP status codes
-   Descriptive error messages
-   Operational vs programming error distinction
-   Development vs production error responses

## Rate Limiting

-   **Global**: 100 requests per hour per IP
-   **Authentication**: Stricter limits on auth endpoints
-   **Customizable**: Easy to adjust limits per endpoint

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation
4. Ensure all tests pass

## License

MIT License - see LICENSE file for details
