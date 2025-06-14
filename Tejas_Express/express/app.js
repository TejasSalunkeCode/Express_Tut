import express from "express";
import { PORT } from "./env.js"
import path from "path";
import { log } from "console";
const app = express();

// const showdata= async()=>{
//   try {
//     const response=await fetch("https://jsonplaceholder.typicode.com/todos/1");
//     const json=response.json();
//     console.log(json);

//   } catch (error) {
//     console.log(error);

//   }
// }
// showdata();

const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const json = await response.json();
console.log(json);

console.log(import.meta.dirname);
console.log(import.meta.filename);



//absoloute path
const staticPath = path.join(import.meta.dirname, "public")
app.use("/public", express.static(staticPath));

app.get("/about", (req, res) => {
  res.send("Now You are in about Page")
})

app.get("/profile/:username",(req,res)=>{
  console.log(req.params);
  res.send(`<h1>My UserName is ${req.params.username}</h1>`)
  
})


app.get("/profile/:username/article/:slug",(req,res)=>{
  console.log(req.params);
  const formatedSlug=req.params.slug.replace("\-\g"," ")
  res.send(`<h1>Article ${req.params.username} by ${req.params.slug}</h1>`)
  
})


app.get("/", (req, res) => {
  const homePagePath=path.join(import.meta.dirname,"public","index.html")
  res.sendFile(homePagePath)

  // console.log(import.meta.url);
  // const __filename=new URL(import.meta.url).pathname;
  // console.log(__filename);

})

app.get("/contact", (req, res) => {
  return res.send(` <div class="container">
    <h1>URL Shortener</h1>
    <form id="shorten-form">
      <div>
        <label for="url">Enter URL:</label>
        <input type="url" name="url" id="url" required />
      </div>
      <div>
        <label for="shortcode">Enter ShortCode:</label>
        <input type="text" name="shortcode" id="shortcode" required />
      </div>
      <button type="submit">Shorten</button>
    </form>

    <h2>Shortened URLs</h2>
    <!-- <ul id="Shortened-urls"></ul> -->
     <ul id="shortened-urls"></ul>
  </div>`)
})


// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
  console.log();


})

const __filename = new URL(import.meta.url).pathname;
console.log(__filename);