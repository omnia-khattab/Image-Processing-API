# Image-Processing-API

## The needed scripts
  - ### EsLint and prettier
    -  npm run lint && npm run prettier
  - ### Test
    - npm run build && npm run jasmine
  - ### start
    - node build/index.js
    
## Project EndPoints
  - http://localhost:3000/
  - http://localhost:3000/api/images
  - http://localhost:3000/api/images?name=image4&width=400&height=400
  
## Project Functionality
  I have created two middleware function
  - ### validation
    - responsible for validating the url query string then go to the next middleware resize function
  - ### resize
    - responsible for resizing the image and check if the image already resized before or not then
     it go to  `imageRoute` who is reponsible for uploading the resized image to the server.
  
  
