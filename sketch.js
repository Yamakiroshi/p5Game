let pc;
let targetEnemies = [];
let bulletsFired = [];
let debug = true;
let sizeMultiplier = 2;
let spawnMultiplier = 1;
let targetTimer = 0; 
let loopCycle = false;
let gameState = "running";

function getMouseVector(){
	let mouseXalt = mouseX - pc.x;
	let mouseYalt = mouseY - pc.y;
	let mouseDir = createVector(mouseXalt, mouseYalt);
	mouseDir.normalize();
	return mouseDir;
}

function setup() {
  createCanvas(600, 600);
  pc = new player();
  deb = new debugScreen();
  frameRate(120);
  createMainUi();
}

//function mousePressed() {
//  pc.shoot();
//}


function keyPressed() {
  if (key === 'h') {
    if (debug) {
      debug = false;
    } else {
      debug = true;
    }
  }

  if (key === 'l' && debug === true) {
    if (loopCycle == false) {
      loop()
      loopCycle = true
    } else {
      noLoop();
      loopCycle = false;
    }
  }
}

function draw() {
  background(220);
  let fc = frameCount % 120;
  //console.log(fc);
  deb.display();
  if (gameState === "running") {
    targetTimer += 1;
    let spawnInterval = int(100 / spawnMultiplier);
    //print(spawnInterval)
    if (targetTimer % spawnInterval == 0){
      let newBalloon = new enemy(10,10);
      targetEnemies.push(newBalloon);
      
    }


    if(mouseIsPressed) {
      //console.log(fc % pc.weapon.attackSpeed);
      if (fc % pc.weapon.attackSpeed == 1) {
        //console.log("Fire")
        pc.shoot();
      }
      
    }

    for (var i = 0; i < bulletsFired.length; i++){
      bulletsFired[i].display();
      bulletsFired[i].update();
      if (bulletsFired[i].outOfBounds()){
            bulletsFired.splice(i,1);
        }
      else if (bulletsFired[i].hitScan()){
            bulletsFired.splice(i,1);
        }
    }

    for (var i = 0; i < targetEnemies.length; i++){
      targetEnemies[i].display();
      targetEnemies[i].update();
      if (targetEnemies[i].outOfBounds()){
        targetEnemies.splice(i,1);
        }
    }
    
    spawnMultiplier += 0.001;
    if (sizeMultiplier < 5){
      sizeMultiplier += 0.001;
    }

    pc.update();
    pc.display();
    pc.move();
  }
}

class debugScreen {
  constructor() {

  }
  display() {
    push()
    if (debug) {
      text(
        ` 
          Player Health: ${pc.hp}, 
          Player XP: ${pc.xp},
          Player Target XP: ${pc.targetXp},
          Player Level: ${pc.level}
        `,0, height - 100) 
    }
    pop();
  }
}




