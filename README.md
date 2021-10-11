<h1 align="center">
Kinaxis Project
<h1/>

## Installation

- git pull repository on your local
- run **`npm install `**
- create a **.env** file and paste the codes below into your own env file.

```
REACT_APP_FIREBASE_apiKey=
REACT_APP_FIREBASE_authDomain=
REACT_APP_FIREBASE_projectId=
REACT_APP_FIREBASE_databaseURL=
REACT_APP_FIREBASE_storageBucket=
REACT_APP_FIREBASE_messagingSenderId=
REACT_APP_FIREBASE_appId=
```

- create your own firebase project from [Firebase](https://console.firebase.google.com/) website
- Add two provider Email/Password and Google in Authentication

  ![](/src/assets/Authentication.png)

- edit rules in Realtime Database

  ![](/src/assets/RealtimeDatabase.png)

- copy each values inside of firebaseConfig to your env file

  ![](/src/assets/projectSetting.png)

<br/>
<hr/>
<h2 align="center">
Overview
</h2>
<hr/>

![](/src/assets/overview.png)

<p>

The purpose of this project is to show my own front end skills. In this project, I tried to make a blog application for the Kinaxis company. In the picture above, I showed the structure of project superficially.

I used React JS for front end side and I used Firebase for backend side and authentication. This project consists of 7 pages. Some pages are under the private router, to access these web pages the users need to be logged into the system. Users can login and register with Email and Password or Google. Users can create a blog and update and delete their own blog. No one can delete or update other people's blogs. Users can see all the blog cards on the dashboard page without login to system, but cannot see the details of the blog without login. Every blog has an author, image, content, title, and date of publication.

I used [Firebase](https://firebase.google.com/docs/build?authuser=0) for authentication and database. I used the [Material UI](https://mui.com/) library in the page design.
I used [Formik](https://formik.org/docs/overview) library and Yup while I was editing the form structure and validation. I used [React-Toastify](https://www.npmjs.com/package/react-toastify) for notification. I used Context API to access current user and blog information.

</p>
