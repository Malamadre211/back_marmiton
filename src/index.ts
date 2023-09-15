import express, { Request } from "express"; 
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser"
import { Sequelize, DataTypes } from "sequelize";

const app = express();

app.use(cors());
app.use(bodyParser.json());
const port = parseInt(process.env.PORT as string);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
  })

  const Recipe = sequelize.define("Recipe", {
    name: {
      type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
      },
    duration: {
      type: DataTypes.STRING,
    },
    note: {
        type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
  })

  Recipe.sync();

  interface IMaRequetBody {
    name: string,
    url: string,
    duration: string,
    note: string,
  }
  
app.post("/recipes", async (req: Request<IMaRequetBody>, res) => {
    const name = req.body.name
    const url = req.body.url
    const duration = req.body.duration
    const note = req.body.note
    const maRecette = await Recipe.create({name : name, duration : duration, note : note, url : url})
    res.json(maRecette)
  });

app.get("/recipes", async (_, res) => {
    const TousRecettes = await Recipe.findAll()
    res.send(TousRecettes)
})