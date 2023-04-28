const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// middleware function to log incoming requests to the console
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// specify the connection string for your Atlas cluster
const uri = "mongodb+srv://admin:Burb3rry!@kodegocluster.uhiiddj.mongodb.net/test?retryWrites=true&w=majority";

console.log("Connecting to database...");
// connect to your Atlas cluster
MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Connected to database");

  // specify the name of your database and collection
  const db = client.db("portfolioDatabase");
  const collection = db.collection("portfolioCollection");

  // define a route to serve your HTML file
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  // define a route to handle form submissions
  app.all('/send', (req, res) => {
    console.log("Received form submission");

    // handle different HTTP methods
    switch (req.method) {
      case 'GET':
        // handle GET request
        res.send('Please submit the form');
        break;
      case 'POST':
        // handle POST request
        // extract the data submitted through the form
        const data = {
          name: req.body.name,
          email: req.body.email,
          company: req.body.company,
          subject: req.body.subject,
          message: req.body.message
        };

        // insert the data into your MongoDB database
        collection.insertOne(data, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Error inserting data into database");
          }
          console.log("Data inserted into database");
          res.status(200).send("Data submitted successfully!");
        });
        break;
      default:
        // handle other HTTP methods
        res.status(405).send('Method Not Allowed');
        break;
    }
  });

  // start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
