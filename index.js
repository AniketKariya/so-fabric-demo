const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname + "/build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/save-image", (req, res) => {
    const image = req.body.image
    
    fs.readFile('images.json', function (err, data) {
        if(err) {
            console.log(err)
            res.status(500)
        }
        
        var json = JSON.parse(data)
        json.push({id: json.length, image})
    
        fs.writeFile("images.json", JSON.stringify(json), (err, result) => {
            if(err) console.log(err);
        })
    })

    res.status(200);
})

app.get("/get-images", (req, res) => {
    res.json(JSON.parse(fs.readFileSync("./images.json")))
})

app.listen(PORT, () => {
    console.log(`up and running on port ${PORT}`);
})