const colors = {
	"7th squad": "#0c18c7",
	"Carpe Diem": "#8347c1",
	"Press W": "#ff1c26",
	"F30" : "#620404",
	"KnivesOut": "#ff551b",
	"Modern Renegades": "#fffaff",
	"Phoenix" : "#ff9705",
	"Team Useless Tongue": "#ff4ba1",
	"Truly Cake": "#383838",
	"White Dragon": "#7f7f7f",
	"Tale Quale": "#1349a8",
	"Cura te ipsum": "#f2bf28",
	"Oniel": "#8191aa",
	"Strike Champagne": "#4d7a43",
	"Svintus.PRO": "#eb7007",
	"Memento Mori": "#75a6e0",
	"OCTAHOR": "#8d6e3f",
	"Fire of Mercy": "#ad481b",
	"A.W.A.": "#65D0D4",
	"Team Fury": "#aAaAaA",
	"Кавай Десу Сугой Чан": "#ffa1ec"
};

function obtainData(){
	let data = {
		maps:[],
		info:{colors:[], score: [0,0]}
	};

	for (let i=0; i<5; i++){
		let s1 = document.getElementsByClassName('score')[i*2].value;
		let s2 = document.getElementsByClassName('score')[i*2+1].value;
		let map = document.getElementsByClassName('maps')[i];
		map = map.options[map.selectedIndex].text;

		data.maps.push({
			map: map, score1:s1, score2:s2
		});
		s1 > s2 ? data.info.score[0]++ : (s1 < s2 ? data.info.score[1]++ : true);
	}

	for (let i=0; i<2; i++){
		let code = document.getElementsByClassName('colorpicker')[i].value.toUpperCase();
		console.log(code);
		let r = parseInt(code.slice(1,3),16),
			g = parseInt(code.slice(3,5), 16),
			b = parseInt(code.slice(5,7),16);
		let num = `rgba(${r}, ${g}, ${b}, 0.5)`;
		data.info.colors.push(num);
	}

	let team_a = document.getElementsByClassName("team-a")[0];
	team_a = team_a.options[team_a.selectedIndex].text;
	let team_b = document.getElementsByClassName("team-b")[0];
	team_b = team_b.options[team_b.selectedIndex].text;

	let teams;
	teams = [team_a, team_b];

	data.info = {
		caster: document.getElementsByClassName('castername')[0].value,
		stage: document.getElementsByClassName('stage')[0].value,
		colors: data.info.colors,
		teams: teams,
		score: data.info.score
	};

	console.log(data);

	//nodecg.sendMessage("pauseData", data);

	fetch('/my-bundle/set', {method: 'POST', body: JSON.stringify(data), headers: {
			'Content-Type': 'application/json'
		}});

	nodecg.sendMessage('pauseData', data);

	return data;
}

function setIMG(elem){
	var className = elem.className;
	console.log(className);
	var teamName = document.getElementsByClassName(className)[0];
	teamName = teamName.options[teamName.selectedIndex].text;
	var imgDOM = document.getElementsByClassName(className+'-img')[0];
	imgDOM.src =  `/my-first-bundle/teamImg/${teamName}`;

	let rgba = colors[teamName];
	document.getElementById(`colorpicker-${className}`).value = rgba;
}

function switchSides(data, onreverse){
	let res = {
		teams: [NaN, NaN],
		score: [NaN, NaN]
	};
	console.log(data.info.teams);
	console.log(data.info.score);
	console.log(onreverse);
	if (!onreverse){
		res.teams = data.info.teams;
		res.score = data.info.score;
	}
	else {
		res.teams = data.info.teams.reverse();
		res.score = data.info.score.reverse();
	}
	res.stage = data.info.stage;

	nodecg.sendMessage('ingame', res);
}

