class player {
    constructor() {
      // Character Stats
      this.maxHp = 10;
      this.hp = this.maxHp;
      this.defence = 1;
      this.xp = 0;
      this.level = 1;
      this.skills = [];
      this.weapon = new basicWeapon();
      this.shield = new shield;
      this.gold   = 0;
      
      // Character Game  
      this.xpConst = 2.6 
      this.targetXp = Math.pow(this.level, this.xpConst); 
      this.x = width /2 ; 
      this.y = height/2 ;
      this.r = 30;
    }


    update() {
        this.levelUp()
    }
  
    levelUp() {
        if (this.xp >= this.targetXp) {
            this.level += 1;
            //this.targetXp = Math.pow(this.level, this.xpConst);
            this.targetXp = (Math.pow(this.level,2)+this.level)/2*100-(this.level*100)
            let origMax = this.maxHp;
            this.maxHp += (Math.pow(this.level,2)+this.level)/2*100-(this.level*100)
            this.hp += this.maxHp - origMax
        }
    }
  
    display() {
      push()

      /*this.equipment.forEach((equip)=>{
        equip.display();
      })*/
      stroke("black");
      fill("yellow");
      ellipse(this.x, this.y, this.r);
      
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
    hitScan(){
      for (var i = 0; i < targetEnemies.length; i++){
          var collideOrNot = collideCircleCircle(pc.x, pc.y, this.r, targetEnemies[i].myX(), targetEnemies[i].myY(), targetEnemies[i].myR())
          if (collideOrNot) {
              this.hp -= (targetEnemies[i].damage - this.defence)
              return true;
          }
      }
      return false;
    }
    isDead(){
      if(pc.hp <= 0) {
        return true;
      }
      return false;
    }
    gainExp(exp) {
      this.xp += exp;
    }
  }