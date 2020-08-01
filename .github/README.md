# Computer Man
![](https://img.shields.io/discord/650827847941881860?style=flat&logo=discord)

A Discord.py bot for validating incoming member's profile pictures and usernames.

# Setup
1. Make sure you have installed [**Git**](https://git-scm.com/downloads), [**NodeJS**](https://nodejs.org/en/), & [**MongoDB Compass**](https://www.mongodb.com/try/download/compass).
2. Clone the repository & setup yarn.
```
$ git clone git@github.com:TheTypingMatch/computer-man-bot.git
$ cd computer-man-bot
$ git checkout dev
```

3. Install the required dependencies and start the bot:

**Linux or Git Bash**
```
$ cd scripts
$ sh install.sh
$ sh start.sh
```

**Windows Command Line**
```
$ py -m pip install discord.py dotenv
$ py index.py
```

4. Create a `.env` in the root directory of the repository.
5. Inside of the `.env` file, include the following:
```js
TOKEN="YOUR_BOT_TOKEN"
```
