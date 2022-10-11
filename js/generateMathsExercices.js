var variations = []
var signes = []
var graph
var A = 0
var B = 0
var C = 0
var x1 = 0
var x2 = 0

function getQuestion() {

}

function getAnswer() {

}

function generate2PolynomeFunction () {

}

function xInPointList(points, x) {
	for (let i = 0 ; i < points.length ; i++) {
		if (points[i][0] === x) {
			return true
		}
	}
	return false
}

function getRandomInt(min=0, max=5, infsup=false) {
	let val = min + Math.floor(Math.random() * (max-min))
	if (infsup) {
		if (Math.random() < 0.5) {
			return val
		}
		return (-val)
	}
	return val
}

function sortFunction(a, b) {
	if (a[0] === b[0]) {
		return 0;
	}
	else {
		return (a[0] < b[0]) ? -1 : 1;
	}
}

function yIn(points, y) {
	for (let p in points) {
		if (points[p][1] === y) {
			return true
		}
	}
}

function resettable() {
	document.getElementById('xline').innerHTML = ""
	let th = document.createElement('th')
	th.innerHTML = "x"
	document.getElementById('xline').append(th)

	document.getElementById('fxline').innerHTML = ""
	let td = document.createElement('td')
	td.innerHTML = "f(x)"
	document.getElementById('fxline').append(td)
}

function getTableVariation(points) {
	resettable()
	let copy = [...points]
	let sens = 0
	let i = 0
	while (i < copy.length) {
		if (i >= 1) {
			if (copy[i][1] === copy[i-1][1]) {
				copy.splice(i, 1)
			}
			else if (copy[i][1] < copy[i-1][1] ) {
				if (sens === -1) {
					copy.splice(i-1, 1)
				}
				else {
					i += 1
					sens = -1
				}
			}
			else {
				if (sens === 1) {
					copy.splice(i-1, 1)
				}
				else {
					i += 1
					sens = 1
				}
			}
		}
		else {
			i += 1
		}
	}

	let td
	for (let p in copy) {
		td = document.createElement("td")
		td.innerHTML = copy[p][0]
		document.getElementById("xline").append(td)
		if (p < copy.length-1) {
			document.getElementById("xline").append(document.createElement("td"))
		}

		if (p >= 1) {
			td = document.createElement("td")
			if (copy[p][1] < copy[p-1][1]) {
				td.innerHTML = "<i class=\"fa fa-arrow-circle-down\" style=\"font-size:36px\"></i>"
			}
			else {
				td.innerHTML = "<i class=\"fa fa-arrow-circle-up\" style=\"font-size:36px\"></i>"
			}
			document.getElementById("fxline").append(td)

			td = document.createElement("td")
			td.innerHTML = copy[p][1]
			document.getElementById("fxline").append(td)
		}
		else {
			td = document.createElement("td")
			td.innerHTML = copy[p][1]
			document.getElementById("fxline").append(td)
		}
	}
	return copy
}

function generateGraph() {
	let nbVariations = getRandomInt(3, 8)
	let step = getRandomInt(1, 3)
	graph = new jsGraphDisplay({
		margin: {
			top: 25,
			right: 10,
			bottom: 20,
			left: 10
		},
		axe: {
			arrow: true,
			thickness: 1,
			x: {
				title: "Abscisse",
				step: step
			},
			y: {
				title: "Ordonnée",
				step: step
			}
		}
	});

	let points = []
	let maxX = -10
	let minX = 10
	let maxY = -10
	let minY = 10
	for (let i = 0 ; i < nbVariations ; i++) {
		x = 0
		y = 0

		do {
			x = getRandomInt(0, 10,  true)
		} while (xInPointList(points, x))

		if (x < minX) {
			minX = x
		}
		if (x > maxX) {
			maxX = x
		}

		do {
			y = getRandomInt(0, 10, true)
		} while (yIn(points, y))

		if (y < minY) {
			minY = y
		}
		if (y > maxY) {
			maxY = y
		}

		points.push([x, y])
	}
	points.sort(sortFunction)
	graph.DataAdd({
		data: [[0, minY], [0, maxY]],
		display: {
			linkType: "line",
			linkWidth: 2,
			linkColor: "#000",
			dataType: "circle",
			dataWidth: 0
		}
	})
	graph.DataAdd({
		data: [[minX, 0], [maxX, 0]],
		display: {
			linkType: "line",
			linkWidth: 2,
			linkColor: "#000",
			dataType: "circle",
			dataWidth: 0
		}
	})
	graph.DataAdd({
		data: points,
		display: {
			linkWidth: 3,
			linkColor: "#a83e32",
			dataType: "circle",
			dataWidth: 0,
		}
	})
	return points
}

var qsimg1 = 0
var qsimg2 = 0
function questionImage() {
	qsimg1 = getRandomInt(0, 5, true)
	//console.log("Réponse = " + getFX(qsimg1))
	let h2 = document.createElement("h1")
	h2.innerHTML = "Quel est la valeur de f(" + qsimg1 + ") ? "
	document.getElementById('img1').append(h2)

	qsimg2 = getRandomInt(0, 5, true)
	//console.log("Réponse = " + getFX(qs))
	h2 = document.createElement("h1")
	h2.innerHTML = "Quelle est / quelles sont les images de " + qsimg2 + " ? "
	document.getElementById('img2').append(h2)
}

function questionAntecedent() {
	let val1 = getRandomInt(0, 5, true)
	let val2 = ""
	let qs = getFX(val1)
	console.log("Qs = " + qs)
	for (let i = -5 ; i <= 5 ; i += 0.0001) {
		let res = getFX(i)
		if ((res === qs) && (i !== val1)) {
			val2 = Math.floor(i*10)/10
			console.log("val2 = " + val2)
			break
		}
	}

	console.log("Quelles sont les antécedents de " + qs)
	if (val2 === "")
		console.log("Réponse = " + val1)
	else
		console.log("Réponse = " + val1 + " et " + val2)
}

function getRacine() {
	let delta = getDelta()
	x1 = (-B + Math.sqrt(delta)) / (2 * A)
	x2 = (-B - Math.sqrt(delta)) / (2 * A)
}

function getDelta() {
	return B * B - 4 * (A * C)
}

function generateFunction() {
	do {
		A = getRandomInt(0, 10, true)
		B = getRandomInt(0, 10, true)
		C = getRandomInt(0, 10, true)
	} while (getDelta() <= 0)
	getRacine()
}

function getFX(x) {
	return A * x * x + B * x + C
}

function getArrayFunction() {
	let X = []
	let Y = []
	for (let i = -5 ; i <= 5 ; i += 0.0001) {
		//tab.push([i, getFX(i)])
		X.push(i)
		Y.push(getFX(i))
	}

	return {
		x: X,
		y: Y,
		type: 'scatter'
	}
}

function generateRandomFunction() {
	generateFunction()
	questionImage()
	questionAntecedent()
	let data = getArrayFunction()
	var layout = {
		title: 'f(x) = ' + A + "x² + " + B + "x + " + C,
		showlegend: false
	};
	Plotly.newPlot('testdiv', [data], layout)

	/*let points = generateGraph()
	questionImage(points)
	questionAntecedent(points)
	getTableVariation(points)
	*/
	document.getElementById("btnValid").style = "visibility: hidden; display: none;"
	document.getElementById("btnNext").style = "visibility: hidden; display: none;"
	document.getElementById("qs").innerHTML = "";
	document.getElementById('tablevariation').style = "visibility: show; display: block;"
	document.getElementById("tableaudevariation").style = "text-align: center;"
	//graph.Draw('graphExemple1')
	generateQuestions()
}

var funcpair = ["(1 + x²) / (x²)", "x²", "2", "1 / (1 + x²)"]
var funcimpair = ["2x / (1 + x²)", "1 / x", "x / (x² + 1)", "x^3 - 3x", "x^3"]
var funcpairimpaire = ["(1 + x) / (1 + x²)", "x² - 3x + 2"]
var func = ""
function generateQuestions() {
	let qs = document.getElementById("qs")
	let h2 = document.createElement("h1")
	let i = getRandomInt(0, 3)
	if (i === 0) {
		func = funcpair[getRandomInt(0, funcpair.length)]
	}
	else if (i === 1) {
		func = funcimpair[getRandomInt(0, funcimpair.length)]
	}
	else {
		func = funcpairimpaire[getRandomInt(0, funcpairimpaire.length)]
	}
	h2.innerHTML = "Est ce que la fonction : f(x) = " + func + " est paire ou impaire ou aucun des deux ?"
	qs.append(h2)
	document.getElementById("btnRep").style = "visibility: show; display: block;"
}

function reponse() {
	let h2 = document.createElement("h1")
	if (funcpair.includes(func)) {
		h2.innerHTML = "La fonction est pair !"
	}
	else if (funcimpair.includes(func)) {
		h2.innerHTML = "La fonction est impair !"
	}
	else {
		h2.innerHTML = "La fonction est n'y impair n'y pair"
	}
	document.getElementById("qs").append(h2)

	h2 = document.createElement("h1")
	h2.innerHTML = getFX(qsimg1)
	document.getElementById('img1').append(h2)

	h2 = document.createElement("h1")
	h2.innerHTML = getFX(qsimg2)
	document.getElementById('img2').append(h2)
}

function checkVariationTable() {

}