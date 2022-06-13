# To Successfully test the Doc Colarbo Application, The System has to have the mininum Dependencies installed.

1. NodeJs Version 16 atleast
2. npm Version 8 atleast

execute npm install in the applicaation root folder (/Doc_Collabo)
execute npm install in the client folder for the React UI Dependencies (/Doc_Collabo/client)
Then in the app root file,
execute npm run dev

# Applicaiton main Artecthure

I used NodeJs and Express to implement the backend architecture.
I used this approach because the technologies are open source and express being an npm package is a light weight technology for implementing Server using javascript.

For Data Storage, I used an npm package LowDb
To Avoid Configuration issues, I used this package to easily test and run the functionalities of the application. Other options could be a relational Database or Nosql Database (Mongodb)

The UI (Frontend) is impolemented using React Js
