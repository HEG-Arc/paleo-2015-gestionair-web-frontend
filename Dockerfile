FROM digitallyseamless/nodejs-bower-grunt
WORKDIR /data
ADD package.json
RUN npm install
ADD bower.json
RUN bower install --allow-root
VOLUME /data
CMD grunt serve