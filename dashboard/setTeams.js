function set(bool){
	const teamA = {
		name: (document).getElementsByClassName('teamname')[0].value,
		score: (document).getElementsByClassName('score')[0].value
	};
	const teamB = {
		name: (document).getElementsByClassName('teamname')[1].value,
		score: (document).getElementsByClassName('score')[1].value
	};
	let data;

	if (bool) {
		(document).getElementsByClassName('teamname')[0].value = teamB.name;
		(document).getElementsByClassName('score')[0].value = teamB.score;

		(document).getElementsByClassName('teamname')[1].value = teamA.name;
		(document).getElementsByClassName('score')[1].value = teamA.score;

		data = {teamA: teamB, teamB: teamA};
	}
	else {
		data = {teamA: teamA, teamB: teamB};
	}
	send(data);
}

function send(data) {
	nodecg.sendMessage("ingame", data);
}

