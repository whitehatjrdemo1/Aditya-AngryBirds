const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var create = true;
var engine, world;
var box1, pig1, pig3;
var backgroundImg, platform;
var bird, slingshot;
var level = 1;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
  getBackgroundImg();
  // pigstep=loadSound("https://raw.githubusercontent.com/whitehatjr/sounds-for-angry-bird/main/sounds/pig_snort.mp3");
  //  flybird=loadSound("https://raw.githubusercontent.com/whitehatjr/sounds-for-angry-bird/main/sounds/bird_flying.mp3");
  //  bridselect=loadSound("https://raw.githubusercontent.com/whitehatjr/sounds-for-angry-bird/main/sounds/bird_select.mp3");
}

function setup() {
  var canvas = createCanvas(1200, 400);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(600, height, 1200, 20);
  // platform = new Ground(150, 305, 300, 170);

  box1 = new Box(700, 320, 70, 70);
  box2 = new Box(920, 320, 70, 70);
  pig1 = new Pig(810, 350);
  log1 = new Log(810, 260, 300, PI / 2);

  box3 = new Box(700, 240, 70, 70);
  box4 = new Box(920, 240, 70, 70);
  pig3 = new Pig(810, 220);

  log3 = new Log(810, 180, 300, PI / 2);

  box5 = new Box(810, 160, 70, 70);
  log4 = new Log(760, 120, 150, PI / 7);
  log5 = new Log(870, 120, 150, -PI / 7);

  bird = new RedBird(200, 220);
  bird2 = new YellowBird(200, 50);
  //log6 = new Log(230,180,80, PI/2);
  slingshot = new SlingShot(bird.body, { x: 200, y: 50 + 170 });
}

function draw() {
  if (backgroundImg) {
    background(backgroundImg);
  } else {
    background("crimson");
  }
  noStroke();
  textSize(35);
  fill("white");
  text("Score  " + score, width - 300, 50);

  Engine.update(engine);
  //strokeWeight(4);
  ground.display();

  if (level === 1) {
    box1.display();
    box2.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();
    bird.display();
    bird2.display();
    //platform.display();
    //log6.display();
    slingshot.display();
    if (score >= 400) {
      level = 2;
    }
  }
  if (level === 2) {
    createBodies();

    box1.display();
    box2.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    //box5.display();
    log4.display();
    log5.display();
    bird.display();
    bird2.display();
    slingshot.display();
  }
}

function mouseDragged() {
  if (gameState !== "launched") {
    Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
  }
}

function mouseReleased() {
  slingshot.fly();
  gameState = "launched";
}

function keyPressed() {
  if (keyCode === 32) {
    slingshot.attach(bird.body);
    bird.trajectory = [];
    Matter.Body.setPosition(bird.body, { x: 200, y: 220 });
    gameState = "onSling";
  }
}

async function getBackgroundImg() {
  var response = await fetch(
    "http://worldtimeapi.org/api/timezone/Asia/Kolkata"
  );
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11, 13);

  if (hour >= 06 && hour <= 19) {
    bg = "sprites/bg1.png";
  } else {
    bg = "sprites/bg2.jpg";
  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}
function createBodies() {
  if (create === true) {
    box1.remove();
    box2.remove();
    pig1.remove();
    log1.remove();

    box3.remove();
    box4.remove();
    pig3.remove();
    log3.remove();

    //box5.display();
    log4.remove();
    log5.remove();
    bird.remove();
    bird2.remove();
    slingshot.remove();

    box1 = new Box(700, 320, 70, 70);
    box2 = new Box(920, 320, 70, 70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810, 260, 300, PI / 2);

    box3 = new Box(700, 240, 70, 70);
    box4 = new Box(920, 240, 70, 70);
    pig3 = new Pig(810, 220);

    log3 = new Log(810, 180, 300, PI / 2);

    box5 = new Box(810, 160, 70, 70);
    log4 = new Log(760, 120, 150, PI / 7);
    log5 = new Log(870, 120, 150, -PI / 7);

    bird = new RedBird(200, 220);
    bird2 = new YellowBird(200, 50);
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body, { x: 200, y: 50 + 170 });
    create = false;
  }
}
