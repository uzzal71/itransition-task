import app from "./app";
import sequelize from './src/config/sequelize';
import connect from "./db";
import routeConfiguration from "./src/routes";
import './src/models';


const port = process.env.APP_PORT || 3000;

app.get("/", (req, res) => {
    res.json({
      message: "Welcome to server",
      version: "1.0.0",
      author: "Uzzal Kumar Roy",
      contact: {
        phone: "+8801319630372 / +8801788134303",
        email: "uzzalroy.acm@gmail.com",
      },
    });
});


// router configuration
routeConfiguration(app);

connect()
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    })

app.listen(port, async () => {
    console.log(`Server listening on port ${port}`);
    await sequelize.sync({alter: true});
});