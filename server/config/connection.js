const mongoose = require('mongoose');
require('dotenv').config()

const mongooseConnectionString = process.env.MONGODB;


mongoose.connect(mongooseConnectionString, { useNewUrlParser: true})
  // .then(
  //   () => {
  //     console.log("MongoDB Connected Successfully");
  //     return server.listen({ port: 5000 });
  //   }
  // )
  // .then((res) => {
  //   console.log(`Server is running on port ${res.url}`);
  // });

  module.exports = mongoose.connection;