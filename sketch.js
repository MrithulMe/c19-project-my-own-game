var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  doorsGroup= new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 20;
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.4;
  ghost.addImage("ghost", ghostImg);
  
}

function draw() {
  background(200);
  if (gameState == "play") {

  
  
  if(tower.y > 400){
      tower.y = 300
    }
    if (keyDown("LEFT_ARROW")) {
      ghost.x = ghost.x-30
    }

    if (keyDown("RIGHT_ARROW")) {
      ghost.x = ghost.x+30
    }

    if (keyDown("SPACE")) {
      ghost.velocityY = -10
    }
    ghost.velocityY = ghost.velocityY + 0.2
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }

    spawnDoors();
    drawSprites();

}
if (gameState == "end") {
  fill("red");
  textSize(40);
  text("Game Over!",230,250);
}
}

function spawnDoors() {
  if (frameCount % 200 === 0) {
    var door = createSprite(200,-50);
    door.addImage(doorImg);
    var climber = createSprite(200,10);
    climber.addImage(climberImg);
    var invisibleBlock = createSprite(200,10);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    door.x = Math.round(random(120,400));
    door.velocityY = 10;
    climber.x = door.x;
    climber.velocityY = 10;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 10;
    climber.lifetime = 800;
    door.lifetime = 800;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlock.debug = false;
    invisibleBlockGroup.add(invisibleBlock);
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;


  }
  
}
