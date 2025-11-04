const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart server is running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8tne59p.mongodb.net/?appName=Cluster0`;

// const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("smart_db");
    const productsCollection = db.collection("Products");
    const bidsCollection = db.collection("bids");
    const userCollection = db.collection("Users");
    app.post("/user", async (req, res) => {
      const userData = req.body;
      const email = userData.email;
      const query = { email: email };
      const exgistingUser = await userCollection.findOne(query);
      if (exgistingUser) {
        res.send("User already exjested. please try age!");
        return;
      }
      const result = await userCollection.insertOne(userData);
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      //   const projectFields = { title: 1, email: 1, category: 1, image: 1 }; { price_min: { $gt: 5000 } }

      const allProducts = productsCollection
        .find()
        .sort({ created_at: 1 })
        .limit(6);
      const result = await allProducts.toArray();
      res.send(result);
    });
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: id };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      const result = await productsCollection.insertOne(newProduct);
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/products/:id", async (req, res) => {
      const id = req.params.id;
      const newProduct = req.body;

      const query = { _id: new ObjectId(id) };
      const update = {
        $set: newProduct,
      };
      const result = await productsCollection.updateOne(query, update);
      res.send(result);
    });

    app.post("/bids", async (req, res) => {
      const newBids = req.body;
      const result = await bidsCollection.insertOne(newBids);
      res.send(result);
    });

    app.get("/bids", async (req, res) => {
      // const result = await bidsCollection.find().toArray();
      // res.send(result);
      const email = req.query.email;

      const query = {};
      if (email) {
        query.buyer_email = email;
      }
      const coursor = bidsCollection.find(query);
      const result = await coursor.toArray();
      res.send(result);
    });

    app.get("/products/bids/:productId", async (req, res) => {
      const productId = req.params.productId;

      const query = {};
      if (productId) {
        query.product = productId;
      }
      const bidsProduct = await bidsCollection.find(query).toArray();
      res.send(bidsProduct);
      if (bidsProduct) {
      } else {
        res.send("No Bids Collections");
      }
    });

    app.get("/bids/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const result = await bidsCollection.findOne(query);
      res.send(result);
    });

    app.delete("/bids/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bidsCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/bids/:id", async (req, res) => {
      const id = req.params.id;
      const newBids = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: newBids,
      };
      const result = await bidsCollection.updateOne(query, update);
      res.send(result);
    });

    // app.get("/bids", (req, res) => {
    //   const email = req.query.email;
    //   console.log("Email from query:", email);
    //   res.send({ email });
    // });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
