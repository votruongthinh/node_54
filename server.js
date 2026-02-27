import express from 'express';
import rootRouter from './src/routers/root.router.js';
import { appError } from './src/common/helpers/app-error.helper.js';

const app = express();

app.get('/',(request ,response,next)=>{
    response.json("hello you ")
})
app.use("/api",rootRouter);
app.use(appError);


const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})

