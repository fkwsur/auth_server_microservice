FROM node:14

RUN mkdir /app

WORKDIR /app

ADD ./ /app

RUN npm install

CMD node app.js


# CMD => CommanDLine  => 마지막에 커맨드라인에 실행한 문장

# ENTRYPOTIN => .sh 파일을 실행시켜줌
#  
#  docker push guswl543210/practice:0.0.0

# docker build -t guswl543210/test:0.0.0 .
# docker push guswl543210/test:0.0.0