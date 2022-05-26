var mouse, mouseImage;
var knife, knifeImage;
var launched = false;
var deadMouseImage;
var mouseDead = false;
var upDeadMouseImage;
var direction = "down";
var floorImage;
var reset = true;
var knives = 3;
var knifeCount1, knifeCount2, knifeCount3;
var knifeCount1Image, knifeCount2Image, knifeCount3Image;
var mouseText, mouseTextImage;
var aliveMouseImage;
var gameEnd = false;
var instructions, instructionsImage;
var gameStart = false;
var resetButton, resetButtonImage;

function preload() {
    knifeImage = loadImage("./assets/Knife.png");
    mouseImage = loadImage("./assets/Mouse.png");
    upMouseImage = loadImage("./assets/UpMouse.png");
    deadMouseImage = loadImage("./assets/deadMouse.png");
    upDeadMouseImage = loadImage("./assets/upDeadMouse.png");
    floorImage = loadImage("./assets/Floor.png");
    knifeCount1Image = loadImage("./assets/knifeCount1.png");
    knifeCount2Image = loadImage("./assets/knifeCount2.png");
    knifeCount3Image = loadImage("./assets/knifeCount3.png");
    mouseTextImage = loadImage("./assets/MouseText.png");
    aliveMouseImage = loadImage("./assets/aliveMouse.png");
    instructionsImage = loadImage("./assets/instructions.png");
    resetButtonImage = loadImage("./assets/resetButton.png");
}

function setup() {
    var canvas = createCanvas(600, 500);

    mouse = createSprite(50, 50, 10, 50);
    mouse.addImage(mouseImage);
    mouse.scale = 0.5;
    
    knife = createSprite(300, 200, 10, 10);
    knife.addImage(knifeImage);
    knife.scale = 0.5;

    mouseText = createSprite(300, 250, 10, 10);

    knifeCount1 = createSprite(550, 50, 10, 10);
    knifeCount1.addImage(knifeCount1Image);
    knifeCount1.scale = 0.15;

    knifeCount2 = createSprite(550, 75, 10, 10);
    knifeCount2.addImage(knifeCount2Image);
    knifeCount2.scale = 0.15;

    knifeCount3 = createSprite(550, 100, 10, 10);
    knifeCount3.addImage(knifeCount3Image);
    knifeCount3.scale = 0.15;

    instructions = createSprite(300, 250, 10, 10);
    instructions.addImage(instructionsImage);
    instructions.scale = 0.485;

    resetButton = createSprite(525, 475, 10, 10);
    resetButton.addImage(resetButtonImage);
    resetButton.scale = 0.5;

    mouse.visible = false;
    knife.visible = false;
    knifeCount1.visible = false;
    knifeCount2.visible = false;
    knifeCount3.visible = false;
    mouseText.visible = false;
    instructions.visible = true;
    resetButton.visible = false;
}

function draw() {
    background(floorImage);
    if(keyIsDown(16)) {
        gameStart = true;
    }
    if(gameStart === true) {
        instructions.visible = false;
        knifeCount1.visible = true;
        knifeCount2.visible = true;
        knifeCount3.visible = true;
        mouse.visible = true;
        knife.visible = true;


        if(keyIsDown(32) && gameEnd === false) {
            launch();
        }

        if(launched === false && gameEnd === false) {
            movement();
            knifeMovement();
        }

        if(launched === true && gameEnd === false) {
            stab();
        }

    knifeCount();

    if(mouseDead === true) {
        mouseText.addImage(mouseTextImage);
        mouseText.scale = 0.8;
        mouseText.visible = true;
        gameEnd = true;
        resetButton.visible = true;
        if(resetButton.isPressed) {
            reset();
        }
    }

    else if(mouseDead === false && knives === 0) {
        mouseText.addImage(aliveMouseImage);
        mouseText.scale = 0.8;
        mouseText.visible = true;
        gameEnd = true;
        resetButton.visible = true;
        if(resetButton.isPressed) {
            reset();
        }
    }
}

    drawSprites();
}

function movement() {
    if(keyIsDown(DOWN_ARROW) && mouse.position.y <= 450) {
        mouse.position.y += 5;
        mouse.addImage(mouseImage);
        direction = "down";
    }
    
    if(keyIsDown(UP_ARROW) && mouse.position.y >= 50) {
        mouse.position.y -= 5;
        mouse.addImage(upMouseImage);
        direction = "up";
    }
    
}

function knifeMovement() {
    if(keyIsDown(83) && knife.position.y <= 450) {
        knife.position.y += 3;
    }
    
    if(keyIsDown(87) && knife.position.y >= 50) {
        knife.position.y -= 3;
    }
    
}

function launch() {
    launched = true;
    if(keyIsDown(32) && knife.position.x >= 0 && reset === true && knives > 0) {
        knife.position.x-=5;
        stab();
    }
}

function stab() {
     if(knife.overlap(mouse)) {
        if(direction === "down") {
        mouse.addImage(deadMouseImage);
        }
        else if(direction === "up") {
            mouse.addImage(upDeadMouseImage);
        }
        mouseDead = true;
    }

    else if(mouseDead === false && knife.position.x === 0) {
        reset = false;
        if(keyIsDown(13) && knives > 0) {
            knife.position.x = 300;
            launched = false;
            reset = true;
            knives -= 1;
        }
    }

}

function knifeCount() {
    if(knives === 3) {
        knifeCount1.visible = true;
        knifeCount2.visible = true;
        knifeCount3.visible = true;
    }

    if(knives === 2) {
        knifeCount1.visible = true;
        knifeCount2.visible = true;
        knifeCount3.visible = false;
    }

    if(knives === 1) {
        knifeCount1.visible = true;
        knifeCount2.visible = false;
        knifeCount3.visible = false;
    }

    if(knives === 0) {
        knifeCount1.visible = false;
        knifeCount2.visible = false;
        knifeCount3.visible = false;
    }
}

function reset() {
    window.location.reload();
}