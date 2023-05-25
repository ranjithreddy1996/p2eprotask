const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
var indexRouter = require("./routes/event");
 
const app = express();
const port = 3000;
app.use(bodyParser());
app.use("/api", indexRouter);
// Connect to MongoDB
mongoose.connect('mongodb+srv://reddyyellareddys:Qwerty@cluster0.cgi6g6v.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
