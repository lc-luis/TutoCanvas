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
}

//Variables
var dibujo, ctx, fondo, pulsaciones = 0;
var velocidad = 5, run = false;
var direccion = velocidad, iniciar = false, x = 50, y = 30, intervalo;
var ft =
{
	x: 0,
	y: 0,
	width: 400,
	height: 200
}
//Fin Variables

function cargarImagenes()
{
	fondo = new Image();
	fondo.src = 'img/fondo.png';
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

function pulsacion()
{
	if(pulsaciones == 0)
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
				pulsaciones= 2;
				pulsacion();
			}
		}, false);
		
	}
	if(pulsaciones == 2)
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
				dibujo.removeEventListener('mousemove', function(evt){},false);
				dibujo.addEventListener("click", pulsacion);
			},15000);		
	}
	if(pulsaciones == 3)
	{
		ctx.clearRect(0,0,400,200);
		dibujarFondo();
		setTimeout(function()
			{
				pulsaciones = 4;
				dibujarCaja();
				dibujarTexto('Ej.2 | Pelota en movimiento', 20, 140, '18pt Arial');
			},3000);
	}
	if(pulsaciones == 4)
	{
		if(run == false)
		{
			ctx.clearRect(0,0,400,200);
			dibujarFondo();
			intervalo = window.setInterval(function(){
							moveAndDraw(dibujo, ctx);
						}, 32);
						iniciar = true;
			setTimeout(function()
				{
					dibujo.addEventListener('click', pulsacion);
					pulsaciones = 5;
					window.clearInterval(intervalo);
					dibujarCaja();
					dibujarTexto('Haz click aquí para continuar...', 20, 140, 'Bold 18pt Arial');
				},10000);
			run = true;
		}
	}
	if(pulsaciones == 5)
	{
		ctx.clearRect(0,0,400,200);
		dibujarFondo();
		dibujarCaja();
		dibujarTexto('Ej.3 | Mover Pelota con Teclado', 20, 125, '16pt Arial');
		dibujarTexto('Utiliza las flechas del Teclado', 80, 155, '10pt Arial');
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