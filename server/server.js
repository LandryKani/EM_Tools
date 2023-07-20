const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

const db = require("./models");
const Role = db.role;
//{force: true}
db.sequelize.sync().then(() => {
  // console.log('Drop and Resync Db');
  // initial();
  console.log("Sync DB");
});
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DevLand application." });
});

function initial() {
  Role.create({
    id: 1,
    name: "employe",
  });

  Role.create({
    id: 2,
    name: "director",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// routes
require("../server/routes/auth.routes")(app);
require("../server/routes/employe.routes")(app);
require("../server/routes/entreprise.routes")(app);
require("../server/routes/manageProject.routes")(app);

// app.listen(3005, ()=>{console.log("server started on port 3005")})
