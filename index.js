// Required modules 
const express = require("express");
const app = express();
const dblib = require("./dblib.js");

const multer = require("multer");
const upload = multer();

// Add middleware to parse default urlencoded form
app.use(express.urlencoded({ extended: false }));

// Setup EJS
app.set("view engine", "ejs");

// Enable CORS (see https://enable-cors.org/server_expressjs.html)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Application folders
app.use(express.static("public"));

// Start listener
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started (http://localhost:3000/) !");
});

// Setup routes
app.get("/", (req, res) => {
    //res.send("Root resource - Up and running!")
    res.render("index");
});

// App Get Method template
// app.get("/manage", (req, res) => {
//     res.render("manage");
// });

app.get("/manage", async (req, res) => {
    // Omitted validation check
    const totRecs = await dblib.getTotalRecords();
    res.render("manage", {
        totRecs: totRecs.totRecords,
    });
});

app.post("/manage", upload.array(), async (req, res) => {
    dblib.findCustomers(req.body)
        .then(result => res.send(result))
        .catch(err => res.send({trans: "Error", result: err.message}));

});

app.get("/create", (req, res) => {
    res.render("create");
});

app.get("/delete", (req, res) => {
    res.render("delete");
});

app.get("/report", (req, res) => {
    res.render("report");
});

app.post("/report", async (req, res) => {
    dblib.sortLnameFname(req.body)
        .then(result => res.send(result))
        .catch(err => res.send({trans: "Error", result: err.message}));
    dblib.sortDecSales(req.body)
        .then(result => res.send(result))
        .catch(err => res.send({trans: "Error", result: err.message}));
    dblib.sortThreeRand(req.body)
        .then(result => res.send(result))
        .catch(err => res.send({trans: "Error", result: err.message}));
});

app.get("/import", async (req, res) => {
    const totRecs = await dblib.getTotalRecords();
    res.render("import", {
        totRecs: totRecs.totRecords,
    });
});

app.post("/import",  upload.single('filename'), (req, res) => {
    if(!req.file || Object.keys(req.file).length === 0) {
        message = "Error: Import file not uploaded";
        return res.send(message);
    };
    //Read file line by line, inserting records
    const buffer = req.file.buffer; 
    const lines = buffer.toString().split(/\r?\n/);

    lines.forEach(line => {
         //console.log(line);
         customer = line.split(",");
         //console.log(customer);
         const sql = "INSERT INTO CUSTOMER(cusId, cusFname, cusLname, cusState, cusSalesYTD, cusSalesPrev) VALUES ($1, $2, $3, $4, $5, $6)";
         pool.query(sql, customer, (err, result) => {
             if (err) {
                 console.log(`Insert Error.  Error message: ${err.message}`);
             } else {
                 console.log(`Inserted successfully`);
             }
        });
    });
    message = `Processing Complete - Processed ${lines.length} records`;
    res.send(message);
});

app.get("/export", async (req, res) => {
    const totRecs = await dblib.getTotalRecords();
    var message = "";
    res.render("export", {
        totRecs: totRecs.totRecords,
        message: message,
    });
});

app.post("/export", async(req, res) => {
    dblib.exportFile(req.body)
        .then(result => res.send(result))
        .catch(err => res.send({trans: "Error", result: err.message}));
});

