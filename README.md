
HOW TO GET THE SITE RUNNING:

to run the program you'll need to install nvm and then npm

nvm i npm

and then there's a long list of requirements which can all be installed with the next command:

npm i bcrypt bcryptjs cookie-parser debug dotenv express express-validator http-errors jsonwebtoken mongodb mongoose morgan multer passport-jwt

The site is using mongodb which can be downloaded from here: https://www.mongodb.com/try/download/community

run the server with: 

npm start

server is running on port 1234 --> localhost:1234

USER MANUAL:

Not much to say here. From index page you can login, register and read posts. If you click the posts link you can read the posts and comments on the posts. If you are logged in you can also create a new post and comment already existing posts.

Few words about the code and technology choises:

I did the code by expanding week7 exercise and therefore I haven't used react or any additional framework on the frontend. The main source for the code is week7 video and source code. As a database i've used mongodb via mongoose schemas since that was the method being used during the course. In the backend i used express because I found it really simple and became familiar with it during the weekly exercises. As a view-engine I used pug, which I think afterwards was not that great of an idea since there was so much more information in html and for example materialize documentation was all html.

Hopefully my commenting can also present my thought-process and clarify the ideas that I used in the code.

Points:

I haven't done any additional tasks (that are mentioned in the project description) for the site so I'm just going for the minimum 25 points. Only additional thing that wasn't mentioned in the project description was that I've added commentor email which is displayed next to the comment on /posts/:id -page. If that's worth something, the additional point is always welcome :) 
