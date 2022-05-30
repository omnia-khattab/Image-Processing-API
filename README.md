# Image-Processing-API

## The needed scripts
  - ### EsLint 
    -  npm run lint
  - ### prettier
    -  npm run prettier
  - ### build
    -  npm run build
  - ### jasmin
    - npm run jasmine
  - ### start
    - npm run start
    
## Project EndPoints
  - http://localhost:3000/
  - http://localhost:3000/api/images
  - http://localhost:3000/api/images?name=image4&width=400&height=400
  - http://localhost:3000/api/images?name=image4&width=10&height=10
  
## Project Failed EndPoints
  - http://localhost:3000/api/images?name&width=400&height=400
  - http://localhost:3000/api/images?name=image4&width=0&height=400
  - http://localhost:3000/api/images?name=image4&width=400&height=0
  - http://localhost:3000/api/images?name=image4&width=9&height=9
  - http://localhost:3000/api/images?name=image4&width=10

## Project Functionality
  I have created two middleware function
  - ### validation
    - responsible for validating the url query string then go to the next middleware resize function
  - ### resize
    - responsible for resizing the image and check if the image already resized before or not then
     it go to  `imageRoute` who is reponsible for uploading the resized image to the server.
  
  
