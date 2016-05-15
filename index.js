var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 720;
canvas.height = 480;
canvas.addEventListener('click', handleClick);

var cellSize = 10;
var cells = [];
// var lifeCollection = [
//   [10,24],[11,24],[12,24],[13,24],[14,24],[15,24],[16,24],[17,24],
//   [19,24],[20,24],[21,24],[22,24],[23,24],[27,24],[28,24],[29,24],
//   [36,24],[37,24],[38,24],[39,24],[40,24],[41,24],[42,24],[44,24],
//   [45,24],[46,24],[47,24],[48,24],
// ];

var gameSpeed;
var started = false;
var popStat = document.getElementById('stats');
var stats = {
  population: 0,
  generation: 0
}

// ------------------------------------------------------------------------------------------------------------------------

function setSpeed(timer) {
  timer = document.getElementById('timer').value;

  return timer;
}

function startBtn() {
  if(!started) {
    document.getElementById('start').innerHTML = "Pause";
    started = true;
    gameSpeed = setInterval(function() {update();}, setSpeed(timer));
  }
  else {
    document.getElementById('start').innerHTML = "Resume";
    clearInterval(gameSpeed);
    started = false;
  }
}

function clearBtn() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < canvas.width; i++) {
    cells[i] = [];
    for(var j = 0; j < canvas.height; j++) {
      cells[i][j] = 0;
      ctx.beginPath();
      ctx.rect(i*cellSize, j*cellSize, cellSize, cellSize);
      ctx.stroke();

    }
  }
  clearInterval(gameSpeed);
  started = false;
  stats.population = 0;
  stats.generation = 0;
  document.getElementById('start').innerHTML = "Start";
  popStat.innerHTML = "Population: " + stats.population + "<br>" + "Generation: " + stats.generation;
}

function drawGrid() {
  ctx.fillStyle = "#00ff00";
  ctx.strokeStyle = "#d3d3d3";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < canvas.width; i++) {
    for(var j = 0; j < canvas.height; j++) {
      ctx.beginPath();
      ctx.rect(i*cellSize, j*cellSize, cellSize, cellSize);
      if(cells[i][j] === 1) {
        ctx.fill();
      }
      else {
        ctx.stroke();
      }
    }
  }
}

// ------------------------------------------------------------------------------------------------------------------------------------

function getNeighbors(x, y) {
  var neighbors = 0;
  var gridWrap = (x > 0 && y > 0 && x < canvas.width /cellSize -1 && y < canvas.height /cellSize -1);
  // Grid wrap
  if(gridWrap) {
    if(cells[x-1][y]) {
      neighbors++;
    }
    if(cells[x+1][y]) {
      neighbors++;
    }
    if(cells[x][y+1]) {
      neighbors++;
    }
    if(cells[x][y-1]) {
      neighbors++;
    }
    if(cells[x-1][y+1]) {
      neighbors++;
    }
    if(cells[x-1][y-1]) {
      neighbors++;
    }
    if(cells[x+1][y+1]) {
      neighbors++;
    }
    if(cells[x+1][y-1]) {
      neighbors++;
    }
  }
  return neighbors;
}

function handleClick(e) {
  if(!started) {
    var mouseX = (Math.floor(e.offsetX/cellSize));
    var mouseY = (Math.floor(e.offsetY/cellSize));
    ctx.fillRect(mouseX * cellSize, mouseY * cellSize, cellSize, cellSize);

    if(cells[mouseX][mouseY]) {
      cells[mouseX][mouseY] = 0;
    }
    else {
      cells[mouseX][mouseY] = 1;
    }
  }
}

function checkRules() {
  stats.population = 0;
  cellStorage = [];

  for(var x = 0; x < cells.length; x++) {
    cellStorage[x] = [];
    for(var y = 0; y < cells[x].length; y++) {
      cellStorage[x][y] = cells[x][y];
      var life = getNeighbors(x, y);

      if(life < 2 || life > 3) {
        cellStorage[x][y] = 0;
      }
      else if(life === 3) {
        cellStorage[x][y] = 1;
      }

      if(cellStorage[x][y]) {
        stats.population++;
      }
    }

  }
  cells = cellStorage;
  stats.generation++;
  drawGrid();
}

function update () {
  checkRules();
  popStat.innerHTML = "Population: " + stats.population + "<br>" + "Generation: " + stats.generation;
}


(function initializeLife() {
  for (var i = 0; i < canvas.width; i++) {
    cells[i] = [];
    for(var j = 0; j < canvas.height; j++) {
      cells[i][j] = 0;
    }
  }
  // for (var x = 0; x < lifeCollection.length; x++) {
  //   cells[lifeCollection[x][0]][lifeCollection[x][1]] = 1;
  // }
  // update();
}());
