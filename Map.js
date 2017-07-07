function Map(rows, collumns) {
  this.SIZE = 32;
  this.bombs = [];
  this.cells = [];
  for (var r = 0; r < rows; r++) {
    this.cells[r] = [];
    for (var c = 0; c < collumns; c++) {
      this.cells[r][c] = 0;
    }
  }
}

Map.prototype.desenhar = function (ctx, img) {

  for (var i = 0; i < this.bombs.length; i++) {
      this.bombs[i].desenharQuadrado(ctx);
      //this.bombs[i].desenharObjeto(ctx, img.images[this.bombs[i].imgKey]);
  }

  for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
      if(this.cells[r][c]==1){
        ctx.fillStyle = "brown";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.fillStroke = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      if(this.cells[r][c]==2){
        ctx.fillStroke = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      if(this.cells[r][c]==3){
        ctx.fillStyle = "gray";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.fillStroke = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      if(this.cells[r][c] == 4){
        ctx.fillStroke = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
    }
  }

  

};

Map.prototype.endGame = function(ctx, pc1, pc2){
  
  if(pc1.life == 0){
    return true;
  }

  if(pc2.life == 0){
    return true;
  }

  return false;

};

Map.prototype.showInformations = function(ctx, pc1, pc2){
  if(pc1.life == 0){
    ctx.font="20px Verdana";
    ctx.fillStyle = "red";
    ctx.fillText("Player 2 Venceu", 150, 175);
    return true;
  }

  if(pc2.life == 0){
    ctx.font="20px Verdana";
    ctx.fillStyle = "red";
    ctx.fillText("Player 1 Venceu!", 150, 175);
    return true;
  }

  return false;  
}

Map.prototype.getCells = function () {
  for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
      console.log(r);
      console.log(c);
    }
  }
};

Map.prototype.setCells = function (newCells) {
  for (var i = 0; i < newCells.length; i++) {
    for (var j = 0; j < newCells[i].length; j++) {
      switch (newCells[i][j]) {
        case 1:
          this.cells[i][j] = 1;
          break;
        case 2:
          this.cells[i][j] = 2;
          break;
        case 3:
          this.cells[i][j] = 3;
          break;
        case 4:
          this.cells[i][j] = 4;
          break;
        default:
          this.cells[i][j] = 0;
      }
    }
  }
};

Map.prototype.bomba = function (pc, ctx){
  if(pc.cooldown == 0){
    var bomba = new Sprite();
    bomba.y = (pc.localizacaoGY(this)+0.5)*this.SIZE;
    bomba.x = (pc.localizacaoGX(this)+0.5)*this.SIZE;
    bomba.color = "blue";
    bomba.explodes = 2;
    bomba.gx = pc.gx;
    bomba.gy = pc.gy;
    
    pc.cooldown = 1;
      
    this.cells[pc.gy][pc.gx] = 4;
    
    this.bombs.push(bomba);

  }
}

Map.prototype.bombaExplodes = function(dt, pc1 , pc2){
  
  //Localização do player 1
  pc1.gx = pc1.localizacaoGX(this);
  pc1.gy = pc1.localizacaoGY(this);
  
  //Localização do player 2
  pc2.gx = pc2.localizacaoGX(this);
  pc2.gy = pc2.localizacaoGY(this);

  for(i = this.bombs.length -1; i >=0; i--){
      if(this.bombs[i].timeoutBomba(dt)){
        
        //Verifica se o player 1 está no alcance da bomba
        pc1.playerDies(map, this.bombs[i]);
        
        //Verifica se o player 2 está no alcance da bomba  
        pc2.playerDies(map, this.bombs[i]);

        //Limpa o cenário
        if(this.cells[this.bombs[i].gy-1][this.bombs[i].gx] == 3){//cima
          this.cells[this.bombs[i].gy-1][this.bombs[i].gx] = 2;
        }
        if(this.cells[this.bombs[i].gy+1][this.bombs[i].gx] == 3){//baixo
          this.cells[this.bombs[i].gy+1][this.bombs[i].gx] = 2;
        }  
        if(this.cells[this.bombs[i].gy][this.bombs[i].gx+1] == 3){//direita
          this.cells[this.bombs[i].gy][this.bombs[i].gx+1] = 2;
        }
        if(this.cells[this.bombs[i].gy][this.bombs[i].gx-1] == 3){//esquerda
          this.cells[this.bombs[i].gy][this.bombs[i].gx-1] = 2;
        }
        this.cells[this.bombs[i].gy][this.bombs[i].gx] = 2;
        
        //Remove a bomba
        this.bombs.splice(i,1);
      } 
  }
};

