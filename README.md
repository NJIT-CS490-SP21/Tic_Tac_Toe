# Project2_milestone-2
## Requirements
1. `npm install`
2. `pip install -r requirements.txt`
3. `pip install flask_socketio`
4. `pip install flask_cors`
5. `pip install psycopg2-binary`
6. `pip install Flask-SQLAlchemy==2.1`

## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory
2. Run `npm install socket.io-client --save` in the project directory

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

##Database Setup
1. Install PostGreSQ `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs`
2. Initialize PSQL database `sudo service postgresql initdb`
3. Start PSQL `sudo service postgresql start`
4. Make a new superuser `sudo -u postgres createuser --superuser $USER`
5. Make a new database `sudo -u postgres createdb $USER`
#### Create a new database on Heroku and connect to our code
1. `heroku login -i`
2. `heroku create`
3. New remote DB on your Heroku app `heroku addons:create heroku-postgresql:hobby-dev`
4. In the heroku app go to the setting and then Config vars, copy and paste the DATABASE_URL and its key in the `.env` file.


## Known problems


## Technical issues
#### Javascrpit and react
Probabaly the hardest thing in this project was actually understading the syntax of both javascript and react.
I wouldny say that the project was hard, but these two languages was hard to catch up. I had problem understanding 
what each line of code beacause I believe once you understand something then you cna build and improve your work.
In order to understand them better I used this additional resources:
* https://reactjs.org/docs/hello-world.html
* https://reactjs.org/tutorial/tutorial.html
* https://reactjs.org
* https://www.w3schools.com/react
* https://www.w3schools.com/js/DEFAULT.asp

#### Socketio
I had a hard time understading how socketio works. We used alot of functions like `useEffect()`, `.emit()` and I had no idea what these functions do.
Again understand is the core of building on something. I knew its a bidirectional and event based communication but again what those functions actually do 
in the code takes time for me. The resources that help me on socketio are:
* https://socket.io/docs/v3
* https://flask-socketio.readthedocs.io/en/latest/
* https://ably.com/topic/socketio
* https://www.youtube.com/watch?v=1BfCnjr_Vjg

## Deploy to Heroku
*Don't do the Heroku step for assignments, you only need to deploy for Project 2*
1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`
