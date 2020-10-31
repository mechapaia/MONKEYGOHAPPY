
//creating variables
var PLAY = 1;
var END = 0;
var gameState;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score


function preload(){
  
  //loading animations
  monkey_running = loadAnimation ("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  
  //loading images
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}


function setup() {
  
  //creating canvas
  createCanvas(500,200);
  
  //setting gamestate
  gameState = PLAY;
  
  //creating the monkey
  monkey = createSprite (90, 150, 10,10)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.08;
  monkey.setCollider("circle",0,0,300);
  
  //creating the ground
  ground = createSprite(200,180,1000,40);
  ground.shapeColor = ("chocolate");
  
  //creating groups
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //setting score
  score = 0;
}


function draw() {
  
  //coloring background
  background ("darkgreen");
  
  //displaying score
  stroke ("black");
  fill ("black");
  textSize (17);
  text ("Survival Time: " + score, 350,30)
  
  //creating gravity
  monkey.velocityY = monkey.velocityY + 0.7;
  
  //colliding monkey with ground
  monkey.collide (ground);
  
  //making the ground move
  ground.velocityX = -3
  
  if(gameState === PLAY){
    
    //controlling the monkey
    if(keyDown("space") && monkey.y >= 130) {
          monkey.velocityY = -11;
    }
    
    //looping the ground
    if (ground.x < 0){
        ground.x = ground.width/2;
    }
    
    //spawning bananas and obstacles
    spawnBanana();
    spawnObstacle();
    
    //collecting bananas
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
    }
    
    //scoring
    score = round(frameCount/38);
  }
  
  if(gameState === END){
    
    //stopping the ground
    ground.velocityX = 0;
    
    //setting lifetimes
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    //setting velocities
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0); 
    
  }
  
  //ending game if monkey collides with obstacle
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  
  //drawing sprites
  drawSprites();
}


function spawnBanana(){
  
   //setting bananas
   if (frameCount % 80 === 0){
     banana = createSprite(520,100,10,10);
     banana.y = Math.round(random(50,120));
     banana.addImage(bananaImage);
     banana.scale = 0.1;
     banana.velocityX = -6
     banana.lifetime = 100
     foodGroup.add(banana)
   }
}


function spawnObstacle(){
   
   //setting obstacles
   if (frameCount % 300 === 0){
     obstacle = createSprite(520,145,10,10);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
     obstacle.velocityX = -6
     obstacle.lifetime = 100
     obstacleGroup.add(obstacle)
   }
}
