

# Note Pad Tracker  

## Description
The Note Pad Tracker is a dynamic and modern note-taking application built with cutting-edge technologies. 
It features a robust backend system using Spring REST API, MyBatis, and PostgreSQL for managing user authentication and note CRUD (Create, Read, Update, Delete) operations. 
On the frontend, it utilizes React to provide a responsive and engaging user interface, ensuring a seamless experience for managing notes. Together, these technologies create a comprehensive solution for note management, handling all server-side operations as well as delivering an intuitive and interactive user experience.


## Backend Technologies Enforcements
- **Spring REST API** - Framework for building the backend API
- **MyBatis** - Persistence framework for interacting with the database
- **PostgreSQL** - Relational database

## API Endpoints
> [!IMPORTANT]
> !!
### User Management
**POST /api/users: Create a new user account.**
**POST /api/users/login: Authenticate a user and start a session.**

### Note Management
**GET /api/notes/user/{email}: Retrieve notes for a specific user[^1].**
**GET /api/notes: Retrieve all notes[^2].**
**POST /api/notes: Create a new note[^3].**
**PUT /api/notes/{id}: Update an existing note[^4].**
**DELETE /api/notes/{id}: Delete a note[^5].**

### User Table ###
|Column|Type|Description|
| --- | --- | --- |
| id | SERIAL | Primary Key |
| name | VARCHAR(255) | User's name |
| email	| VARCHAR(255) | User's email (unique) |
| password | VARCHAR(255) | User's password |
|created_at |	TIMESTAMP	| Account creation date |

### Notes Table 

|Column|Type|Description|
| --- | --- | --- |
| id	| SERIAL | Primary Key |
| user_id	 | INTEGER	| Foreign Key to User |
| title |VARCHAR(255) | Note title |
|content	| TEXT	|Note content|
|created_at | TIMESTAMP	| Note creation date
|updated_at | TIMESTAMP	| Note modernization date
## Application Configuration 
> [!NOTE]
> ---
```
spring.datasource.url=jdbc:postgresql://localhost:5432/note_db
spring.datasource.username=your-username
spring.datasource.password=your-password
```

**Database Setup**
> [!IMPORTANT]
 Ensure PostgreSQL is installed and running.
Create a database named housing_db.

**Application Configuration**
 <article>
  <span style = "color:blue; font-weight:bold;">Open src/main/resources/application.properties and configure your database connection.</span>
 </article>

**Run The Application**
```./mvnw spring-boot:run```

## FrontEnd Technologies manifestation
- **React** Framework for building the interactive user interface
- **React Router** - Library for handling routing and navigation.
- **Formik** - Library for form handling and validation.
- **Yup** - Schema validation library used with Formik.
- **Axios** - Library for making HTTP requests.
- **FontAwesome** - Icon library for adding scalable vector icons.
- **React Bootstrap** - Library for Bootstrap components in React.

  
## Frontend Setup
```npm install```

```npm start```

### Contributing

## Fork the Repository:
**We welcome contributions to enhance the project! Follow these steps to contribute:
Click the "Fork" button at the top right of the repository page.**

## Create a New Branch:
```git checkout -b feature/your-feature```

## Make Your Changes:
Implement your feature or bug fix.

## Commit Your Changes:
```git commit -m "Add feature: your feature description"```

## Push To The Branch
```git push origin feature/your-feature```

## Create a Pull Request:
Open a pull request on GitHub and describe your changes.

	
	 
