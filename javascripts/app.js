// Rover Object Goes Here
// ======================
var rover = 
{
  direction: "N",
  x: 0,
  y: 0,
  travelLog: ["(0,0)"]
}
// ======================

// Function to generate Rovers
function Rover(direction, x, y) {
  this.direction = direction;
  this.x = x;
  this.y = y;
  this.travelLog = ["(" + this.x + "," + this.y + ")"];
}

// Change to add or remove obstacles (0)
const numObstacles = 3;
// Change to add or remove additional rovers (0)
const numRovers = 2;

const roverGrid = new Array(10);

var roverList = [rover];

function initGrid () {
  // Generate empty two dimensional array
  for (i = 0; i < roverGrid.length; i++) {
    roverGrid[i] = new Array(10).fill(null);
  }
  // Position original rover in (0,0)
  roverGrid[rover.x][rover.y] = rover;
  console.log(roverGrid);

  // Add obstacles to grid
  addObstacles(numObstacles);
  // Add additional rovers
  addRovers(numRovers);
}

// Executes on start up
initGrid();

function turnLeft(rover){
  console.log("turnLeft was called!");
  console.log("The Rover is currently facing: " + rover.direction);
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "W": 
      rover.direction = "S";
      break;
    case "S": 
      rover.direction = "E";
      break;
    case "E": 
      rover.direction = "N";
  }
  console.log("Rover turns left to face: " + rover.direction);
}

function turnRight(rover){
  console.log("turnRight was called!");
  console.log("The Rover is currently facing: " + rover.direction);
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "E": 
      rover.direction = "S";
      break;
    case "S": 
      rover.direction = "W";
      break;
    case "W": 
      rover.direction = "N";
  }
  console.log("Rover turns right to face: " + rover.direction);
}

function moveForward(rover){
  console.log("moveForward was called");
  console.log("Initial rover position: (" + rover.x + "," + rover.y + ")");
  var newX = rover.x;
  var newY = rover.y;
  switch (rover.direction) {
    case "N":
      newY++;
      break;
    case "E":
      newX++;
      break;
    case "S": 
      newY--;
      break;
    case "W": 
      newX--;
  }
  setNewPosition(rover, newX, newY);
}

function moveBackward(rover){
  console.log("moveBackward was called");
  console.log("Initial rover position: (" + rover.x + "," + rover.y + ")");
  var newX = rover.x;
  var newY = rover.y;
  switch (rover.direction) {
    case "N":
      newY--;
      break;
    case "E":
      newX--;
      break;
    case "S": 
      newY++;
      break;
    case "W": 
      newX++;
  }
  setNewPosition(rover, newX, newY);
}

function moveRover(command) {
  for (i = 0; i < command.length; i++) {
    console.log("Current command: " + command[i]);
    console.log("Next command: " + command[i+1]);
      switch (command[i]) {
        case "f":
          moveForward(rover);
          break;
        case "b":
          moveBackward(rover);
          break;
        case "r":
          turnRight(rover);
          break;
        case "l":
          turnLeft(rover);
          break;
        default:
          console.log("Skip unrecognized command.");
      }
  }
  console.log("travelLog: " + rover.travelLog);
}

/** Validates position by checking
 * whether the rover is within the grid
 * and there are no obstacles or other rovers
 */ 
function isValidPosition (x, y) {
  if (x < 0 || x > 9 || y < 0 || y > 9 ) {
    console.log("Can't move. Rover off-grid.");
    return false;
  }
  if (roverGrid[x][y] == 'O') {
    console.log("Can't move. Obstacle found.");
    return false;
  }
  if (roverGrid[x][y] != null) {
    console.log("Can't move. Another rover found.");
    return false;
  }
  return true;
}

/** Removes object from former positions
 * and places it on new position if the
 * position is valid
 */
function setNewPosition (rover, newX, newY) {
  if (isValidPosition(newX,newY)) {
    roverGrid[rover.x][rover.y] = null; // removes rover from former position
    rover.x = newX;
    rover.y = newY;
    rover.travelLog.push("(" + rover.x + "," + rover.y + ")");
    console.log("Current rover position: (" + rover.x + "," + rover.y + ")");
    roverGrid[rover.x][rover.y] = rover; // places rover on new position
  }
}

function getRandomCoord(){
  return Math.floor(Math.random() * 10);
}

function getRandomDir(){
  var dir = Math.floor(Math.random() * 4);
  switch (dir) {
    case 0:
      return 'N';
    case 1: 
      return 'E';
    case 2: 
      return 'S';
    case 3:
      return 'W';
  }
}

function addObstacle () {
  var obstacleSet = false;
  do {
    var coordX = getRandomCoord();
    var coordY = getRandomCoord();
    if (roverGrid[coordX][coordY] == null) {
      roverGrid[coordX][coordY] = 'O';
      obstacleSet = true;
    }
  } while (!obstacleSet);
  console.log("Obstacle set in: " + coordX + "," + coordY);
}

function addObstacles (n) {
  for (i = 0; i < n; i++) {
    addObstacle();
  }
}

function createRover () {
  var direction = getRandomDir();
  var coordX;
  var coordY;

  var roverSet = false;
  do {
    var coordX = getRandomCoord();
    var coordY = getRandomCoord();
    if (roverGrid[coordX][coordY] == null) {
      roverSet = true;
    }
  } while (!roverSet);

  return new Rover(direction,coordX,coordY);
}

function addRovers (n) {
  for (i = 0; i < n; i++) {   
    var newRover = createRover();
    roverList.push(newRover);
    roverGrid[newRover.x][newRover.y] = newRover;
    console.log("Additional rover set in: " + newRover.x + "," + newRover.y);
  }
}