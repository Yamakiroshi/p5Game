class weapon {
    constructor(baseDamage, attackSpeed, bulletSpeed, bulletSize, bulletColour)
    {
      this.baseDamage = baseDamage;
      this.attackSpeed = attackSpeed;
      this.bulletSpeed = bulletSpeed;
      this.bulletSize = bulletSize;
      this.bulletColour = bulletColour;
      this.level = 1; 
      this.xp = 0; 
    }
  
    fire() {
        let mouseVector = getMouseVector();
        let oneBullet = new bullet(mouseVector.x, mouseVector.y, this.calculateSpeed(), this.bulletColour, this.calculateDamage(),this.calculateSize() )
        bulletsFired.push(oneBullet);
    }

    calculateDamage() {
        return this.baseDamage + (this.baseDamage * (this.level / 100)); 
    }
    calculateSpeed() {
        return this.bulletSpeed + (this.bulletSpeed * (this.level / 100));
    }

    calculateSize() {
        return this.bulletSize + (this.bulletSize * (this.level / 100));
    }
  }
  
  class bullet {
    constructor(xloc, yloc, speed, colour, damage,size) {
      this.x = pc.x;
      this.y = pc.y;
      this.speed = speed;
      this.xSpeed = speed * xloc
      this.ySpeed = speed * yloc
      this.colour = colour;
      this.damage = damage;
      this.size = size;
    }
  
    display (){
      push();
      stroke("black");
      fill(this.colour);
      ellipse(this.x, this.y, this.size);
      pop();
    }
  
    update(){
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      //this.xSpeed *= 0.994;
      //this.ySpeed *= 0.994;
    }
  
    outOfBounds() {
      return(this.x > width + 10 || this.x < -10 || this.y > height + 10 || this.y < -10);
    }
  
    hitScan(){
      for (var i = 0; i < targetEnemies.length; i++){
        var collideOrNot = collideCircleCircle(this.x, this.y, this.size, targetEnemies[i].myX(), targetEnemies[i].myY(), targetEnemies[i].myR())
        if (collideOrNot) {
          targetEnemies[i].takeDamage(this.damage)
          if(targetEnemies[i].isDead()) {
            pc.gainExp(targetEnemies[i].expDrop())
            targetEnemies.splice(i,1);
            return true;
          }
        }
      }
      return false;
    }
  }
  
  class basicWeapon extends weapon {
    constructor() {
      super(1,10,3,5,"blue")
    }
  }