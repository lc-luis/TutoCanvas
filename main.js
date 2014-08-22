function inicio()
{
	dibujo = document.getElementById("miCanvas");
	ctx = dibujo.getContext("2d");
	//var interval = window.setInterval(cargarMedia,1000/55);
	//Ejecutar Funciones
	cargarImagenes();
	dibujarFondo();
	dibujarFondoTrasparente();
	dibujarTexto('Click aquí para empezar !!', 60, 100, 'Bold 18pt Arial');
	dibujo.addEventListener("click", pulsacion);
	agregarEventosTeclado();
}

//Variables
var dibujo, ctx, fondo, ovni, pulsaciones = 0;
var velocidad = 5, run = [false,false,false,false,false,false,false];
var direccion = velocidad, iniciar = false, x = 50, y = 30, intervalo;
var ft =
{
	x: 0,
	y: 0,
	width: 400,
	height: 200
};
var nave =
{
	x: 100,
	y: 100,
	width: 70,
	height: 70
};
var teclado = {};
//Fin Variables

function cargarImagenes()
{
	fondo = new Image();
	fondo.src = 'img/fondo.png';
	ovni = new Image();
	ovni.src = 'img/ovni4.png';
}

function dibujarFondo()
{
	ctx.drawImage(fondo,0,0,dibujo.width,dibujo.height);
}

function dibujarCaja()
{
	ctx.save();
	ctx.beginPath();
	ctx.rect(15,100,365,60);
	ctx.fillStyle = 'white';
	ctx.shadowColor = 'black';
	ctx.shadowBlur = 10;
	ctx.shadowOffsetX = 10;
	ctx.shadowOffsetY = 10;
	ctx.fill();
	ctx.restore();
}

function dibujarTexto(texto, x, y, letra)
{
	ctx.save();
	ctx.font = letra;
	ctx.fillText(texto, x, y);
	ctx.restore();
}

function dibujarFondoTrasparente()
{
	ctx.save();
	ctx.globalAlpha = 0.7;
	ctx.beginPath();
	ctx.rect(ft.x, ft.y, ft.width, ft.height);
	ctx.fillStyle = "grey";
	ctx.fill();
	ctx.restore();
}

function dibujarNave()
{
	ctx.save();
	ctx.beginPath();
	//ctx.fillStyle = "black";
	//ctx.rect(nave.x, nave.y, nave.width, nave.height);
	ctx.drawImage(ovni, nave.x, nave.y, nave.width, nave.height);
	ctx.fill();
	ctx.restore();
}

function pulsacion()
{
	if(pulsaciones == 0)
	{
		if(run[0] == false)
		{
			pulsaciones = 1;
			dibujarFondo();
			dibujo.addEventListener('mousemove', function(evt){
			var mousePos = getMousePos(evt);
			var coords = mousePos.x + ',' + mousePos.y;
			escribirCoordenadas(coords);
			if(pulsaciones == 1)
				{
					dibujarTexto('Coordenadas:', 255, 15, 'Bold 10pt Arial');
					pulsaciones = 2;
					pulsacion();
				}
			}, false);
			run[0] = true;
		}
	}
	if(pulsaciones == 2)
	{
		if(run[2] == false)
		{
			setTimeout(function()
				{
					dibujarCaja();
					dibujarTexto('Ej.1 | Captura Coordenadas', 20, 140, '18pt Arial');
				},6000);

			setTimeout(function()
				{
					dibujarCaja();
					dibujarTexto('Haz click aquí para continuar...', 20, 140, 'Bold 18pt Arial');
					pulsaciones = 3;
				},15000);
			run[2] = true;
		}	
	}
	if(pulsaciones == 3)
	{
		if(run[3] == false)
		{
			ctx.clearRect(0,0,400,200);
			dibujarFondo();
			setTimeout(function()
				{
					pulsaciones = 4;
					dibujarCaja();
					dibujarTexto('Ej.2 | Pelota en movimiento', 20, 140, '18pt Arial');
				},1000);
			run[3] = true;
		}
	}
	if(pulsaciones == 4)
	{
		if(run[4] == false)
		{
			ctx.clearRect(0,0,400,200);
			dibujarFondo();
			intervalo = window.setInterval(function(){
							moveAndDraw(dibujo, ctx);
						}, 1000/55);
			setTimeout(function()
				{
					pulsaciones = 5;
					window.clearInterval(intervalo);
					dibujarCaja();
					dibujarTexto('Haz click aquí para continuar...', 20, 140, 'Bold 18pt Arial');
				},10000);
			run[4] = true;
		}
	}
	if(pulsaciones == 5)
	{
		if(run[5] == false)
		{
			ctx.clearRect(0,0,400,200);
			dibujarFondo();
			dibujarCaja();
			dibujarTexto('Ej.3 | Mover dibujo con Teclado', 20, 125, '16pt Arial');
			dibujarTexto('Utiliza las flechas del Teclado', 80, 155, '10pt Arial');
			setTimeout(function(){
				ctx.clearRect(0,0,400,200);
				dibujarFondo();
				pulsaciones = 6;
			}, 4000);
			run[5] = true;
		}
	}
	if(pulsaciones == 6)
	{
		if(run[6] == false)
		{
			var intervalo2 = window.setInterval(function(){
				frameLoop1();
			}, 32);
			run[6] = true;
		}
	}
}

function moveAndDraw(canvas, ctx)
{
	if(y > (canvas.height - 20))
	{
		direccion = -velocidad;
	}
	if(y < 20)
	{
		direccion = velocidad;
	}
	y += direccion;
	draw(canvas,ctx,x,y);
}

function draw(canvas, ctx, x, y)
{
	canvas.width = canvas.width;
	dibujarFondo();
	ctx.arc(x,y,20,0,(Math.PI * 2));
	ctx.fill();
}

function getMousePos(evt)
{
	var rect = dibujo.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function escribirCoordenadas(coords)
{
	if(pulsaciones < 3)
	{
		ctx.save();
		ctx.font = '13pt Calibri';
		ctx.clearRect(345,0,400,16);
		ctx.fillText(coords, 345,15);
		ctx.restore();
	}
}

function agregarEventosTeclado()
{	
	agregarEventos(document, "keydown", function(e)
	{
		//Ponemos en true la tecla presionada
		teclado[e.keyCode] = true;
		console.log(e.keyCode);
	});
	agregarEventos(document, "keyup", function(e)
	{
		//Ponemos en falso la tecla soltada
		teclado[e.keyCode] = false;
	});

	function agregarEventos(elemento, nombreEvento, funcion)
	{
		if (elemento.addEventListener) 
		{
			//Navegadores de verdad
			elemento.addEventListener(nombreEvento, funcion, false);
		} 
		else if(elemento.attachEvent)
		{
			//IExplorer
			elemento.attachEvent(nombreEvento, funcion);
		};
	}
}

function moverNave()
{
	if(teclado[37])//Flecha izquierda
	{
		//Movimiento a la izquierda
		nave.x -=10;
		if(nave.x < 0)
		{
			nave.x = 0;
		}
	}
	if(teclado[39])//Flecha derecha
	{
		//Movimiento a la derecha
		var limite = dibujo.width - nave.width;
		nave.x +=10;
		if(nave.x > limite)
		{
			nave.x = limite;
		}
	}
	if(teclado[38])//Flecha arriba
	{
		//Movimiento arriba
		nave.y -=10;
		if(nave.y < 0)
		{
			nave.y = 0;
		}
	}
	if(teclado[40])//Flecha abajo
	{
		//Movimiento abajo
		var limite = dibujo.height - nave.height;
		nave.y +=10;
		if(nave.y > limite)
		{
			nave.y = limite;
		}
	}
}

function frameLoop1()
{
	dibujarFondo();
	moverNave();
	dibujarNave();
}
