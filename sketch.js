var tower,towerImage;
var door,doorImage,doorGroup; 
var climber,climberImage,climberGroup; 
var pbhooth,pbhoothImage ; 
var invisibleBlock,invisibleBlockGroup;
var gameState="play";
var spookysound ;

function preload() {
 towerImage = loadImage ("tower.png") ;
  
 doorImage = loadImage ("door.png");
 climberImage = loadImage ("climber.png");
 pbhoothImage = loadImage ("ghost-standing.png")
  spookysound = loadSound ("spooky.wav");
}

function setup () {
  createCanvas (400,550);
  tower = createSprite (200,275);
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  
  doorGroup = new Group ();
  climberGroup = new Group ();
  invisibleBlockGroup = new Group ();
  
  pbhooth = createSprite(200,200,50,50);
  pbhooth.scale = 0.3 ; 
  pbhooth.addImage("pbhooth", pbhoothImage);

  spookysound.loop();
}

function draw (){
  background ('lightblue');
 
  if(gameState==="play"){
  if(keyDown(LEFT_ARROW))
  {
      pbhooth.x = pbhooth.x -3;
  }
  
  if (keyDown (RIGHT_ARROW))
  {
    pbhooth.x = pbhooth.x +3;
  }
 if (keyDown ("space"))
 {
   pbhooth.velocityY = -5;
 }
 pbhooth.velocityY = pbhooth.velocityY + 0.8;
    
     if (tower.y > 400){
    tower.y=300 
  }
    spawndoors();
  
  if(climberGroup.isTouching(pbhooth)){
    pbhooth.velocityY=0;
  }
  
  if(invisibleBlockGroup.isTouching(pbhooth)||pbhooth.y>550){
    pbhooth.destroy();
    gameState="end";
  }

  drawSprites();
}
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("gameOver",230,250);
  }

function spawndoors(){
  if(frameCount % 140 === 0 ){
  door = createSprite (200,-50); 
  door.addImage (doorImage);  
  door.x =Math.round(random(120,400));
  door.velocityY = 3;
  door.lifetime = 800;
  doorGroup.add(door);
    
  climber = createSprite (200,10);
  climber.addImage (climberImage);
  climber.x = door.x; 
  climber.velocityY = 3;
  climber.lifetime = 800 ;
  climberGroup.add(climber)
    
    pbhooth.depth = door.depth;
    pbhooth.depth += 1;
    
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
    
  }
  
}
}