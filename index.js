const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()

const port = process.env.PORT || 3000
// bLrvQQV2Yj6WQhiA
// redwanbrandshop

app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://redwanbrandshop:bLrvQQV2Yj6WQhiA@cluster0.dpklxw3.mongodb.net/?retryWrites=true&w=majority";

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECRET_KEY}@cluster0.dpklxw3.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("productsDB");
    const productsCollection = database.collection("products");

    app.get('/products' , async (req, res)=> {
        const cursor = productsCollection.find()
        const result = await cursor.toArray(cursor);
        res.send(result)
    })

    app.post('/products' , async (req, res) => {
        const user = req.body;
       const result = await productsCollection.insertOne(user);
       res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/' , (req, res) => {
    res.send('redwan brand shop server is runnig')
})

app.listen(port, () => {
    console.log('redwan brandShop port is runnig on: ' , port);
})