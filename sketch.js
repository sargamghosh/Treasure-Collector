var backgroundImg,davidImg;
var David,ground;
var bg;
var spikes,spikeImg,spikeGroup;
var fireball,fireballImg,fireballGroup;
var key,keyImg,keyGroup;
var coin,coinImg,coinGroup;
var titleImg;
var score = 0;
var lifeCount=3;
var gameState ="start";

function preload()
{
	backgroundImg= loadImage("tree.png");
	davidImg= loadAnimation("boy1.gif");
	spikeImg = loadAnimation("spike.gif");
	fireballImg = loadImage("fireball2.png");
	keyImg = loadImage("key1.png");
	coinImg = loadAnimation("coin1.gif");
	titleImg = loadImage("bg2.png");
	gameOverImg = loadImage("bg1.jpg");
	winImg = loadImage("treasure.jpg");
	
}

function setup() {
	createCanvas(displayWidth,displayHeight);

	bg= createSprite(displayWidth/2,displayHeight/2);
	bg.addImage(backgroundImg);
	bg.scale=2.5;
	bg.velocityX = -2;

	David= createSprite(200,displayHeight-150);
	David.addAnimation("running",davidImg);
	David.scale=0.5;
	David.setCollider("circle",0,0,40);

	ground = createSprite(100,displayHeight-90,3000,20);
	ground.visible = false;

	spikeGroup=new Group();
	fireballGroup=new Group();
	keyGroup=new Group();
	coinGroup=new Group();
  
}


function draw() {
  
  if(gameState==="start"){
	  background(titleImg);
	  strokeWeight(6);
	  stroke("red");
	  fill("yellow");
	  textSize(35);
	  text("TREASURE COLLECTOR",displayWidth/2-250,250);
	  text("Rules:-",displayWidth/2-250,300);
	  text("1. To enter the game,click on 'ENTER' key",displayWidth/2-250,350);
	  text("2. Make david jump using 'UP'Arrow",displayWidth/2-250,400);
	  text("3. Collect the coins to increase your score",displayWidth/2-250,450);
	  text("4. If you touch any obstacle,David will lose a life",displayWidth/2-250,500);
	  text("5. If you lose all the lives,David will die ",displayWidth/2-250,550);
	  text("Help David survive and collect the treasure",displayWidth/2-250,600);
	  text("Have Fun!",displayWidth/2-250,700);
  }

  if(keyDown("enter")&&gameState==="start"){
	  gameState="play";
	  background(0);
  }
	
  if(gameState==="play"){	

    if(bg.x<450){
	  bg.x=600;
  }
	

  if(keyDown("up") && David.y>=300){
	  David.velocityY = -12;
	  }

  David.velocityY= David.velocityY+0.8;

  David.collide(ground);

  spawnSpikes();
  spawnFireballs();
  spawnKeys();
  spawnCoins();

  
  if(coinGroup.isTouching(David)){
	  score = score+10;
	  coinGroup.destroyEach();
	  if(score===250){
		  gameState="win";
	  }
  }

  if(spikeGroup.isTouching(David)){
	  lifeCount = lifeCount-1;
	  spikeGroup.destroyEach();
	  if(lifeCount===0){
		  gameState="end";
	  }
  }

  if(keyGroup.isTouching(David)){
	  score = score+20;
	  keyGroup.destroyEach();
	  if(score===250){
		gameState="win";
	  }
	  
	  }

  if(fireballGroup.isTouching(David)){
	lifeCount = lifeCount-1;
	fireballGroup.destroyEach();
	if(lifeCount===0){
		gameState="end";
		
	}
}


  drawSprites();

  textSize(30);
  fill("yellow");
  text("Score:"+score,50,50);

  textSize(30);
  fill("Lightblue");
  text("LifeCount:"+lifeCount,50,100);
}

if(gameState==="end"){
	background(gameOverImg);
	textSize(60);
	fill("white");
	text("GAME OVER",displayWidth/2-200,displayHeight/2);
	sound.stop();
}

if(gameState==="win"){
	background(winImg);
	textSize(60);
	fill("orange");
	text("The Treasure Is All Yours",displayWidth/2-200,displayHeight/2);
	
}
}

function spawnSpikes(){
	if(frameCount%400===0){
		spikes = createSprite(displayWidth+50,600);
		spikes.addAnimation("spike",spikeImg);
		spikes.scale=0.6;
		spikes.lifetime= 1000;
		spikes.velocityX = -3;
		spikeGroup.add(spikes);
	}
}

function spawnFireballs(){
	if(frameCount%1200===0){
		fireball = createSprite(displayWidth+30,0);
		fireball.addImage(fireballImg);
		fireball.scale=0.1;
		fireball.lifetime= 1000;
		fireball.velocityX = -8;
		fireball.velocityY = 5;
		fireballGroup.add(fireball);
	}
}

function spawnKeys(){
	if(frameCount%1500===0){
		key = createSprite(displayWidth+50,400);
		key.addImage(keyImg);
		key.scale=0.05;
		key.lifetime= 1000;
		key.velocityX = -3;
		keyGroup.add(key);
	}
}

function spawnCoins(){
	if(frameCount%600===0){
	   coin = createSprite(displayWidth+50,400);
	   coin.addAnimation("coin",coinImg);
	   coin.scale=0.2;
	   coin.lifetime= 1000;
	   coin.velocityX = -3;
	   coinGroup.add(coin);
	}
}




