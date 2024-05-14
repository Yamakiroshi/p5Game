class player {
    constructor() {
      this.maxHp = 10;
      this.hp = this.maxHp;
      this.xp = 0;
      this.xpConst = 2.6
      this.level = 1; 
      this.targetXp = Math.pow(this.level, this.xpConst);
      this.skills = [];
      this.weapon = new basicWeapon(); 
      this.x = width /2 ; 
      this.y = height/2 ;
    }
  
    update() {
        this.levelUp()
    }
  
    levelUp() {
        if (this.xp >= this.targetXp) {
            this.level += 1;
            //this.targetXp = Math.pow(this.level, this.xpConst);
            this.targetXp = (Math.pow(this.level,2)+this.level)/2*100-(this.level*100)
        }
    }
  
    display() {
      push()
      stroke("black");
      fill("yellow");
      ellipse(this.x, this.y, 30);
      pop();
    }
  
    shoot() {
      this.weapon.fire();
    }
  
    move() {
      if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && this.x > 5) {
        this.x -= 2;
      }
      if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && this.x < width - 5) {
        this.x += 2;
      }
      if ((keyIsDown(87) || keyIsDown(UP_ARROW)) && this.y > 5) {
        this.y -= 2;
      }
      if ((keyIsDown(83) || keyIsDown(DOWN_ARROW)) && this.y < height - 5) {
        this.y += 2;
      }
    }
    gainExp(exp) {
      this.xp += exp;
    }
  }