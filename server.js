import app from "./app";
import sequelize from './src/config/sequelize';
import connect from "./db";
import routeConfiguration from "./src/routes";
import './src/models';


const port = process.env.APP_PORT || 3000;


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