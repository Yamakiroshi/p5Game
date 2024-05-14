class enemy{
    constructor(health,xp) {
        this.side = int(random(4)); 
        switch (this.side) {
            case 0:
                this.x = 0;
                this.y = int(random(height));
                break;
            case 1:
                this.x = int(random(width));
                this.y = 0;
                break;
            case 2: 
                this.x = width;
                this.y = int(random(height));
                break;
            case 3:
                this.x = int(random(width));
                this.y = height;
                break;
        }
        this.maxHP = health;
        this.hp = this.maxHP;
        this.xp = xp
        this.targetX = pc.x;
        this.targetY = pc.y;
        this.targetDir = createVector(this.targetX - this.x, this.targetY - this.y);
        this.targetDir.normalize();
        this.xSpd = this.targetDir.x*spawnMultiplier;
        this.ySpd = this.targetDir.y*spawnMultiplier;
        this.r = 12 * sizeMultiplier;
    }

    display() {
        push();
        noStroke();
        fill("white");
        ellipse(this.x, this.y, this.r);
        pop();
    }

    calculatePlayerLocation() {
        let vect = createVector(pc.x - this.x, pc.y - this.y);
        this.targetDir = vect.normalize();
        this.xSpd = this.targetDir.x*spawnMultiplier;
        this.ySpd = this.targetDir.y*spawnMultiplier;
    }

    update() {
        if (gameState === "running") {
            this.calculatePlayerLocation();
            this.x += this.xSpd;
            this.y += this.ySpd;
        }
    }

    outOfBounds(){
		return(this.x > width+10 || this.x < -10 || this.y > height+10 || this.y < -10);
	}
	
	myX(){
		return this.x;
	}
	
	myY(){
		return this.y;
	}
	
	myR(){
		return this.r;
	}

    takeDamage(damage) {
        this.hp -= damage;
    }

    isDead() {
        if (this.hp < 0) {
            return true;
        }
        return false;
    }
    expDrop() {
        return this.xp;
    }
}