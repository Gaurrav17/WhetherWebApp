import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;




app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const API_ID = "82fb8cae0edea5f3833e9857a3d6f172";


/*app.set('views', './views');
app.set('view engine', 'ejs');*/

app.get("/", (req, res) => {
    res.render("indexe.ejs");
  });

app.post("/submit", async (req, res) => {
    const cityname = req.body.city;
    try {
      
      console.log(cityname);
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=82fb8cae0edea5f3833e9857a3d6f172&units=metric`); 
           //const data = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=82fb8cae0edea5f3833e9857a3d6f172&units=metric1`)   
          //const weatherData = response.data;
         //const temp  = weatherData.main[0].temp;
        //console.log(temp);
       //   console.log(response.data)
      //   const wt = JSON.parse(response);
     //   console.log(wt.weather.main.temp);
     /*const weatherData = */
     //console.log(response.body);
       // const wt =  weatherData.main.temp
       console.log(response.data.list[0].main.temp);
       //const weatherData = response.data.list[0].main.temp;

     //console.log(weatherData);
      res.render("indexe.ejs", {
        /*tep: "response",*/
        weatherData: response.data.list[0].main.temp,
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
  

