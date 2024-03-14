npm install express sequelize sequelize-cli mysql2
npm install cors

npx sequelize-cli init
This will create a config, migrations, models, and seeders folder in your project.

Now, you have three endpoints:

POST /users: Creates a new user.
GET /users/:id: Retrieves a user by ID.
GET /users: Retrieves all users.
GET /users: Retrieves all users.
