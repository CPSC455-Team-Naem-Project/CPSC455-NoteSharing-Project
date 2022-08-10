# Note Sharing App

Front End Deployment: https://cpsc455notefrontend.herokuapp.com/

Our app was created to solve two problems. 1) Being able to look at your own notes from anywhere and 2) being able to find notes for classes you want to take. Often times when registering for courses there is not a lot of information available on what that course involves. With our app, students can upload notes and syllabi so others will have a better idea of what is in store and so they can study while away from their main computer.

# Server Code

- Please note that our server code is store on a different respository. Please find it here: https://github.com/CPSC455-Team-Naem-Project/note-app-server

# Minimal Requirements

- (Complete) Have a login page.
- (Partially complete) Users can upload pictures of their handwritten notes or typed notes and edit/share them:
  - Users should be able to upload images to their account.
  - Users should be able to tag notes with specific topics (i.e. CPSC 221, lambda calculus, macroeconomics, etc)
  - Users should be able to determine if a note can be shared or should be private
  - Users should be able to add additional notes/annotations/description to their notes
  - Users should be able to share specific notes with no one, individuals, or everyone
  - (Incomplete, changed to labels) Users can store their notes in folders
  - (Incomplete, changed to label system) Users can create folders to keep their notes organized
  - Users can select a folder when they initially upload their note
  - Users can move notes from one folder to another
  - A user can put a link to another user’s note in a specific folder.

# Additional Requirements

- (Complete, pivoted to google auth) Add an authentication system for logging in (hashed passwords, cookie/JWT to visit only authorized pages)
- (Complete) Authentication system requires ID verification.
- (Complete changed to pro status) Add stripe integration so users can monetize their note sharing.
- (Incomplete) Have functionality whereby a user can take a photo of their notes and they will be digitized.
- (Complete) Users can “follow” other users and get updates when they post new public notes. These users can be on a “friends list”.
- (Complete) Users will be able to download notes so they can access them offline.
- (Complete) Have a text-to-speech function so notes can be read back and listened to.
- (Incomplete) Handwriting to text functionality (using computer vision and AI library) to turn images of handwritten notes to text.
- (Partially complete) Have a “feed” where users can see recently published notes by their friends.

# Stretch requirements

- (Incomplete)Dockerize the project so that anyone can use it easily
- (Complete) Add typescript to keep things more organized.
- (Incomplete) Add a chat functionality so two users can direct message each other
- (Incomplete) Add the ability for a mobile user to directly upload their notes from their phone via their taking a picture.
- (Incomplete) Have oneNote or google drive integration
- (Partially complete) Rating systems

# Description on how tech from Units 1-5 are used in the project

- HTML, CSS, JS: We used Typescript instead of JS to allow for more organized development and type checking and used some JS functionality for the stripe workflow. We used MaterialUI and SCSS as well to allow for quick development and professional looking reusable components. HTML was not really used directly, but we used React which uses HTML like syntax and is like using HTML inside of Javascript.
- React and Redux: We were able to show interactive components to users and design them more quickly than if we were just using regular HTML, JS, and CSS. We used many react features such as state to store information in components, useffects to change the view when certain state changes and to store information about notes to be uploaded, react-router to know what page we were on, and redux to communicate information between different components without needing to use prop drilling We were also able to use libraries like filepond to help with note uploading rather than having to create something from scratch to do this.
- Node and Express: These were critical to processing backend data and for storing note information as front end queries to the back end were pre-defined and users were not able to query for anything they wanted, preventing private notes from being accessed by users who did not create them. If our application gets popular, we will also be more easily able to scale our backend than if the code was in the front end as the backend can do more heavy processing than a users browser. We used GET, POST, DELETE routes to allow our front end to interact with the backend, used the backend to grab permanent data from MongoDB and Firebase, and were able to use redirects to allow for the Stripe workflow to function properly depending on success or failure.
- NoSQL and MongoDB: The Mongo NoSQL database was used to store flexible user metadata so that users can retrieve and store saved notes, and developers would be able to modify the schema during development as requirements were refined. Firebase was also used to store the actual pdfs/word documents/images as they could be stored without needing to deal with binary data unlike with mongoDB and to easily deal with user authentication. Mongoose was used to query the database as it allowed us to use interfaces so developers would be able to quickly understand the code.
- Release Engineering: Github actions were used to make sure that the front end and back end were built before deploying after main branch pushes. After confirming build without error, we had automatic deployment to Heroku allowing our product to always be available and always working to some extent in production. This was made more complicated by use of typescript but was not an issue after we learned how to transpile the typescript files into a proper output directory but was made simpler by our use of multiple repos instead of a monorepo.

# Description of ‘Above and Beyond’ functionality

- We went above and beyond by using a number of technologies that weren’t discussed in the course. First, our main functionality involves the storing of images, documents and PDFs. This was never discussed as only simple information like strings, booleans, etc was covered. As well, it required the use of other technologies such as firebase and google auth, and libraries such as filepond, and MaterialUI. We also added Stripe integration which was not covered. Typescript was also added which caused some development issues but allowed for a more organized project when divided between 4 people.  We were able to quickly understand workflow by looking at interfaces and parameters even if we did not originally work on a certain task.

# Description of Next Steps

- Next steps would probably be to add a login system outside of google. Adding descriptions to notes would also not be too difficult but helpful, as would adding unit tests for use during deployment. The biggest next step would likely be refactoring the mongo database to use multiple collections so users and notes are separate as well as making the front end more responsive.

# List of contributions

- Aaron: Created upload component, deployed front and backend with github actions and Heroku, added search feature and filter feature, fixed bugs. Also added Stripe/professional feature, filetype validation for uploads, organized the team, wrote most of the documentation, added storybook to show off initial components in isolation. Created initial components and redux actions but we ended up refactoring them and not using them.
- James: Created and implemented the design, layout, and style of many of the React components, implemented a users’ profile including a personalized TabBar where a user can view their notes, private notes, followers, and users they’re following.  Implemented the Feed, which gathers public notes from our database and displays them in a column of organized notes and implemented the Saved Notes feed (not the filter feature), where users can save and un-save notes as they like.
- Jimmy: Integrated firebase user authentication, home page layout, figma design creation, integated firebase storage for static file uploads, implemented redux for handling and managing navigation state. Added node server to handle the backend of the notes app, UserNote Service in frontend to faciliate server calls, Mongo database connection to server, and UserNote Model to handle user notes. Added routes in backend to handle requests for user notes and improved APIs for efficiency.
- Sebastian: Added the "Listen To" feature which includes a text-to-speech feature with text input and a speed component. Made a few style changes and modifications to front-end code. Added a back-end for text-to-speech to include the parsing of PDF files but this code ended up not functioning and was consequently removed.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).