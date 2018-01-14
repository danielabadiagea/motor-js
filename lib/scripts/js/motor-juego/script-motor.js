			var canvas = document.getElementById("canvas");
		 	var ctx = canvas.getContext("2d");
		 	var estado = false;
		 	var bucle;
		 	var boton = document.getElementById("boton");
		 	boton.addEventListener("click", iniciarParar);
		 	canvas.style.cursor = "none";
		 	
		 	function colisiones(){
		 		
		 	}
		 	function dibujar(){
		 		ctx.clearRect(0,0,canvas.width,canvas.height);
		 		dibujarMira();
		 	}
		 	function actualizar(){
		 		
		 	}
		 	function frame(){
		 		actualizar();
		 		colisiones();
		 		dibujar();
		 		bucle = requestAnimationFrame(frame);
		 	}
		 	function iniciarParar(){
		 		if(!estado){
		 			estado = true;
		 			frame();
		 		} else {
		 			estado = false;
		 			cancelAnimationFrame(bucle);
		 		}
		 	}