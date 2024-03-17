const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
 
const authRoutes = require("./routes/auth")

app.use(cors())
app.use(bodyParser.json())
app.use(express.json()) 
app.use(express.static("public"));

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "font-src 'self' https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap"); // Allow loading fonts from the same origin ('self') and from data URIs
    next();
});
app.use('/auth', authRoutes)


const PORT = 3001
mongoose.connect(process.env.MONGO_URL,{
    dbName: "Rental_MERN",
    useNewUrlParser: true,
    useUnifiedTopology: true    
})
.then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`))
}).catch((err) => console.log(`${err} did not connect`))
