var path = require("path");
module.exports = {
  entry: './javascript/firebase/firebase_custom.js',
  output: {
    path: path.join(__dirname, "webpack"),
    filename: 'firebase.js'
  }
}
