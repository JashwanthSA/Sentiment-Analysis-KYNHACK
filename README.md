
# Sentiment-Analysis-KYNHACK

This project is a full-stack application with a Flask backend and a React frontend. It provides functionalities for sentiment analysis, comment management, and interactive data display.

# Team MENtion

| Name          | GitHub Profile                     |
|---------------|------------------------------------|
| Madhavan V     | [GitHub Link](https://github.com/Madhavan112/) |
| Jashwanth SA    | [GitHub Link](https://github.com/JashwanthSA) |
| Murali Srinivasan S      | [GitHub Link](https://github.com/Murali-77) |


## Prerequisites

Before starting the project, ensure you have the following installed on your machine:

- Python 3.x
- Node.js (for the React frontend)
- npm or yarn (for React package management)
  
## Architecture Diagram

![ Architect Diagram](/frontend//src/assets/flow.png)

## Tools and Technologies

## Frontend

- React
- Vite
- Tailwind CSS
- Recharts
  
## Backend

- Flask
- NLTK
- Requests
- RAKE


## Backend Setup (Flask)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/JashwanthSA/Sentiment-Analysis-KYNHACK.git
   cd backend
   ```

2. **Set up a virtual environment:**

   To create an isolated environment for the Flask backend, use `venv`.

   ```bash
   python -m venv env
   ```

3. **Activate the virtual environment:**

   On **Windows**:

   ```bash
   venv\bin\activate
   ```

   On **Mac/Linux**:

   ```bash
   source venv/bin/activate
   ```

4. **Install required dependencies:**

   Install the necessary Python packages listed in `requirements.txt`:

   ```bash
   pip install -r requirements.txt
   ```

5. **Set environment variables:**

   To run the Flask app without any difficulty it requires environment variables so, set them before running the app. You can create a `.env` file in the `backend` directory.

   COMMAND:
   ```bash
   FLASK_APP=app.py
   FLASK_DEBUG=1
   ```

6. **Run the Flask backend:**

   To start the Flask server:

   ```bash
   flask run
   ```

   This will start the backend at `http://127.0.0.1:5000`.

## Frontend Setup (React)

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install frontend dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Run the React frontend:**

   To start the React development server:

   ```bash
   npm run dev
   ```

   This will start the frontend at `http://localhost:5173` .


## Folder Structure

Here’s an overview of the folder structure:

```
PROJECT_NAME_DIR
├── backend
│   ├── app.py
│   ├── __pycache__
│   ├── requirements.txt
│   ├── services
│   └── venv
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   ├── README.md
│   ├── src
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## Notes

- **Backend (Flask)**: The Flask backend serves as the API for your application. It handles requests from the frontend, processes data, and responds accordingly.
- **Frontend (React)**: The React frontend provides an interactive user interface, where users can view posts, comments, and sentiment analysis results.

## Troubleshooting

- **Backend not starting**: If you encounter issues when starting the Flask app, ensure your environment is set up correctly and that all required packages are installed.
- **Frontend build errors**: Make sure that your frontend dependencies are installed correctly by running `npm install` or `yarn install` in the frontend directory.


##  Features

- **Sentiment Analysis**: The project incorporates sentiment analysis for both posts and comments, visualized using pie charts, bar charts, and line charts. Sentiment scores (positive, neutral, and negative) are analyzed from real-time Reddit data.
  
- **Post and Comment Management**: The backend allows users to retrieve posts from a valid subbreddit(real time analysis), view detailed post content along with sentiment scores, and display related comments. Each post's comments are also analyzed for sentiment.

- **Visualization**:
  - **Pie Chart**: Visualizes the distribution of sentiment (positive, neutral, and negative) for posts and comments.
  - **Bar Chart**: Represents sentiment scores for posts and comments, allowing comparison of sentiment across different posts.
  - **Line Chart**: Tracks sentiment trends over time, displaying how sentiment scores change across multiple posts or comments.
  
- **Keyword Extraction**: Extracts keywords from both posts and comments using techniques like RAKE( ` Rapid Automatic Keyword Extraction ` ). This enables efficient topic identification and analysis.
  
- **Trend Topic Analysis**: Identifies trending topics on Reddit by analyzing keywords and topics mentioned in recent posts. This helps users stay informed about what is gaining traction on Reddit in real time.

- **Real-time Data from Reddit**: The project uses Reddit's public API to fetch data, analyze sentiment, extract keywords, and track trending topics for posts and comments.
 

## Contributing

If you want to contribute to this project, feel free to fork the repository, make changes, and create a pull request.
