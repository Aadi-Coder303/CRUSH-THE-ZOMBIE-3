//CREATED BY AADI GOLECHA ON 24 AUGUST 
// ZOMBIE CRUSH GAME

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var base, wall1, wall2;
var bridge, bridgeLink;

var ground;

var zombie1, zombie2, zombie3, zombie4, sadZombie1, sadZombie2;
var zombie;

var bgimg;
var stones = [];

function preload()
{
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");
  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");
  sadZombie1 = loadImage("./assets/sad_zombie1.png");
  sadZombie2 = loadImage("./assets/sad_zombie2.png");

  bg_img = loadImage("./assets/background.png");

  var button;
}

function setup()  
{
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  wall1 = new Base (width -(width+20) , height-450 ,width/6,140);
  wall2 = new Base (width-20, height-450 ,width/6,140);

  ground = new Base (width/2 , height, width, 40);

  bridge = new Bridge(width/60,{x:wall1.body.position.x -60 , y:(wall1.body.position.y - 50)})
  bridgeLink = new Link(bridge,wall2)

  for(var i = 0 ; i < 8; i++)
  {
    var x = random(180 ,500);
    var y = 100;
    var stone = new Stones(x,y,60);
    stone.debug = true;
    stones.push(stone);
  }

  zombie = createSprite(0 , height - 110);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.addImage("sadLeft", sadZombie1);
  zombie.addImage("sadRight" ,sadZombie2);
  zombie.scale = 0.1;
  zombie.velocityX = 3;

  button = createImg("./assets/axe.png");
  button.position(width - 200, height / 2 - 50);
  button.size(150,150);

  button.mouseClicked(handleButtonPress);
}

function draw() 
{
  background("blue");
  

  Engine.update(engine);

  for (var stone of stones)
  {
    stone.show();
    var pos = stone.body.position;
    var distance = dist(zombie.position.x, zombie.position.y,pos.x, pos.y);
    if(distance <=50)
    {
      console.log("collided");

      if(zombie.velocityX === -3)
      {
        zombie.changeImage("sadLeft");
        console.log("sadLeft");
        zombie.velocityX = 0;
      }
      
      if(zombie.velocityX === 3)
      {
        zombie.changeImage("sadRight");
        console.log("right");
        zombie.velocityX = 0;
      }
      
      collided= true;
    }
  }

  wall1.show();
  wall2.show();

  imageMode(CENTER);
  image(bg_img,width/2,height/2,width,height);

  for(var i = 0;i < stones.length; i ++)
  {
    stones[i].show();
  }

  bridge.show();

  if(zombie.position.x > width-100)
  {
    zombie.velocityX = -3;
    zombie.changeAnimation("righttoleft");
  }

  if(zombie.position.x < 100)
  {
    zombie.velocityX = 3;
    zombie.changeAnimation("lefttoright");
  }
  
  fill("red");
  ground.show();

  drawSprites();

}

function handleButtonPress()
{
  bridgeLink.detach();
  console.log('join');
  setTimeout(()=> 
  {
    bridge.break();
    console.log('in time')
  }, 1500);
}