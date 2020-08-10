//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {

    res.render("home");

});
function addBorder(x) {
    x.style.border = "thick solid blue";
}
function printTheBoard(board, order) {
    var str = "";
    for (var i = 0; i < order; ++i) {
        str = "";
        for (var j = 0; j < order; ++j) {
            str = str + board[i][j] + " ";
        }
        console.log(str + "\n");
    }
    console.log("\n");
}
function canPlace(board, n, row, col, curNum) {

    if (board[row][col] != 0) {
        return false;
    }

    for (var i = 0; i < n; ++i) {
        if (board[i][col] === curNum) {
            return false;
        }
        if (board[row][i] === curNum) {
            return false;
        }
    }
    for (var i = parseInt(Math.sqrt(n)) * parseInt((row / Math.sqrt(n))); i < parseInt(Math.sqrt(n)) * parseInt((row / Math.sqrt(n))) + parseInt(Math.sqrt(n)); ++i) {
        for (var j = parseInt(Math.sqrt(n)) * parseInt((col / Math.sqrt(n))); j < parseInt(Math.sqrt(n)) * parseInt((col / Math.sqrt(n))) + parseInt(Math.sqrt(n)); ++j) {
            if (board[i][j] === curNum) {
                return false;
            }
        }
    }
    return true;
}
function solveUtil(board, n, row, col) {

    if (row === n) {
        return true;
    }
    if (col === n) {
        return solveUtil(board, n, row + 1, 0);
    }
    if (board[row][col] != 0) {
        return solveUtil(board, n, row, col + 1);
    }

    for (var curNum = 1; curNum <= n; ++curNum) {
        if (canPlace(board, n, row, col, curNum) === true) {
            board[row][col] = curNum;
            var success = solveUtil(board, n, row, col + 1);
            if (success === true) {
                return true;
            }
            board[row][col] = 0;
        }
    }

    return false;
}
function solve(board, n) {
    return solveUtil(board, n, 0, 0);
}
app.post("/result", function (req, res) {

    // var board = new Array(3);
    // for (var i = 0; i < 3; ++i) {
    //     board[i] = [];
    // }

    // for (var x = "0"; x < "9"; ++x)
    //     console.log(req.body[x] + "\n");
    // console.log(req.body.order);

    var order = req.body.order;

    var board = new Array(order);
    for (var i = 0; i < Number(order); ++i) {
        board[i] = [];
    }
    var x = "0";
    for (var i = 0; i < Number(order); ++i) {
        for (var j = 0; j < Number(order); ++j) {
            board[i][j] = Number(req.body[x++]);
        }
    }
    var valid = true;
    for (var i = 0; i < Number(order); ++i) {
        for (var j = 0; j < Number(order); ++j) {
            if (board[i][j] > Number(order)) {
                valid = false;
                break;
            }
        }
    }

    if (valid && solve(board, Number(order)) === true) {
        printTheBoard(board, order);
        res.render("success", {
            arr: board
        });
    }
    else {
        res.render("fail");
    }
});
app.get("/3into3", function (req, res) {
    res.render("NXN", {
        n: 3
    });
});

app.get("/9into9", function (req, res) {
    res.render("NXN", {
        n: 9
    });
});

app.get("/12into12", function (req, res) {
    res.render("NXN", {
        n: 12
    });
});





app.listen(3000, function (req, res) {
    console.log("Server has started at port number : 3000");
});