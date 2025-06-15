
import { writeFile, readFile } from "fs/promises";
import { createServer } from "http";
import path from "path";
import crypto from "crypto";
import express from "express";

const app=express();


const PORT = 3002;
const Data_file = path.join("data", "links.json");


app.use(express.static("public"));

const serveFile = async (res, filepath, contentType) => {
    try {
        const data = await readFile(filepath);
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    } catch (error) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Page not found");
    }
};

const loadLinks = async () => {
                    links[finalshortCode] = url;
                await saveLinks(links);

    try {
        const data = await readFile(Data_file, "utf-8");
        return JSON.parse(data);
    } 
    
    catch (error) {
        if (error.code === "ENOENT") {
            await writeFile(Data_file, JSON.stringify({}));
            return {};
        }
        throw error;
    }
};

const saveLinks = async (links) => {
    console.log("Saving links:", links);
    await writeFile(Data_file, JSON.stringify(links));
};

app.get("/",async(req,res)=>{
    try {
        const file=await fs.readFile(path.join("views","index.html")); 
        const links=await loadLinks();
    } 
    catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
    }
})

const server = createServer(async (req, res) => {
    console.log(req.method, req.url);

    if (req.method === "GET") {
        if (req.url === "/") {
            return serveFile(res, path.join("public", "index.html"), "text/html");
        } else if (req.url === "/style.css") {
            return serveFile(res, path.join("public", "style.css"), "text/css");
        } else if (req.url === "/links") {
            const links = await loadLinks();
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(links));
        } else {
            const shortcode = req.url.slice(1); // Remove '/'
            const links = await loadLinks();
            const originalUrl = links[shortcode];
            if (originalUrl) {
                res.writeHead(302, { Location: originalUrl });
                return res.end();
            } else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                return res.end("Short URL not found");
            }
        }
    }

    if (req.method === "POST" && req.url === "/shorten") {
        const links = await loadLinks();

        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            try {
                const { url, shortcode } = JSON.parse(body);

                if (!url) {
                    res.writeHead(400, { "Content-Type": "text/plain" });
                    return res.end("URL is required");
                }

                const finalshortCode = shortcode || crypto.randomBytes(4).toString("hex");

                // if (links[finalshortCode]) {
                //     res.writeHead(400, { "Content-Type": "text/plain" });
                //     return res.end("Short code already exists, please choose another.");
                // }

                if(links[finalshortCode]){
                    return  res.status(400).send("Short code already exists, please choose another.")
                }

                // links[finalshortCode] = url;
                // await saveLinks(links);

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true, shortcode: finalshortCode }));
            } catch (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Server error");
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
