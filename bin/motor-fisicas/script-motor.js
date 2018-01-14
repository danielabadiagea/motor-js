        window.onload= function () {
            'use strict'
            
            //Objetos
            var Ball=function(x, y,r,color,keys){
                this.keys={
                    left:keys.left,
                    right:keys.right,
                    jump:keys.jump,
                    down:keys.down
                };
                //Posicion del centro de la bola
                this.pos= {
                    x:x,
                    y:y
                }
                //Radio de la bola
                this.rad=r;
                //Vector velocidad de la bola
                this.vel = {
                    x:0,
                    y:0
                }
                //Color de la bola
                this.color=color;
                //Perdida de energia por rebote,
                //NO pierde energia:0
                //Pierde un 20%:0.2
                //perdida total de energia:1
                this.damping=0;
                //Resistencia al aire
                this.airResist=0;
                //Coeficiente de rozamiento solo se aplica cuando está en el suelo
                this.friction=0.05;
                this.speed=0.35;
                
            }

            //Objeto Juego
            var Game=function(canvas,fps){
              //Variables del entorno de juego
                this.canvas = canvas;
                this.ctx = this.canvas.getContext("2d");
                this.fps = fps;//Fps a actualizar
                this.ticks = 1000 / fps; //Millisegundos por tick a actualizar
                this.W=this.ctx.canvas.width;//Ancho del canvas
                this.H=this.ctx.canvas.height;//Alto del canvas
                this.balls = new Array();//Bolas en el campo
                this.gravity=0.5;//Valor de la gravedad
                this.keys=new Array();//Teclas Pulsadas en el juego
                //Funci�n para a�adir una bola al juego.
                this.addBall = function(newBall){
                    this.balls.push(newBall);
                }
                this.clear = function(){
                    this.ctx.clearRect(0,0,this.W,this.H);
                }
                //Funcion para dibujar el canvas 
                this.runTick=function(){
                    
                    for(var i=0;i<this.balls.length;i++)
                    {
                        var b=this.balls[i];

                        //Teclado
                        if(this.keys[b.keys.left]){
                            b.vel.x-= b.speed;
                        }
                        if(this.keys[b.keys.right]){
                            b.vel.x+= b.speed;
                        }
                        if(this.keys[b.keys.jump]){
                            b.vel.y-= b.speed;
                        }
                        if(this.keys[b.keys.down]){
                            b.vel.y+= b.speed;
                        }
                        //Actualizamos las velocidades
                        b.vel.y +=this.gravity;
                        b.vel.y*=(1-b.airResist);
                        b.vel.x*=(1-b.airResist);

                        //Actualizamos la posicion
                        b.pos.y +=b.vel.y;
                        b.pos.x +=b.vel.x;
                        //Colision con suelo
                        if(b.pos.y>this.H- b.rad){
                            b.pos.y=this.H- b.rad;
                            b.vel.y*=-(1-b.damping);
                            b.vel.x*=(1-b.friction);
                        }
                        if(b.pos.y< b.rad){
                            b.pos.y=b.rad;
                            b.vel.y*=-(1-b.damping);
                            b.vel.x*=(1-b.friction);
                        }
                        //Colisión con paredes
                        if(b.pos.x>this.W- b.rad||b.pos.x-b.rad<0){
                            b.pos.x=b.pos.x-b.rad<0?b.rad:this.W- b.rad;
                            b.vel.x*=-(1-b.damping);
                        }
                    }
                    this.draw();
                }
                this.draw = function(){
                    //Limpiamos el canvas.
                    this.clear();
                    //Recorremos todas las bolas y las dibujamos
                    for(var i=0;i<this.balls.length;i++)
                    {
                        var b=this.balls[i];
                        this.ctx.beginPath();
                        //Dibuja una bola
                        this.ctx.arc(b.pos.x, b.pos.y, b.rad, 0, Math.PI*2, true);
                        //Color de la bola
                        this.ctx.fillStyle= b.color;
                        this.ctx.fill();
                        //Reborde de la bola
                        this.ctx.lineWidth = 2;
                        this.ctx.strokeStyle = 'black';
                        this.ctx.stroke();
                        this.ctx.closePath();
                    }
                }
            }


            //Parametros iniciales basicos para crear el contexto 2D
            var canvas = document.getElementById("canvas");
            var game = new Game(canvas, 60);
            game.addBall(new Ball(game.W/2,game.H/2,20,"orange",{left:65, right:68, jump:87, down:83}));

            //Dibujamos el canvas

            this.addEventListener("keydown",keyDownHandler,true);
            this.addEventListener("keyup",keyUpHandler,true);

            function keyDownHandler() {
                //evt = evt || window.event;

                //console.log(event.keyCode);
                game.keys[event.keyCode] = true;
            };

            function keyUpHandler(e){
                delete game.keys[e.keyCode];
            };
            setInterval(function () {
                game.runTick();
            }, game.ticks)
        };