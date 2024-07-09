# Itransition Task

Development Test

# Version
- `NODE`: v21.7.1 or latest version of node

# Configuration
### Step 0: Cloning the Project and Navigating to the Project Directory
- Clone the Project Repository
    - Use the following command to clone the project repository:
        ```python
        git clone <repository-url>
        ```
- Change to the Project Directory
    - After cloning, navigate to the project directory:
        ```python
        cd <project-directory-name>
        ```
### Step 1: Create a .env file in the root directory
### Step 2: Copy the contents of example.env into the .env file
### Step 3: Update the .env file:
- `DB_DATABASE`: Name of your database
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
### Step 4: Import the database
- Locate the `itransition_task.sql` file in the root directory.
- Import this file into your database. You can use a database management tool like phpMyAdmin, MySQL Workbench, or command line tools.
- Alternatively, if the project is set up to auto-generate tables, simply create the database and ensure the connection details in the `.env` file are correct.
### Step 5: Install dependencies and start the server
- `npm install`
- `npm run dev`

# Open Browser
Visit [http://localhost:3000/](http://localhost:3000/) to access the application.
