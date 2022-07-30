//all variables

var car,carImg,pathImg,path
var car1,car1Img,car2,car2Img
var score=0
var gameOver,gameOverImg
var restart,restartImg


//game states

var END =0;
var PLAY =1;
var gameState = PLAY;


//loading sound and Images

function preload(){
  
  pathImg = loadImage("path.png")
  carImg = loadImage("car.png")
  car1Img= loadImage("obstacle.png")
  car2Img= loadImage("obstacle2.png")
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")

  
} 

//making all spries

function setup(){
  

   createCanvas(600,650);
path = createSprite(300,100,600,600);
path.addImage("path",pathImg);
path.scale = 0.5
path.velocityY = 3


car = createSprite(500,600,40,20);
car.addImage("car",carImg);
car.scale=0.3;


car1G=new Group();
car2G=new Group();



gameOver = createSprite(300,300,50,50)
gameOver.addImage("gameOver",gameOverImg);
gameOver.visible = false


restart = createSprite(300,390,50,50)
restart.addImage("restart",restartImg);
restart.visible = false
restart.scale = 0.3

score=0






}

function draw() {
  background("black")

  drawSprites(); 


  textSize(20);
fill(255);
text("score: "+  score,10,30)

 if(gameState === PLAY){








  
  
  edges= createEdgeSprites();
  car.collide(edges);
  
  //code to reset the background
  if(path.y > 600 ){
    path.y = height/2;
  }

  score = score + Math.round(getFrameRate()/60);
  path.velocityY = +(6 + 3*score/100);


  createcar1();
  createcar2();
  

 
  if(keyDown("left")){
    car.x = car.x - 6;
  
   }
    if(keyDown("right")){
      car.x = car.x  + 6;
    }
  

  if(car1G.isTouching(car)){
   
   gameState = END
    
  }
  


  if(car2G.isTouching(car)){

    gameState = END
  }
  
  
 
}


 else if(gameState === END){

  gameOver.visible = true;
  restart.visible = true
  car.velocityY = 0
  car1G.setVelocityYEach (0)
  path.velocityY = 0
  car2G.setVelocityYEach (0)



 
   
  
  if( mousePressedOver(restart)) {      
  
  
   
    reset();
    score = 0
    
    
  }
 



  
  

}



  }



  function reset(){

    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    car1G.destroyEach();
    car2G.destroyEach();
    

  }



  function createcar1() {
    if (World.frameCount % 200 == 0) {
     var car1 = createSprite(Math.round(random(50, 550),40, 10, 10));
    car1.addImage(car1Img)
    car1.scale=0.07;
    car1.velocityY = path.velocityY;
    car1.lifetime = 200;
    car1G.add(car1)
   
    
    }  
  }

    function createcar2() {
      if (World.frameCount % 150 == 0) {
       var car2 = createSprite(Math.round(random(50, 550),40, 10, 10));
      car2.addImage(car2Img)
      car2.scale=0.3;
      car2.velocityY = path.velocityY;
      car2.lifetime = 200;
      car2G.add(car2)
     
      
      }  

  }


  
    

  