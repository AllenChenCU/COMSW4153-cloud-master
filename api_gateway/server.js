const passport = require('../Authentication/auth.js');
const express = require('express');
const session = require('express-session');
const axios = require("axios");
const cors = require('cors');
const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

const COMPOSITE_SERVICE_URL = "https://comsw4153-cloud-composite-service-973496949602.us-central1.run.app";
app.use(express.json());
app.use(cors({
  origin: "*", 
  credentials: true
}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


function validateAuthHeader(req, res, next){
  const token = req.headers['authorization']?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing or invalid.' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }
    req.user = decoded; 
    req.token = token;
    next();
  });
}

//example:
//curl "http://localhost:3000/query-routes-and-stations?source=Columbia%20University&destination=John%20F.%20Kennedy%20International%20Airport&user_id=123"
//output:
//{"routes":[{"bounds":{"northeast":{"lat":40.808134,"lng":-73.7893588},"southwest"...
app.get("/query-routes-and-stations", validateAuthHeader, async(req, res) =>{
  try{
    const { source, destination, user_id } = req.query;

    const response = await axios.get(`${COMPOSITE_SERVICE_URL}/protected-query-routes-and-stations/`,{
      params: {source, destination, user_id},
      headers:{
        'Authentication': `Bearer ${req.token}`
      }
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
app.post("/save-route", validateAuthHeader, async(req, res) => {
  try{
    const response = await axios.post(`${COMPOSITE_SERVICE_URL}/protected-save-route/`, req.body,{
      headers: {
        "Content-Type": "application/json", 
        'Authentication': `Bearer ${req.token}`
      }
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
app.put('/unsave-route', validateAuthHeader, async(req, res) => {
  const { route_id } = req.query;
  try{
    console.log("Unsaving route with ID: ", route_id);
    const response = await axios.put(`${COMPOSITE_SERVICE_URL}/protected-unsave-route/`, null,{
      params: {route_id},
      headers:{
        'Authentication': `Bearer ${req.token}`
      }
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
app.get("/get-saved-routes-and-stations", validateAuthHeader, async (req, res) => {
  try{
    const { user_id } = req.query;
    const response = await axios.get(`${COMPOSITE_SERVICE_URL}/protected-get-saved-routes-and-stations/`, {
      params: {user_id},
      headers:{
        'Authentication': `Bearer ${req.token}`
      }
    });
    res.status(response.status).json(response.data);
  } catch(error){
    console.error(error);
    res.status(500).json({error: "Failed to get saved routes and stations."});
  }
});

//example:
//curl "http://localhost:3000/query-all-routes-by-user?user_id=123&limit=10&page=1"
//output:
//{"routes":[{"id":13,"origin":"Columbia University","destination":"John F. Kennedy International Airport"...
app.get("/query-all-routes-by-user", validateAuthHeader, async (req, res) => {
  try {
    const {user_id, limit, page} = req.query;
    const response = await axios.get(`${COMPOSITE_SERVICE_URL}/protected-query-all-routes-by-user/`,{
      params: {user_id, limit, page},
      headers:{
        'Authentication': `Bearer ${req.token}`
      }
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