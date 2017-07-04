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
        /*ctx.fillStyle = "white";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);*/
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
        ctx.fillStyle = "gray";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.fillStroke = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      if(this.cells[r][c] == 5){
        ctx.fillStyle = "gray";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.fillStroke = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
    }
  }

  

};

/*Map.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.tesouros.length; i++) {
      if(this.tesouros[i].colidiuCom(alvo)){
        resolveColisao(this.tesouros[i], alvo);
      }
    }
};

Map.prototype.colidiuComTesouro = function(pc){
  for(var i = this.tesouros.length-1; i>=0; i--){

    this.colidiuCom(pc,
        function(tesouro){
            tesouro.visivel = true;
            console.log("aqui");
        }
      );
  }
};*/

Map.prototype.showInformations = function(ctx){
  
  // -- Minas --

  ctx.font="20px Verdana";
  ctx.fillStyle = "red";
  ctx.fillText("Minas: " + this.minasQtd, 285, 80);
  
  // -- Tesouros --

  ctx.fillStyle = "green";
  ctx.fillText("Tesouros: " + this.tesourosQtd, 285, 100);

  // -- Pontuação --

  ctx.fillStyle = "purple";
  ctx.fillText("Pontuação: " + this.pontuacao, 285, 120);

  // -- Tempo --

  ctx.fillStyle = "black"
  ctx.fillText("Tempo", 285, 20);
  if(!this.gameOver){
    ctx.fillStyle = "orange"
    ctx.fillRect(285, 30, this.tempo, 10);
    ctx.strokeRect(285, 30, this.tempo, 10);
  }
  
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
          //console.log(i);
          //console.log(j);
          /*newEnemy = new Sprite();
          newEnemy.images = this.images;
          newEnemy.y = (i+0.5)*this.SIZE;
          newEnemy.x = (j+0.5)*this.SIZE;
          this.enemies.push(newEnemy);*/
          break;
        case 3:
          this.cells[i][j] = 3;
          break;
        case 4:
          this.cells[i][j] = 4;
          newTesouro = new Sprite();
          newTesouro.y = (i+0.5)*this.SIZE;
          newTesouro.x = (j+0.5)*this.SIZE;
          newTesouro.imgKey = "tesouro";
          newTesouro.color = "green";
          this.tesouros.push(newTesouro);
          break;
        case 5:
          this.cells[i][j] = 5;
          newMina = new Sprite();
          newMina.y = (i+0.5)*this.SIZE;
          newMina.x = (j+0.5)*this.SIZE;
          newMina.imgKey = "mina";
          newMina.color = "red";
          this.minas.push(newMina);
          break;
        default:
          this.cells[i][j] = 0;
      }
    }
  }
};

Map.prototype.bomba = function (alvo, ctx){
  var bomba = new Sprite();
  bomba.y = (alvo.localizacaoGY(this)+0.5)*this.SIZE;
  bomba.x = (alvo.localizacaoGX(this)+0.5)*this.SIZE;
  bomba.color = "blue";
  this.bombs.push(bomba);
  console.log(pc1.localizacaoGX(map));
  console.log(pc1.localizacaoGY(map));
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
