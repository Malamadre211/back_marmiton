import express from "express"; 
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser"

const app = express();

app.use(cors());
app.use(bodyParser.json());
const port = parseInt(process.env.PORT as string);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })