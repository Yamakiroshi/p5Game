const Interaction = {
    Inside: "Inside",
    Outside: "Outside"
}

function createMainUi() {
    createMainMenu();
    createCharacterScreen();
    createShop();
}

function createMainMenu() {
    mainMenu.addItem(new Header(0,0, mainMenu.w, 15, "MainMenu", (dx,dy) => {characterMenu.shift(dx,dy);}))
    mainMenu.addItem(new Button(0,15, mainMenu.w, 30, "Character", ()=>{console.log('Opening Character Menu'); openMenu = characterMenu; gameState = "menu";}, color(0), color(255,0,0), color(225,0,0), color(255)))
    
}

function createShop() {
// Shop Button
let shopButton = createImg('imgs/Shop.svg')
shopButton.position(width + 5, 130);
//shopButton.mousePressed(openShop);
}

function createCharacterScreen() {
    let charButton = createImg('imgs/info.svg')
    charButton.position(width+5,10)

    characterMenu.addItem(new Header(0,0, characterMenu.w, 15, "Character Stats", (dx,dy) => {characterMenu.shift(dx,dy);}))
    characterMenu.addItem(new Button(0,30, characterMenu.w, 30, "Close", ()=>{console.log('Closing Character Menu'); closeScreen()}, color(0), color(255,0,0), color(225,0,0), color(255)))
    //charButton.mousePressed(openScreen(characterMenu));
}

function openScreen(menu)
{
    gameState = "menu";
    openMenu = menu;
}

function closeScreen()
{
    gameState = "running";
    openMenu = null;
}

class Menu
{
    constructor(x,y,w,h,items) {
        this.x = x; 
        this.y = y;
        this.w = w;
        this.h = h;
        this.items = [...items];
    }

    addItem(item){
        this.items.push(item);
    }
    draw() {
        push();
        translate(this.x, this.y);
        stroke(0);
        fill(255);
        rect(0,0,this.w, this.h);
        for (let i = 0; i < this.items.length; i++)
        {
            this.items[i].draw()
        }
        pop();
    }
    interact(mx, my){
        for (let i = this.items.length; i >= 0; i--) {
            let item = this.items[i];
            if (item != undefined) {
                let inter = item.interact(mx - this.x, my - this.y);
                if (inter == Interaction.Inside) return item;
            }
        }
        return null;
    }
    shift(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

class Item {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w; 
        this.h = h;
    }
    draw() {}
    interact(mx,my) {
        if (mx> this.x && mx < this.x + this.w && my > this.y && my < this.y+this.h)
        {
            return Interaction.Inside;
        }
        return Interaction.Outside;
    }
    mousePress(pressed, side)
    {}
    mouseDrag(ev)
    {}
}

class Header extends Item
{
    constructor(x,y,w,h, title, mdcbfn = (dx,dy) => {}, border=color(0), bg = color(0,0,180), textc = color(255))
    {
        super(x,y,w,h);
        this.title = title;
        this.border = border;
        this.bg = bg;
        this.textc = textc;
        this.mdcbfn = mdcbfn
    }
    draw() {
        push();
        stroke(this.border);
        fill(this.bg);
        rect(this.x, this.y, this.w, this.h);
        noStroke();
        fill(this.textc)
        textSize(this.h * 0.75)
        text(
            this.title,
            this.x + ((this.w - textWidth(this.title)) / 2),
            this.y + this.h * 0.75
        )
        pop();
    }
    mouseDrag(ev)
    {
        this.mdcbfn(ev.movementX, ev.movementY);
    }
}

class Button extends Item 
{
    constructor(x,y,w,h,txt, cbfn, border = color(0), bg = color(250), ibg= color(120), textc = color(0))
    {
        super(x,y,w,h);
        this.txt = txt;
        this.border = border;
        this.ibg = ibg;
        this.bg = bg;
        this.callback_fn = cbfn;
        this.textc = textc;
        this.interacted = false;
        this.lastFramePressed = 0;
    }
    draw() {
        push();
        stroke(this.border);
        if(this.interacted) fill(this.ibg);
        else fill(this.bg)
        rect(this.x, this.y, this.w, this.h);
        noStroke();
        fill(this.textc);
        textSize(this.h * 0.75); // for padding
        text(this.txt, this.x + ((this.w - textWidth(this.txt)) / 2),
            this.y + this.h * 0.75 // padding
        )
        pop();
    }
    interact(mx, my) {
        let inter = super.interact(mx,my);
        if (inter == Interaction.Inside) this.interacted = true;
        else this.interacted = false;
        return inter;
    }
    mousePress(pressed, side) {
        if (pressed && side == LEFT && frameCount - this.lastFramePressed > 10)
        {
            this.callback_fn();
            this.lastFramePressed = frameCount;
        }
    }
}