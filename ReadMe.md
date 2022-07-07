# To Successfully test the Doc Colarbo Application, The System has to have the mininum Dependencies installed.

1. NodeJs Version 16 atleast
2. npm Version 8 atleast
3. mongodb database. The Url of the database instance can be modified in Doc_Collabo/config/default.json

4. execute npm install in the applicaation root folder (/Doc_Collabo)
5. execute npm install in the client folder for the React UI Dependencies (/Doc_Collabo/client)
6. Then in the app root folder (/Doc_Collabo),
   execute npm run dev

# Design Approach.

In designing the application and implementing I used the Model View Controller design pattern approach.
The Models and Controllers are implemented in the Backend with their respective routes.

While React takes care of the View aspect of the application.

# Applicaiton main Artecthure

The main Archetecture used to implement the Application is the MERN stack.

I used NodeJs and Express framework to implement the backend architecture.
I used this approach because the technologies are open source and express being an npm package is a light weight technology for implementing Server using javascript.

For the Frontend, React frontend Framework is used.

For Data Storage / persistency, mongodb is used to implement that functionality.

The UI (Frontend) is impolemented using React Js

# Ideas for improving application / performance.

1. The Application / instruction is not taking into consideration the file size.
2. The application endpoints should be protected from unauthorized users regardless.
   A functionality I implemented though using JWT
