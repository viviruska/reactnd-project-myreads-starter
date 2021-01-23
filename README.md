# About the app

In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:

- Currently Reading
- Want to Read
- Read

!(https://video.udacity-data.com/topher/2017/May/590c0f12_react-project1-a/react-project1-a.png)

Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. Note that the default value for the control should always be the current shelf the book is in.

!(https://video.udacity-data.com/topher/2017/May/590c0f26_react-project1-b/react-project1-b.png)

The main page also has a link to `/search`, a search page that allows you to find books to add to your library.

The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library. To keep the interface consistent, you may consider re-using some of the code you used to display the books on the main page.

!(https://video.udacity-data.com/topher/2017/December/5a3c22b9_screen-shot-2017-12-21-at-1.06.59-pm/screen-shot-2017-12-21-at-1.06.59-pm.png)

The search page also has a link to `/` (the root URL), which leads back to the main page.

When you navigate back to the main page from the search page, you should instantly see all of the selections you made on the search page in your library.


# How to start the app

The application was created with `create-react-app` and requires only the following steps to install and launch:

- clone this repository
- cd to `reactnd-project-myreads-starter` folder
- run `npm install`
- run `npm start`
- open your browser and `localhost:3000`