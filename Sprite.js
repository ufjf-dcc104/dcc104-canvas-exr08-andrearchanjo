function Sprite(){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.SIZE = 16;
  this.cooldown = 0;
  this.explodes = 0;
  this.color = "rgba(0,0,0,0.3)";
  this.pose = 0;
  this.frame = 0;
  this.poses = [
    {row: 11, col:1, frames:8, v: 4},
    {row: 10, col:1, frames:8, v: 4},
    {row: 9, col:1, frames:8, v: 4},
    {row: 8, col:1, frames:8, v: 4},
    {row: 11, col:0, frames:1, v: 4},
  ];
  this.images = null;
  this.imgKey = "pc";
}

Sprite.prototype.desenhar = function (ctx) {
  this.desenharQuadrado(ctx);
  this.desenharPose(ctx);
}

Sprite.prototype.desenharObjeto = function (ctx, img) {
  ctx.save();
  //console.log(img);
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle*2*Math.PI/360);
  ctx.fillStyle = this.color;
  ctx.drawImage(img , -this.width/2, -this.height/2, this.width, this.height);
  if(this.debug){
    ctx.strokeStyle = "grey";
    ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  }
  ctx.restore();
};

Sprite.prototype.desenharQuadrado = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.fillStyle = this.color;
  ctx.beginPath();
  //ctx.fillRect(-this.SIZE/2, -this.SIZE/2, this.SIZE, this.SIZE);
  ctx.arc(0, 0, this.SIZE/2, 0, 2*Math.PI);
  ctx.fill();
  ctx.closePath;
  ctx.restore();
};

Sprite.prototype.desenharPose = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  this.images.drawFrame(ctx,
    this.imgKey,
    this.poses[this.pose].row,
    Math.floor(this.frame),
    -32,-56, 64
  );
  ctx.restore();
};

Sprite.prototype.localizacaoGX = function(map){
  this.gx = Math.floor(this.x/map.SIZE);

  return this.gx;
}

Sprite.prototype.localizacaoGY = function(map){
  this.gy = Math.floor(this.y/map.SIZE);

  return this.gy;
}

/*
Sprite.prototype.sentirArea = function(ctx, map){
  this.gx = Math.floor(this.x/map.SIZE);
  this.gy = Math.floor(this.y/map.SIZE);

  // -- Sentir Minas --

  if(map.cells[this.gy-1][this.gx] == 5){//cima
    //map.cells[this.gy-1][this.gx] = 2;
    map.minasQtd++;
  }
  if(map.cells[this.gy+1][this.gx] == 5){//baixo
    //map.cells[this.gy+1][this.gx] = 2;
    map.minasQtd++;    
  }  
  if(map.cells[this.gy][this.gx+1] == 5){//direita
    //map.cells[this.gy][this.gx+1] = 2;
    map.minasQtd++;  
  }
  if(map.cells[this.gy][this.gx-1] == 5){//esquerda
    //map.cells[this.gy][this.gx-1] = 2;
    map.minasQtd++;  
  }
  if(map.cells[this.gy-1][this.gx+1] == 5){//cima-direita
    //map.cells[this.gy-1][this.gx+1] = 2;
    map.minasQtd++;  
  }
  if(map.cells[this.gy+1][this.gx+1] == 5){//baixo-direita
    //map.cells[this.gy+1][this.gx+1] = 2;
    map.minasQtd++;  
  }
  if(map.cells[this.gy-1][this.gx-1] == 5){//cima-esquerda
    //map.cells[this.gy-1][this.gx-1] = 2;
    map.minasQtd++;  
  }
  if(map.cells[this.gy+1][this.gx-1] == 5){//baixo-esquerda
    //map.cells[this.gy+1][this.gx-1] = 2;
    map.minasQtd++;  
  } 

  // -- Sentir Tesouros --

  if(map.cells[this.gy-1][this.gx] == 4){//cima
    //map.cells[this.gy-1][this.gx] = 2;
    map.tesourosQtd++;
  }
  if(map.cells[this.gy+1][this.gx] == 4){//baixo
    //map.cells[this.gy+1][this.gx] = 2;
    map.tesourosQtd++;
  }  
  if(map.cells[this.gy][this.gx+1] == 4){//direita
    //map.cells[this.gy][this.gx+1] = 2;
    map.tesourosQtd++;  
  }
  if(map.cells[this.gy][this.gx-1] == 4){//esquerda
    //map.cells[this.gy][this.gx-1] = 2;
    map.tesourosQtd++;  
  }
  if(map.cells[this.gy-1][this.gx+1] == 4){//cima-direita
    //map.cells[this.gy-1][this.gx+1] = 2;
    map.tesourosQtd++;  
  }
  if(map.cells[this.gy+1][this.gx+1] == 4){//baixo-direita
    //map.cells[this.gy+1][this.gx+1] = 2;
    map.tesourosQtd++;  
  }
  if(map.cells[this.gy-1][this.gx-1] == 4){//cima-esquerda
    //map.cells[this.gy-1][this.gx-1] = 2;
    map.tesourosQtd++;  
  }
  if(map.cells[this.gy+1][this.gx-1] == 4){//baixo-esquerda
    //map.cells[this.gy+1][this.gx-1] = 2;
    map.tesourosQtd++;
  }

  //console.log(map.minasQtd);
  //console.log(map.tesourosQtd);

}*/



Sprite.prototype.mover = function (map, dt) {
  this.gx = Math.floor(this.x/map.SIZE);
  this.gy = Math.floor(this.y/map.SIZE);
  //this.vy += 80*dt;
  if(this.vx>0 && map.cells[this.gy][this.gx+1]!=2){
    this.x += Math.min((this.gx+1)*map.SIZE - (this.x+this.SIZE/2),this.vx*dt);
  } else if(this.vx <0 && map.cells[this.gy][this.gx-1]!=2){
      this.x += Math.max((this.gx)*map.SIZE - (this.x-this.SIZE/2),this.vx*dt);
    }
  else {
    this.x = this.x + this.vx*dt;
  }
  if(this.vy >0 && map.cells[this.gy+1][this.gx]!=2){
    this.y += Math.min((this.gy+1)*map.SIZE - (this.y+this.SIZE/2),this.vy*dt);
  } else if( this.vy<0 && map.cells[this.gy-1][this.gx]!=2){
      this.y += Math.max((this.gy)*map.SIZE - (this.y-this.SIZE/2),this.vy*dt);
    }
  else {
    this.y = this.y + this.vy*dt;
  }

  // -- Clareando o caminho --

  /*if(map.cells[this.gy][this.gx] != 2){
    map.cells[this.gy][this.gx] = 2;
  }*/

  if(this.cooldown>0) {
    this.cooldown -= dt;
    //console.log("Maior que zero");
  } else {
    this.cooldown = 0;
    //console.log("Igual a zero");
  }

  this.frame += this.poses[this.pose].v*dt;
  if(this.frame>this.poses[this.pose].frames-1){
    this.frame = 0;
  }
};

Sprite.prototype.timeoutBomba = function(dt){
  if(this.explodes > 0){
    this.explodes -= dt;
    return false;
  } else{
    this.explodes = 0;
    return true;
  }
}

Sprite.prototype.colidiuCom = function (alvo) {
  if(this.x + this.width/2 < alvo.x - alvo.width/2)   return false;  // colisão pela esquerda
  if(this.x - this.width/2 > alvo.x + alvo.width/2)   return false;  // colisão pela direita
  if(this.y + this.height/2 < alvo.y - alvo.height/2)  return false;  //  colisão por cima
  if(this.y - this.height/2 > alvo.y + alvo.height/2)  return false;  // colisão por baixo
  return true;
};

Sprite.prototype.perseguir = function (alvo) {
    var dx = alvo.x - this.x;
    var dy = alvo.y - this.y;
    var h = Math.sqrt(dx*dx+dy*dy);
    this.vx = 50*dx/h;
    this.vy = 50*dy/h;
    if(this.vy<0) this.pose = 3;
    if(this.vy>0) this.pose = 4;
    if(this.vx>0) this.pose = 0;
    if(this.vx<0) this.pose = 2;
};
