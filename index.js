const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.eqk9iwm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   }
});

async function run() {
   try {
      await client.connect();
      const servicesCollection = client.db('carDoctor').collection('services');
      const checkoutCollection = client.db('carDoctor').collection('checkout');

      app.get('/services', async (req, res) => {
         const cursor = servicesCollection.find();
         const result = await cursor.toArray();
         res.send(result)
      })

      app.get('/services/:id', async (req, res) => {
         const id = req.params.id;
         const query = { _id: new ObjectId(id) }
         const result = await servicesCollection.findOne(query);
         res.send(result);
      })

      // post mane create kora
      // checkput data created in db

      app.post('/services-checkout', async (req, res) => {
         const checkout = req.body;
         console.log(checkout)
      })

      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
   } finally {

      // await client.close();
   }
}
run().catch(console.dir);












app.get('/', (req, res) => {
   res.send('doctor in running')
})

app.listen(port, () => {
   console.log(`Car Doctor server is running on ${port}`)
})