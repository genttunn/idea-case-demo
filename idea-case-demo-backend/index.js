var express = require("express");
var app = express();
const filePath = __dirname + "/" + "categories.json";
var fs = require("fs");
var jsonfile = require("jsonfile");
var FuzzySearch = require("fuzzy-search");
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const logAll = require("./testing.js");
logAll();

app.use(function(req, res, next) {
  "use strict";
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/hello", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World from Node.js Back-end at " + __dirname);
  console.log(__dirname);
});

var server = app.listen(7000, function() {
  "use strict";
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

app.get("/test5", (req, res) => {
  const categoryInput = {
    id: 9,
    name: "VIP",
    budget: 1050
  };
  addCategory(res, categoryInput, filePath);
});

/////////////////////////END OF BOILERPLATE CODE\\\\\\\\\\\\\\\\\\\\\\

/// 1 GET ALL
app.get("/category/alljson", (req, res) => {
  jsonfile
    .readFile(filePath)
    .then(data => {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(data));
    })
    .catch(() => res.end("failed"));
});

app.get("/category/allfs", (req, res) => {
  fs.readFile(__dirname + "/" + "categories.json", "utf8", function(err, data) {
    res.end(data);
  });
});

/// 2 ADD CATEGORY

app.post("/category/add", (req, res) => {
  const category = {
    id: req.body.id,
    name: req.body.name,
    budget: req.body.budget
  };
  checkCategory(res, category, filePath);
});
/*Check logic : check if id and budget are numbers (must be both numbers), then check if id already exists (must not), then add category */
function checkCategory(res, category, filePath) {
  jsonfile
    .readFile(filePath)
    .then(obj => {
      if (
        isNaN(category.id) ||
        isNaN(category.budget) ||
        category.budget <= 0
      ) {
        /// CHECK FAILED
        res.writeHead(423, { "Content-Type": "text/plain" });
        res.end("Wrong input");
      } else if (!checkId(category, obj)) {
        //// CHECK PASSED
        category.budget = Number(category.budget);
        addCategory(res, category, filePath);
      } else {
        res.writeHead(422, { "Content-Type": "text/plain" }); /// CHECK FAILED
        res.end("ID already exists");
      }
    })
    .catch(() => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Reading check server side JSON file failed.");
    });
}

function checkId(item, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === item.id) {
      return true;
    }
  }
  return false;
}

function addCategory(res, category, filePath) {
  jsonfile
    .readFile(filePath)
    .then(obj => {
      obj.push(category);
      return obj;
    })
    .then(obj => {
      jsonfile.writeFile(filePath, obj);
      return obj;
    })
    .then(obj => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(obj));
    })
    .catch(() => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Reading or Writing server side JSON file failed.");
    });
}

/// 3 DELETE CATEGORY

app.post("/category/delete", (req, res) => {
  const category = {
    id: req.body.id,
    name: req.body.name,
    budget: req.body.budget
  };
  deleteCategory(res, category, filePath);
});

function deleteCategory(res, category, filePath) {
  jsonfile
    .readFile(filePath)
    .then(list => {
      list = [...list.filter(obj => obj.id !== category.id)];
      return list;
    })
    .then(obj => {
      jsonfile.writeFile(filePath, obj);
      return obj;
    })
    .then(obj => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(obj));
    })
    .catch(() => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Reading or Writing server side JSON file failed.");
    });
}

/// 4 EDIT CATEGORY

app.post("/category/edit", (req, res) => {
  const category = {
    id: req.body.id,
    name: req.body.name,
    budget: req.body.budget
  };
  category.budget = Number(category.budget);
  if (!category.name || !category.budget) {
    res.writeHead(422, { "Content-Type": "text/plain" });
    res.end("Invalid input");
  } else if (category.budget < 0) {
    res.writeHead(423, { "Content-Type": "text/plain" });
    res.end("Invalid budget");
  } else {
    editCategory(res, category, filePath);
  }
});

function editCategory(res, category, filePath) {
  jsonfile
    .readFile(filePath)
    .then(list => {
      itemOld = list.find(obj => obj.id === category.id);
      let newList = [...list];
      let index = newList.indexOf(itemOld);
      newList[index].name = category.name;
      newList[index].budget = category.budget;
      return newList;
    })
    .then(obj => {
      jsonfile.writeFile(filePath, obj);
      return obj;
    })
    .then(obj => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(obj));
    })
    .catch(() => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Reading or Writing server side JSON file failed.");
    });
}

/// 5 SEARCH CATEGORY

app.post("/category/search", (req, res) => {
  const criteria = {
    name: req.body.name,
    budget: Number(req.body.budget),
    isAbove: Number(req.body.isAbove)
  };
  searchCategory(res, criteria, filePath);
});

function searchCategory(res, criteria, filePath) {
  jsonfile
    .readFile(filePath)
    .then(list => {
      result = [];
      switch (criteria.isAbove) {
        case 0: //Equal
          result = [...list.filter(item => item.budget == criteria.budget)];
          break;
        case 1: //Above
          result = [...list.filter(item => item.budget >= criteria.budget)];
          break;
        case 2: //Below
          result = [...list.filter(item => item.budget < criteria.budget)];
          break;
        case 3: //String name
          const searcher = new FuzzySearch(list, ["name"]);
          result = searcher.search(criteria.name);
      }
      return result;
    })
    .then(result => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    })
    .catch(() => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Reading or Writing server side JSON file failed.");
    });
}
