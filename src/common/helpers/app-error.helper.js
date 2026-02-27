export const appError = (err,req,res,next)=>{
    console.log("mid dac biet bat loi");
    res.status(500).json(err?.stack)
}