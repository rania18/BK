import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import categoryRouter from './routers/categoryRouter.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import sliderRouter from './routers/sliderRouter.js';
import projectRouter from './routers/projectRouter.js';
import blogRouter from './routers/blogRouter.js';
import instagramRouter from './routers/instagramRouter.js';
import shopRouter from './routers/shopRouter.js';
// import path from 'path';
dotenv.config();
const app = express();
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
const CONNECTION_URL = "mongodb+srv://maamoun:Grissa1906@cluster0.wslrq.mongodb.net/Cluster0?retryWrites=true&w=majority";
const PORT = process.env.PORT|| 5000;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
/* app.get('/', (req, res) => {
  res.send('Welcome to ECommerce API')
}) */
// Routes
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/sliders', sliderRouter);
app.use('/api/projects', projectRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/instagrams', instagramRouter);
app.use('/api/shop', shopRouter);
// Production 
/* 
app.use(express.static('client/build'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
}) */
