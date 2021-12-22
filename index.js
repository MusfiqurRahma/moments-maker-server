const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const ObjectId = require("mongodb").ObjectId;

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k4g9x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("Moments_Maker");
    const serviceCollection = database.collection("services");
    const blogsCollection = database.collection("blogs");
    const photographerCollection = database.collection("photographer");
    const hiredCollection = database.collection("hired");
    

    //GET Services
    app.get('/services', async (req, res) => {
      const result = await serviceCollection.find({}).toArray();
      res.json(result);
    })

   //  POST Services
    app.post('/services', async (req, res) => {
      const services = req.body;
      const result = await serviceCollection.insertOne(services);
      res.json(result);
    })

    // GET reviews
    app.get('/reviews', async (req, res) => {
       const result = await blogsCollection.find({}).toArray();
       res.json(result);
    })

    // POST reviews
    app.post('/reviews', async (req, res) => {
      const review = req.body;
      const result = await blogsCollection.insertOne(review)
      res.send(result);
    })

    // GET photographer
    app.get('/photographer', async (req, res) => {
       const result = await photographerCollection.find({}).toArray();
       res.json(result);
    })

    // POST photographer
    app.post('/photographer', async (req, res) => {
      const photograps = req.body;
      const result = await photographerCollection.insertOne(photograps)
      res.send(result);

       // GET singleProducts
      //  app.get('/hired/:id', async (req, res) => {
      //   const id = req.params.id;
      //   const user = { _id: ObjectId(id) }
      //   const cursor = await hiredCollection.find(user).toArray();
      //   res.json(cursor)
      // })

      //POST order
      app.post('/hirering', async (req, res) => {
        const orderss = req.body;
        const result = await hiredCollection.insertOne(orderss)
        res.send(result);
        // console.log(result);
      })

      // // GET manage Order
      // app.get('/allorders', async (req, res) => {
      //   const allOrders = await hiredCollection.find({}).toArray();
      //   res.json(allOrders);
      // })

      app.post('/hired', async (req, res) => {
        const orderss = req.body;
        const result = await hiredCollection.insertOne(orderss)
        res.send(result);
        console.log(result);
      })

    })

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!This is my Server side')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});