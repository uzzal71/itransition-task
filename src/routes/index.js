import routes from "./routes";

const routeConfiguration = (app) => {
  app.use("", routes);
};

export default routeConfiguration;
