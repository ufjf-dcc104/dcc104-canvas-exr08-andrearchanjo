function Map(rows, collumns) {
  this.SIZE = 32;
  this.minas = [];
  this.minasQtd = 0;;
  this.tesouros = [];
  this.tesourosQtd = 0;
  this.bombs = [];
  this.pontuacao = 0;
  this.gameOver = false;
  this.tempo = 200;
  this.victory = false;
  this.cells = [];
  for (var r = 0; r < rows; r++) {
    this.cells[r] = [];
    for (var c = 0; c < collumns; c++) {
      this.cells[r][c] = 0;
    }
  }
}

Map.prototype.desenhar = function (ctx, img) {
  
  for (var i = 0; i < this.tesouros.length; i++) {
      this.tesouros[i].desenharQuadrado(ctx);
      //this.tesouros[i].desenharObjeto(ctx, img.images[this.tesouros[i].imgKey]);
  }

  for (var i = 0; i < this.minas.length; i++) {
      this.minas[i].desenharQuadrado(ctx);
      //this.minas[i].desenharObjeto(ctx, img.images[this.minas[i].imgKey]);
  }

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

Map.prototype.showInformations = function(ctx){
  
  ctx.font="20px Verdana";
  ctx.fillStyle = "red";
  ctx.fillText("Minas: ", 285, 80);
  
  // -- Fim de Jogo --

  if(this.gameOver){
    ctx.fillStyle = "blue";
    ctx.fillText("Game Over", 285, 225);
  }

  // -- Vitória -- 

  if(this.victory){
    ctx.fillStyle = "blue";
    ctx.fillText("Vitória", 285, 225);
  }

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
    //console.log(pc.gx);
    //console.log(pc.gy);
    //console.log(pc.cooldown);
  }
}

Map.prototype.bombaExplodes = function(dt, pc1){
  pc1.gx = pc1.localizacaoGX(this);
  pc1.gy = pc1.localizacaoGY(this);
  //pc2.gx = pc.localizacaoGX(this);
  //pc2.gy = pc.localizacaoGY(this);
  
  for(i = this.bombs.length -1; i >=0; i--){
      if(this.bombs[i].timeoutBomba(dt)){
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
        this.bombs.splice(i,1);
      } 
  }
}



Map.prototype.tempoAcabou = function() {
  if(this.tempo < 0){
    this.gameOver = true;
  }
};

Map.prototype.vitoriaObtida = function() {
  if(this.tesouros.length == this.pontuacao){
    this.victory = true;
  }
};

/*Map.prototype.mover = function (dt) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].mover(this,dt);
  }
};
Map.prototype.perseguir = function (alvo) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].perseguir(alvo);
  }
};*/
