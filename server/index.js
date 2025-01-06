const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const authRoutes = require('./routes/auth');
// const messageRoutes = require('./routes/messages');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

// Connect to MongoDB
const connectDB = require("./connection/conn")
connectDB()


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(session({
//     secret: 'yourSecretKey',
//     resave: false,
//     saveUninitialized: true,
//     store: new MongoStore({ mongooseConnection: mongoose.connection })
// }));

// Routes
app.use('/auth', authRoutes);
// app.use('/messages', messageRoutes);
// app.use('/users', userRoutes);

app.get("/",(req,res)=>{
    console.log("hhey i am working")
})

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
