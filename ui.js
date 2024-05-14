function createMainUi() {
    createShop();
}

function createShop() {
// Shop Button
let shopButton = createImg('imgs/Shop.png')
shopButton.position(width + 5, 10);
shopButton.mousePressed(openShop);
}

function openShop() {
    console.log("shop opening");
    gameState = "pause"
}