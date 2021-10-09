Pre-project setup 
1. Install postgreSQL 13 database on your machine
2. Create python venv by running
    `python -m venv shoptime_venv`
    `source shoptime_venv/bin/activate`
    
3. Install basic required packages
    `pip install django djangorestframework Pillow psycopg2 psycopg2-binary django-cors-headers`
    `pip freeze > requirements.txt` 

4. To create django application run and also update settings.py file as per the settings.py file in this project
    `django-admin startproject shop_time .`

5. Install React in the base project directory
    `npx create-react-app frontend`

6. Install required react packages
- axios is required to make API calls to the backend
- react-redux help use redux in the application
- redux-devtools-extension along with chrome extension is used for debugging 
    `npm install --save axios react-redux redux redux-thunk redux-devtools-extension react-router-dom`

Check package.json to see if all the dependencies are installed