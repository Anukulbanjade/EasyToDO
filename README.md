# EasyToDo

EasyToDo is a simple and elegant to-do list application built with Node.js, Express, MongoDB, and Mongoose. It allows users to add, edit, and delete to-do items with ease. The application uses Pug for templating and includes a clean, responsive design.

## Features

- **Add New To-Do Items:** Quickly add new tasks to your list.
- **Edit Existing To-Do Items:** Modify tasks as needed.
- **Delete To-Do Items:** Remove tasks that are no longer needed.
- **Pagination:** Navigate through your tasks easily with pagination.
- **Responsive Design:** Enjoy a seamless experience on any device.

## Installation

Follow these simple steps to get EasyToDo up and running on your local machine:

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **MongoDB**: Make sure you have MongoDB installed and running. You can use a local MongoDB instance or a MongoDB Atlas cluster.

### Steps

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/Anukulbanjade/EasyToDO.git
    cd EasyToDo
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Up MongoDB:**

    Update the MongoDB connection URI in `app.js` if necessary. The default URI is set to connect to a MongoDB Atlas cluster.

4. **Run the Application:**

    ```bash
    node app.js
    ```

    The application will start on `http://localhost:3000`.

## Usage

1. **Home Page:**

    The home page displays the list of to-do items. You can add a new to-do item using the input field and the "Add" button.

2. **Edit To-Do:**

    Click the edit button (pencil icon) next to a to-do item to edit its text. A modal will appear where you can update the text and save the changes.

3. **Delete To-Do:**

    Click the delete button (trash icon) next to a to-do item to delete it.

4. **Pagination:**

    If there are more than 10 to-do items, pagination controls will appear at the bottom of the list to navigate through the pages.

## Project Structure

/EasyToDo
├── app.js
├── views
│   └── index.pug
├── public
│   ├── styles.css
│   └── script.js
└── package.json


- **app.js:** Main server file.
- **views/index.pug:** Pug template for the home page.
- **public/styles.css:** CSS file for styling.
- **public/script.js:** JavaScript file for client-side functionality.
- **package.json:** Project metadata and dependencies.

## Dependencies

- **express:** Fast, unopinionated, minimalist web framework for Node.js.
- **mongoose:** Elegant MongoDB object modeling for Node.js.
- **mongodb:** The official MongoDB driver for Node.js.
- **body-parser:** Node.js body parsing middleware.
- **method-override:** Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
- **pug:** Robust, elegant, feature-rich template engine for Node.js.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Acknowledgements

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Pug](https://pugjs.org/)

---

Feel free to customize this README file as needed for your project. Happy coding!
