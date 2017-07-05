var canvas;
var ctx;
var map;
var pc1;
var pc2;
var dt;
var images;
var anterior = 0;
var frame = 0;
var i = 1;//posiçao inicial em relação à cells (2)
var j = 1;//posiçao inicial em relação à cells (2)
var k = 8;
var l = 8;

function init(){
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 520;
  canvas.height = 520;
  ctx = canvas.getContext("2d");
  images = new ImageLoader();
  images.load("pc","pc.png");
  images.load("mina", "mina.png");
  images.load("tesouro", "tesouro.png");
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
  dt = (t-anterior)/1000;
  requestAnimationFrame(passo);
  //ctx.save();
  //ctx.translate(250,0);
  //ctx.scale(1,0.5);
  //ctx.rotate(Math.PI/4);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  //pc1.colisaoTesouro(ctx, map);
  //pc1.colisaoMina(ctx, map);
  
  map.bombaExplodes(dt,pc1);

  //map.vitoriaObtida();
  //map.tempoAcabou();
  //map.showInformations(ctx);
  //map.colidiuComTesouro(pc);

  pc1.mover(map, dt);
  pc2.mover(map, dt);
  //pc.sentirArea(ctx, map);
  //map.perseguir(pc);
  //map.mover(dt);
  map.desenhar(ctx, images);
  pc1.desenhar(ctx);
  pc2.desenhar(ctx);
  anterior = t;
  //ctx.restore();
  frame = (frame<9)?frame:1;
  //images.drawFrame(ctx,"pc",8,Math.floor(frame),0,0,64);
  frame+=2*dt;
}

function initControls(){
  addEventListener('keydown', function(e){
    switch (e.keyCode) {
      case 13:
        map.bomba(pc2, ctx);
        e.preventDefault();
        break;
      case 32:
        map.bomba(pc1, ctx);
        e.preventDefault();
        break;
      case 37: //esquerda
        if(!map.gameOver && !map.victory){
          pc1.vx = -100;
          pc1.vy = 0;
          pc1.pose = 2;
          
        } else {
          pc1.vx = 0;
        }
        e.preventDefault();
        break;
      case 38: //cima
        if(!map.gameOver && !map.victory){
          pc1.vx = 0;
          pc1.vy = -100;
          pc1.pose = 3;
        } else{
          pc1.vy = 0;
        }
        e.preventDefault();
        break;
      case 39: //direita
        if(!map.gameOver && !map.victory){
          pc1.vx = 100;
          pc1.vy = 0;
          pc1.pose = 0;
        } else {
          pc1.vx = 0;
        }
        e.preventDefault();
        break;
      case 40: //baixo
        if(!map.gameOver && !map.victory){
          pc1.vx = 0;
          pc1.vy = 100;
          pc1.pose = 1;
        } else {
          pc1.vy = 0;
        }
          e.preventDefault();
        break;
      case 65: //esquerda
        if(!map.gameOver && !map.victory){
          pc2.vx = -100;
          pc2.vy = 0;
          pc2.pose = 2;
          
        } else {
          pc2.vx = 0;
        }
        e.preventDefault();
        break;
      case 68: //direita
        if(!map.gameOver && !map.victory){
          pc2.vx = 100;
          pc2.vy = 0;
          pc2.pose = 0;
        } else {
          pc2.vx = 0;
        }
        e.preventDefault();
        break;
      case 83: //baixo
        if(!map.gameOver && !map.victory){
          pc2.vx = 0;
          pc2.vy = 100;
          pc2.pose = 1;
        } else {
          pc2.vy = 0;
        }
        e.preventDefault();
        break;
      case 87: //cima
        if(!map.gameOver && !map.victory){
          pc2.vx = 0;
          pc2.vy = -100;
          pc2.pose = 3;
        } else{
          pc2.vy = 0;
        }
        e.preventDefault();
        break;
      default:
    }
  });
  addEventListener('keyup', function(e){
    switch (e.keyCode) {
      case 37:
        pc1.vx = 0;
        pc1.pose = 4;
        break;
      case 38:
        pc1.vy = 0;
        pc1.pose = 4;
        break;
      case 39:
        pc1.vx = 0;
        pc1.pose = 4;
        break;
      case 40:
        pc1.vy = 0;
        pc1.pose = 4;
        break;
      case 65:
        pc2.vx = 0;
        pc2.pose = 0
        break;
      case 68:
        pc2.vx = 0;
        pc2.pose = 4;
        break;
      case 83:
        pc2.vy = 0;
        pc2.pose = 4;
        break;
      case 87:
        pc2.vy = 0;
        pc2.pose = 0;
        break;
      default:

    }
  });
}
