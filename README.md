# Task Manager Web Application

Welcome to the Task Manager Web Application repository! This application allows users to manage a simple task list efficiently.

## Technologies Used

-   Backend: Laravel
-   Frontend: Vue.js
-   Database: MySQL (or your preferred database)

## Installation

### Prerequisites

-   PHP >= 8.1
-   Composer
-   Node.js >= 10.x
-   npm or Yarn
-   MySQL (or any other supported database)

### Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
```

### Backend Setup

1. Navigate to the application directory:

```bash
cd backend
```

2. Install PHP dependencies:

```bash
composer install
```

3. Copy the .env.example file and rename it to .env:

```bash
cp .env.example .env
```

4. Generate an application key:

```bash
php artisan key:generate
```

5. Configure your database connection in the .env file:

```plaintext
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

6. Make sure to add the following configuration to your `.env` file:

```plaintext
SESSION_DRIVER=cookie
SESSION_DOMAIN="localhost"
SANCTUM_STATEFUL_DOMAINS="localhost,127.0.0.1"
```

7. Run database migrations to create tables:

```bash
php artisan migrate
```

Or you can migrate and seed the database using predefined seeders:

```bash
php artisan migrate --seed
```

8. Start the Laravel development server:

```bash
php artisan serve
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd vue
```

2. Install JavaScript dependencies:

```bash
npm install
```

#### or

3. Start the Vue.js development server:

```bash
npm run dev
```

## Usage

Once both the backend and frontend servers are running, you can access the application in your web browser.
