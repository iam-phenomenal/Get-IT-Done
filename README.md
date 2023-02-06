
# Get-It-Done REST API

This API is used to manage personal tasks, get and update user profiles, and query user task statistics. It provides a secure platform with support for SMS and Email notifications.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to install the following software to run the API:

- Node.js
- MongoDB

### Installing

1. Clone the repository to your local machine.
2. Navigate to the cloned directory and run `npm install` to install all the dependencies.
3. Configure MongoDB connection in the `.env` file.
4. Start the API by running `node server.js`

## Usage

### Users

- Create a user profile: `POST /api/v0/users`
- Update a user profile: `PUT /api/users/:userid`
- Delete a user profile: `DELETE /api/users/:userid`
- Get a user profile: `GET /api/users/:userid`

### Tasks

 - Create a task: `POST /api/tasks`
 - Update a task: `PUT /api/tasks/:userid?{task_name}`
 - Get a task: `GET /api/tasks/:userid?{task_name}`
 - Delete a task: `DELETE /api/tasks/:userid?{task_name}`

### Statistics

- Query user task statistics: `GET /api/v0/stats/:id`

### Notifications

- Email notifications: `POST /api/notifications/email`
- SMS notifications: `POST /api/notifications/sms`

### Admin

- Delete a user profile: `DELETE /api/admin/users/:id`
- Update a user profile: `PUT /api/admin/users/:id`

## Built With

- [Node.js](https://nodejs.org/) - The JavaScript runtime
- [MongoDB](https://www.mongodb.com/) - The database
- [Express.js](https://expressjs.com/) - The web framework

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
