# Daily Survey

Daily Survey is a app that allows you to see Google Form results for one form overtime, meaning you can use the same form overtime to create a huge amount of data.

The Google Form responses must be [pointed at a spreadsheet](https://support.google.com/docs/answer/2917686?hl=en&ref_topic=6063592), there is a option in the form under 'responses' to do this. Responses are then put into a Google sheet, each response is a new row, all rows are pulled into the app on login.

You must login using the Google account that has permissions to view the sheet. The app is built with a specific format in mind and the first 2 questions must be 'What is your name?' and 'How are you feeling today' in that order.  

## Configuration

In order to get the app running you will need to make sure you have a Google api key that has the sheets v4 api enabled. Then make a copy of ```config.example.js``` located in ```src/helpers``` and name it ``` config.js ```

In ```config.js``` add in your api, client id, and the spreadsheet id. The app should now be able read in all the data from that spreadsheet when you login, assuming the account used to login has permission to access that spreadsheet.

This was originally used with a class of 19, so the amount of expected submissions is hardcoded in. You should update this number in files Day.vue, Recent.vue, and Today.vue.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# deploy to surge(this will be different depending on your preferred deployment site/method)
surge ./public
```
