const passport = require('../Authentication/auth.js');
const express = require('express');
const session = require('express-session');
const axios = require("axios");
const cors = require('cors');

const app = express();
const port = 3000;

const COMPOSITE_SERVICE_URL = "https://comsw4153-cloud-composite-service-973496949602.us-central1.run.app";
app.use(express.json());
app.use(cors({
  origin: "*", // CHANFGE TO THE FINAL URL
  credentials: true
}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.status(401).json({
    error: "User is not authenticated"
  });
}

//example:
//curl "http://localhost:3000/query-routes-and-stations?source=Columbia%20University&destination=John%20F.%20Kennedy%20International%20Airport&user_id=123"
//output:
//{"routes":[{"bounds":{"northeast":{"lat":40.808134,"lng":-73.7893588},"southwest"...
app.get("/query-routes-and-stations", async(req, res) =>{
  try{
    const { source, destination, user_id } = req.query;
    console.log("Querying routes and stations for source: ", source, " and destination: ", destination);
    const response = await axios.get(`${COMPOSITE_SERVICE_URL}/query-routes-and-stations/`,{
      params: {source, destination, user_id}
    });
    res.status(response.status).json(response.data);
  } catch(error){
    console.error(error);
    res.status(500).json({error: "Failed to query routes and stations"});
  }
});

//example:
//curl -X POST "http://localhost:3000/save-route" -H "Content-Type: application/json" -d @example_route.json
//output:
//{"message":"Route is successfully saved!","route_id":"b07e4b46-5b71-45d2-b123-d0ac194a92ed","user_id":"123"....
app.post("/save-route", async(req, res) => {
  try{
    const response = await axios.post(`${COMPOSITE_SERVICE_URL}/save-route/`, req.body,{
      headers: {"Content-Type": "application/json"}
    });
    res.status(response.status).json(response.data);
  } catch(error){
    console.error(error);
    res.status(500).json({ error: "Failed to save route"});
  }
});

//example:
//curl -X PUT "http://localhost:3000/unsave-route?route_id=a38349e6-b04d-40da-8540-53c6d495bb9e"
//output:
//{"message":"Route is successfully deleted!","route_id":"a38349e6-b04d-40da-8540-53c6d495bb9e"}
app.put('/unsave-route', async(req, res) => {
  const { route_id } = req.query;
  try{
    console.log("Unsaving route with ID: ", route_id);
    const response = await axios.put(`${COMPOSITE_SERVICE_URL}/unsave-route/`, null,{
      params: {route_id},
    });
    res.status(response.status).json(response.data);
  } catch(error){
    console.error(error);
    res.status(500).json({error: "Failed to unsave route."});
  }
});

//example:
//curl "http://localhost:3000/get-saved-routes-and-stations?user_id=123"
//output:
//{"routes":[{"bounds":{"northeast":{"lat":40.808134,"lng":-73.7893588},"southwest"...
app.get("/get-saved-routes-and-stations", async (req, res) => {
  try{
    const {user_id } = req.query;
    const response = await axios.get(`${COMPOSITE_SERVICE_URL}/get-saved-routes-and-stations/`, {
      params: {user_id}
    });
    res.status(response.status).json(response.data);
  } catch(error){
    console.error(error);
    res.status(500).json({error: "Failed to get saved routes and stations."});
  }
});

//example:
//curl "http://localhost:3000/query-all-routes-by-user?user_id=123&limit=10"
//output:
//{"routes":[{"id":13,"origin":"Columbia University","destination":"John F. Kennedy International Airport"...
app.get("/query-all-routes-by-user", async (req, res) => {
  try {
    const {user_id, limit} = req.query;
    const response = await axios.get(`${COMPOSITE_SERVICE_URL}/query-all-routes-by-user/`,{
      params: {user_id, limit}
    });
    res.status(response.status).json(response.data);
  } catch(error){
    console.error(error);
    res.status(500).json({error: "Failed to get queried routes for user."});
  }
});

app.listen(port, () => {
  console.log(`API Gateway is running on http://localhost:${port}`);
});