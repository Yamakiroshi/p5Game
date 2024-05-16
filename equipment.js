class equipment {
    constructor(name, description, purchasePrice){
        this.name = name;
        this.description = description;
        this.purchasePrice = purchasePrice;
    }
    applyEffect() {
        return null;
    }
}

class shield extends equipment {
    constructor() {
        super("Shield", "Protects the Player from Enemies", 100)
        this.hp = 100
        this.maxHp = 100
        this.r = 40;
        this.enabled = true;
        this.cooldown = 500;
        this.lastActiveFrame = 0;
        this.strength = 1;
    }

    display() {
        if(this.enabled) {
        push();
        stroke(0,0,175);
        fill(0,0,225);
        ellipse(pc.x, pc.y, this.r);
        pop();
        }
    }

    update() {
        if (this.hp <= 0) {this.enabled = false};
        if (frameCount - this.lastActiveFrame >= this.cooldown && this.enabled === false) {
            this.lastActiveFrame = frameCount;
            this.enabled = true;
            this.hp = this.maxHp;

        }
    }


    hitScan(){
        for (var i = 0; i < targetEnemies.length; i++){
            var collideOrNot = collideCircleCircle(pc.x, pc.y, this.r, targetEnemies[i].myX(), targetEnemies[i].myY(), targetEnemies[i].myR())
            //console.log(collideOrNot)
            //console.log(targetEnemies[i].myX(),targetEnemies[i].myY());
            if (collideOrNot && this.enabled === true) {
                if (targetEnemies[i].x > pc.x) targetEnemies[i].x += 1 ;
                if (targetEnemies[i].x < pc.x) targetEnemies[i].x -= 1 ;
                if (targetEnemies[i].y > pc.y) targetEnemies[i].y -= 1 ;
                if (targetEnemies[i].y > pc.y) targetEnemies[i].y += 1 ;
                this.hp -= (targetEnemies[i].damage - this.strength)
            }
        }
        return false;
      }
}