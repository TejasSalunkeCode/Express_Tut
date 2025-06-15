import {createReadStream,createWriteStream} from "fs";

import path from "path";

const inputfile=path.join(import.meta.dirname,"input.txt");
const outputFile=path.join(import.meta.dirname,"output.txt");

const readableStream=createReadStream(inputfile,{encoding:"utf-8",highWaterMark:16});

const writeableStream=createWriteStream(outputFile);

readableStream.pipe(writeableStream);


readableStream.on("error",(err)=>console.error(err));
readableStream.on("error",(err)=>console.error(err));
