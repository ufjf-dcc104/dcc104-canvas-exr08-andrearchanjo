var canvas;
var ctx;
var map;
var pc1;
var pc2;
var dt;
var audio;
var images;
var anterior = 0;
var frame = 0;
var i = 1;//posiçao inicial em relação à cells (2)
var j = 1;//posiçao inicial em relação à cells (2)
var k = 8;
var l = 8;

function init(){
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 480;
  canvas.height = 480;
  ctx = canvas.getContext("2d");
  images = new ImageLoader();
  images.load("pc","pc.png");
  map = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map.images = images;
  map.setCells([
    [1,1,1,1,1,1,1,1,1,1],
    [1,2,2,3,3,3,3,3,3,1],
    [1,2,1,3,3,3,3,1,3,1],
    [1,3,3,3,1,1,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,1,1,3,3,3,1],
    [1,3,1,3,3,3,3,1,2,1],
    [1,3,3,3,3,3,3,2,2,1],
    [1,1,1,1,1,1,1,1,1,1],
  ]);
  
  audio = new AudioLoader();
  audio.load("boom", "boom.mp3")

  pc1 = new Sprite();
  pc1.y = (i+0.5)*map.SIZE;
  pc1.x = (j+0.5)*map.SIZE;
  pc1.images = images;
  
  pc2 = new Sprite();
  pc2.y = (k+0.5)*map.SIZE;
  pc2.x = (l+0.5)*map.SIZE;
  pc2.images = images;
  
  initControls();
  requestAnimationFrame(passo);
}

function passo(t){
  if(!map.endGame(ctx, pc1, pc2)){
    dt = (t-anterior)/1000;
    requestAnimationFrame(passo);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    map.bombaExplodes(dt,pc1,pc2);

    //console.log(pc1.life);
    //console.log(pc2.life);

    map.endGame(ctx, pc1, pc2);

    map.colidiuComPowerUps(pc1);

    map.colidiuComPowerUps(pc2);

    pc1.mover(map, dt);
    pc2.mover(map, dt);

    map.desenhar(ctx, images);
    pc1.desenhar(ctx);
    pc2.desenhar(ctx);
    anterior = t;
  
    frame = (frame<9)?frame:1;
    //images.drawFrame(ctx,"pc",8,Math.floor(frame),0,0,64);
    frame+=2*dt;
  } else{
    ctx.clearRect(0,0, canvas.width, canvas.height);
    map.showInformations(ctx, pc1, pc2);
  }
}

function initControls(){
  addEventListener('keydown', function(e){
    switch (e.keyCode) {
      case 13:
        map.bomba(pc2, ctx, "p2");
        e.preventDefault();
        break;
      case 32:
        map.bomba(pc1, ctx, "p1");
        e.preventDefault();
        break;
      case 37: //esquerda
        if(pc1.haste){
          pc1.vx = -150;
          pc1.vy = 0;
          pc1.pose = 2;
        } else {
          pc1.vx = -100;
          pc1.vy = 0;
          pc1.pose = 2;
        }

        e.preventDefault();
        break;
      case 38: //cima
        if(pc1.haste){
          pc1.vx = 0;
          pc1.vy = -150;
          pc1.pose = 3;
        } else {
          pc1.vx = 0;
          pc1.vy = -100;
          pc1.pose = 3;
        }
        e.preventDefault();
        break;
      case 39: //direita
        if(pc1.haste){
          pc1.vx = 150;
          pc1.vy = 0;
          pc1.pose = 0;
        } else {
          pc1.vx = 100;
          pc1.vy = 0;
          pc1.pose = 0;
        }
        e.preventDefault();
        break;
      case 40: //baixo
        if(pc1.haste){
          pc1.vx = 0;
          pc1.vy = 150;
          pc1.pose = 1;
        } else {
          pc1.vx = 0;
          pc1.vy = 100;
          pc1.pose = 1;
        }
        e.preventDefault();
        break;
      case 65: //esquerda
        if(pc2.haste){
          pc2.vx = -150;
          pc2.vy = 0;
          pc2.pose = 2;
        } else {
          pc2.vx = -100;
          pc2.vy = 0;
          pc2.pose = 2;
        }
        e.preventDefault();
        break;
      case 68: //direita
        if(pc2.haste){
          pc2.vx = 150;
          pc2.vy = 0;
          pc2.pose = 0;
        } else {
          pc2.vx = 100;
          pc2.vy = 0;
          pc2.pose = 0;
        }
        e.preventDefault();
        break;
      case 83: //baixo
        if(pc2.haste){
          pc2.vx = 0;
          pc2.vy = 150;
          pc2.pose = 1;
        } else {
          pc2.vx = 0;
          pc2.vy = 100;
          pc2.pose = 1;
        }
        e.preventDefault();
        break;
      case 87: //cima
        if(pc2.haste){
          pc2.vx = 0;
          pc2.vy = -150;
          pc2.pose = 3;
        } else {
          pc2.vx = 0;
          pc2.vy = -100;
          pc2.pose = 3;
        }
        e.preventDefault();
        break;
      default:
    }
  });
  addEventListener('keyup', function(e){
    switch (e.keyCode) {
      case 37: //esquerda
        pc1.vx = 0;
        pc1.pose = 6;
        break;
      case 38: //cima
        pc1.vy = 0;
        pc1.pose = 7;
        break;
      case 39: //direita
        pc1.vx = 0;
        pc1.pose = 4;
        break;
      case 40: //baixo
        pc1.vy = 0;
        pc1.pose = 5;
        break;
      case 65: //esquerda
        pc2.vx = 0;
        pc2.pose = 6;
        break;
      case 68: //direita
        pc2.vx = 0;
        pc2.pose = 4;
        break;
      case 83: //baixo
        pc2.vy = 0;
        pc2.pose = 5;
        break;
      case 87: //cima
        pc2.vy = 0;
        pc2.pose = 7;
        break;
      default:

    }
  });
}
