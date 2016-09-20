var cx=0,bx=0;
var cy=0,by=0;
var error="huh?";
var mount="the Mountain is in the way!";
var invInput="Invalid Input";
function buildGrid(x,y)
{
	
	for(var i=0;i<x;i++)
	{
		var id="row"+i;
		var w=100;
		var h=100;
		$("#table").append("<tr id='"+id+"'></tr>");
		for (var j=0;j<y;j++)
		{
			$("#row"+i).append("<td id='grid"+j+"x"+i+"'></td>");
		}
		cx=Math.floor((Math.random() * 2));
		cy =Math.floor((Math.random() * 2));
		bx=cx+2;
		by =cy+2;
		
	}
	console.log("grid"+cx+"x"+cy);
	$("#grid"+cx+"x"+cy).append("<div id='rover'><img src='images/roverE.png'></div>");
		$("#grid"+bx+"x"+by).append("<div id='barrier'><img src='images/barrier.png'></div>");
		move("W");
}

function program()
{
	console.log($("#path").val());
	var path=$("#path").val();
	var pArray= path.split(",");
	for (var i=0;i<pArray.length;i++)
	{
		if(!move(pArray[i]))
		{
			alert(error);
			break;
		}
	}
		
}
function move(dir)
{
	var d = "N";
	dir=dir.toLowerCase();
	var x=cx;
	var y=cy;
	if (dir=="f")
	{
		d="N";
		if (y==0)
			y=3;
		else
			y=y-1;
	}
	else if(dir=="r")
	{
		d="E";
		if(x==3)
			x=0;
		else
		x=x+1;
	}
	else if(dir=="b")
	{
		d="S";
		if (y==3)
			y=0;
		else
		y=y+1;
	}
	else if (dir=="l")
	{
		d="W";
		if (x==0)
			x=3;
		else
		x=x-1;
	}
	else
	{
		error=invInput;
		return false;
	}
	console.log(x+" "+y +" ");
	console.log(cx+" "+cy +" ");
	if(!checkForBarrier(x,y))
	{
		$("#rover").remove();
		cx=x;
		cy=y;
		$("#grid"+cx+"x"+cy).append("<div id='rover'><img src='images/rover"+d+".png'></div>");
		return true;
		
	}
	else 
		return false;
		
}
function checkForBarrier(x,y)
{
	if (x==bx && y==by)
	{
		//alert(mount);
		error=mount;
		return true;
	}
	else 
		return false;
	
}