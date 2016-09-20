var cx = 0, bx = 0;
var cy = 0, by = 0;
var currentDirectionIndex = 1;
var dirs = ["N", "E", "S", "W"];
var error = "huh?";
var mount = "the Mountain is in the way!";
var invInput = "Invalid Input";
function buildGrid(x, y) {

	for (var i = 0; i < x; i++) {
		var id = "row" + i;
		var w = 100;
		var h = 100;
		$("#table").append("<tr id='" + id + "'></tr>");
		for (var j = 0; j < y; j++) {
			$("#row" + i).append("<td id='grid" + j + "x" + i + "'></td>");
		}
		cx = Math.floor((Math.random() * 2));
		cy = Math.floor((Math.random() * 2));
		bx = cx + 2;
		by = cy + 2;

	}
	console.log("grid" + cx + "x" + cy);
	$("#grid" + cx + "x" + cy).append("<img id='rover' src='images/roverE.png'>");
	$("#grid" + bx + "x" + by).append("<img id='barrier' src='images/barrier.png'>");
	move("W");
}

function program() {
	console.log($("#path").val());
	var path = $("#path").val();
	var pArray = path.split(",");
	for (var i = 0; i < pArray.length; i++) {
		if (pArray[i].toLowerCase() == 'r' || pArray[i].toLowerCase() == 'l') {
			changeDirection(getDirection(pArray[i]));
		} else if (pArray[i].toLowerCase() == 'f' || pArray[i].toLowerCase() == 'b') {
			if (!move(pArray[i].toLowerCase()))
			{
				alert(error);
				break;
			}
		} else
		{
			alert(invInput + " " + pArray[i] );
			break;
		}
	}

}
function getDirection(inst) {

	if (inst == 'r') {
		currentDirectionIndex += 1;
	} else if (inst == 'l')
		currentDirectionIndex -= 1;

	if (currentDirectionIndex == 4)
		currentDirectionIndex = 0;
	if (currentDirectionIndex == -1)
		currentDirectionIndex = 3;
	return dirs[currentDirectionIndex];
}
function move(dir) {
	var x = cx;
	var y = cy;
	if (currentDirectionIndex == 0) {
		if (dir == 'f') {
			y -= 1;
		} else {
			y += 1;
		}
	} else if (currentDirectionIndex == 1) {
		if (dir == 'f') {
			x += 1;
		} else {
			x -= 1;
		}
	} else if (currentDirectionIndex == 2) {
		if (dir == 'f') {
			y += 1;
		} else {
			y -= 1;
		}
	} else if (currentDirectionIndex == 3) {
		if (dir == 'f') {
			x += 1;
		} else {
			x -= 1;
		}
	}
	if (x == -1)
		x = 3;
	else if (x == 4)
		x = 0;
	if (y == -1)
		y = 3;
	else if (y == 4)
		y = 0;
	console.log(x + " " + y + " ");
	console.log(cx + " " + cy + " ");
	if (!checkForBarrier(x, y)) {
		$("#rover").remove();
		cx = x;
		cy = y;
		$("#grid" + cx + "x" + cy).append("<img id='rover' src='images/rover" + dirs[currentDirectionIndex] + ".png'>");
		return true;

	} else
		return false;

}
function changeDirection(d) {
	currentDirection = d;
	console.log('images/rover' + d + '.png');
	$("#rover").attr('src', 'images/rover' + d + '.png');
}
function checkForBarrier(x, y) {
	if (x == bx && y == by) {
		//alert(mount);
		error = mount;
		return true;
	} else
		return false;

}
