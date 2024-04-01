import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;




app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.render("indexe.ejs");
  });

app.post("/submit", async (req, res) => {
    const cityname = req.body.city;
    try {
      
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=82fb8cae0edea5f3833e9857a3d6f172&units=metric`); 
   
      res.render("indexe.ejs", { 
        weatherData: response.data.list[0].main.temp,
        Humid: response.data.list[0].main.humidity,
        wnd: response.data.list[0].wind.speed, 
        cty: cityname,
      });
    } catch (error) {
        console.log(error.message);
        console.log(cityname);
      res.status(500).json({ message: "Error fetching post" });
    }
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  

