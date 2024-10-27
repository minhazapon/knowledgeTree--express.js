const express = require('express')
const cors = require('cors')
require('dotenv').config() 
const app = express()
const port =  process.env.PORT || 5000


console.log(process.env.DB_USERTREE)
console.log(process.env.DB_PASSTREE)

//knowledgeTree
//KTree123

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('kTree Server!')
})


////////////////mongodb/////////////////////////////


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERTREE}:${process.env.DB_PASSTREE}@cluster0.ruz4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

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
    // Send a ping to confirm a successful connection


    ////blogData///////
    const blogsCollection = client.db('blogsDB').collection('blogsData')
    
    app.get('/blogsData',  async(req, res) => {
           
       const cursor = blogsCollection.find();
       const result = await cursor.toArray()
       res.send(result)
 
    })
    ////blogData///////


    ////courseData///////////
    const courseCollection = client.db('courseDB').collection('courseData')

    app.get('/courseData', async(req, res) => {
     
        const cursor = courseCollection.find();
        const result = await cursor.toArray();
        res.send( result )

    })

    app.get('/courseData/:id',  async(req, res) => {
      
      const id = req.params.id 
      const query = { _id: new ObjectId(id)}
      const result = await courseCollection.findOne(query)
      res.send(result)
  
     }) 

    ////courseData///////////


    /////all blogs data/////////

    const allBlogsCollection = client.db('ABlogsDB').collection('ABlogsData')

    app.get('/ABlogsData', async(req, res) => {
     
        const cursor = allBlogsCollection.find();
        const result = await cursor.toArray();
        res.send( result )

    })

    app.get('/ABlogsData/:id', async(req, res) => {
     
       const id = req.params.id 
       const query = { _id: new ObjectId(id) }
       const result = await allBlogsCollection.findOne(query)
       res.send(result)

    })


    /////all blogs data/////////
   


    //////shopData//////////

    const treeShopCollection = client.db('treeShopDB').collection('treeShopData')
    
    
    app.get('/treeShopData', async(req, res) => {
     
       const cursor = treeShopCollection.find()
       const result = await cursor.toArray()
       res.send(result)

    })


    //////shopData//////////



    ///crud operation//////////////////



    const productsAddedCollection = client.db('productsDB').collection('productData')
    

    ////add/////

    app.post('/productData', async(req, res) => {
     
          const productData = req.body 
          console.log(productData)
          const result = await productsAddedCollection.insertOne(productData)
          res.send(result)

    })

     ////add/////


    ///////read///////////
    
    app.get('/productData', async(req, res) => {
     
      const cursor = productsAddedCollection.find();
      const result = await cursor.toArray();
      res.send(result)

    }) 

     



        





    ///crud operation//////////////////





    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



////////////////mongodb/////////////////////////////

app.listen(port, () => {
  console.log(`kTree Server port ${port}`)
})