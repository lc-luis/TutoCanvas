function inicio()
{
	dibujo = document.getElementById("miCanvas");
	ctx = dibujo.getContext("2d");
	//var interval = window.setInterval(cargarMedia,1000/55);
	//Ejecutar Funciones
	cargarImagenes();
	dibujarFondo();
	dibujarFondoTrasparente();
	dibujarTexto();
}

//Variables
var dibujo, ctx, fondo;

//Fin Variables

function cargarImagenes()
{
	fondo = new Image();
	fondo.src = 'img/fondo.png';
}

function dibujarFondo()
{
	ctx.drawImage(fondo,0,0,400,200);
}

/*function dibujarTexto()
{
	
}*/

function dibujarFondoTrasparente()
{
	ctx.save();
	ctx.globalAlpha = 0.7;
	ctx.beginPath();
	ctx.rect(0, 0, ctx.width, ctx.height);
	ctx.fillStyle = "grey";
	ctx.fill();
	ctx.restore();
	//Borrar el rectangulo
	//context.clearRect(0, 0, ctx.width, ctx.height);
}