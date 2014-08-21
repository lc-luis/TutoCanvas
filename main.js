var dibujo, ctx, fondo;
function inicio()
{
	dibujo = document.getElementById("miCanvas");
	ctx = dibujo.getContext("2d");
	//var interval = window.setInterval(cargarMedia,1000/55);
}

function cargarImagenes()
{
	fondo = new Image();
	fondo.src = 'img/fondo.png';
}

function dibujarFondo()
{
	ctx.drawImage(fondo,0,0,400,200);
}

/*function cargarMedia()
{
	cargarImagenes();
}*/

//Ejecutar Funciones
cargarImagenes();
dibujarFondo();