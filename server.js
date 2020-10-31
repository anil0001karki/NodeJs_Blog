const express=require('express');
const app=express();
const mongoose=require('mongoose')
const Article=require('./models/article')
const articlRouter=require('./routes/article')
const methodOverride=require('method-override')

mongoose.connect('mongodb://localhost/blog-test',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
})
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))


app.get('/',async(req,res)=>{
   const articles= await Article.find().sort({
       createdAt:'desc'
   }) 
   res.render('articles/index',{articles: articles})
})
app.use('/articles',articlRouter)

app.listen(3000 || process.env.PORT,()=>{
    console.log("app running on http://127.0.0.1:3000")
})