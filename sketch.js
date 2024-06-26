let pc;
let targetEnemies = [];
let bulletsFired = [];
let debug = true;
let sizeMultiplier = 2;
let spawnMultiplier = 1;
let targetTimer = 0; 
let loopCycle = false;
let gameState = "running";
let characterMenu = new Menu(10,10,200,200,[]);
let shopMenu = new Menu(10,10,200,200,[]);
let mainMenu;
let openMenu = null; 

function getMouseVector(){
	let mouseXalt = mouseX - pc.x;
	let mouseYalt = mouseY - pc.y;
	let mouseDir = createVector(mouseXalt, mouseYalt);
	mouseDir.normalize();
	return mouseDir;
}

function setup() {
  createCanvas(600, 600);
  mainMenu = new Menu(width - 145, 10, 140, 200, []);
  pc = new player();
  deb = new debugScreen();
  Retry = createButton('retry');
	Retry.hide();
  frameRate(120);
  createMainUi();
  let newBalloon = new enemy(10,10);
  targetEnemies.push(newBalloon);
}

//function mousePressed() {
//  pc.shoot();
//}

function spawnEnemy() {
  let newBalloon = new enemy(10,10);
  targetEnemies.push(newBalloon);
}

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
  
  if (gameState === "menu" && openMenu != null) {
    //console.log(openMenu)
    let elem = openMenu.interact(mouseX, mouseY);
    if (elem != null) 
      elem.mousePress(mouseIsPressed, mouseButton);
    if (openMenu != null) openMenu.draw();
  }

  if (gameState === "running") {
    targetTimer += 1;
    //let spawnInterval = int(100 / spawnMultiplier);
    //print(spawnInterval)
    //if (targetTimer % spawnInterval == 0){
    //  let newBalloon = new enemy(10,10);
    //  targetEnemies.push(newBalloon);
      
    //}


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
      //sizeMultiplier += 0.001;
    }

    if(pc.shield != null) {
      pc.shield.display();
      pc.shield.update();
      pc.shield.hitScan();
    }

    pc.update();
    pc.display();
    pc.move();
    if(pc.hitScan()) {
      if(pc.isDead()){
        gameOver()
      }
      //pc.takeDamage();
    }



    let melem = mainMenu.interact(mouseX, mouseY);
    if (melem != null) {
      melem.mousePress(mouseIsPressed, mouseButton)
    }
    mainMenu.draw();
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
          Player Level: ${pc.level},
          Shield HP: ${pc.shield.hp}
        `,0, height - 100) 
    }
    pop();
  }
}

function gameOver(){
	push()
	
	print("DED");
	noStroke();
	fill(20)
	rect(0,200,600,200)
	
	textFont('Georgia');
	textAlign(CENTER);
	textSize(50);
	fill(170,20,20);
	text("YOU DIED",300,300)
		
	textFont('Helvetica');
	textSize(18);
	fill(235);
	//let scoreString = "score: " + score;
	//text(scoreString, 300, 340);
	
	//if (score > highScore) {
//		highScore = score;
	//	Cookies.remove('highscore');
	//	Cookies.set('highscore', highScore);
	//}
	
	//let highScoreString = "highscore: " + highScore;
	//text(highScoreString, 300, 360);
	
	Retry.show();
	Retry.position(250, 380);
	Retry.size(100,30);
	Retry.style('background-color', '#202020');
	Retry.style('color', '#FFFFFF');
	Retry.mousePressed(reset);
	
	pop();
	noLoop();
	
}

function reset(){
	Retry.hide();
	bulletsFired = [];
	targetEnemies = [];
	pc.x = width /2;
	pc.y = height/2;
	targetTimer = 0;
  pc = new player();
	//balloonSpawnMultiplier = 2;
	//balloonSizeMultiplier = 2;
	//score = 0;
	
	loop();
}


