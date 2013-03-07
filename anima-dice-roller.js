$('#home_luck_button').click(function(){ 
	if ($(this).attr("luck") == "none") {
		console.log("luck=none. Set to good");
		$(this).text("Good Luck Advantage").attr('luck', 'good').button("refresh");
	} else if ($(this).attr("luck") == "good") {
		console.log("luck=good. Set to bad");
		$(this).text("Bad Luck Disadvantage").attr('luck', 'bad').button("refresh");
	} else {
		console.log("luck=bad. Set to none");
		$(this).text("No Luck Advantage/Disadvantage").attr('luck', 'none').button("refresh");

	}
});

$('#home_master_button').click(function(){ 
	if ($(this).attr("master") == "true") {
		console.log("master=true. Set to false");
		$(this).text("Master Disabled").attr('master', 'false').button("refresh");
	} else {
		console.log("master=false. Set to true");
		$(this).text("Master Enabled").attr('master', 'true').button("refresh");
	}
});

$('#home_openroll_button').click(function(){
	if ($(this).attr("openroll") == "true") {
		console.log("openroll=true. Set to false");
		$(this).text("Open Rolls Disabled").attr('openroll', 'false').button("refresh");
	} else {
		console.log("openroll=false. Set to true");
		$(this).text("Open Rolls Enabled").attr('openroll', 'true').button("refresh");
	}
});

$('#home_d100_roll').click(function(){
	var total = 0;
	var random_number;
	var penalty = Math.ceil(Math.random()*100);
	var result_content = "<b>Result:</b> ";
	var penalty_chart = [-15, 0, 15];
	var open_roll_range_adjustment = 0; // negative number increases open roll chance
	var fumble_range_adjustment = 0; // positive number increases fumble chance
	
	if ($('#home_luck_button').attr("luck") == "good") {
		fumble_range_adjustment -= 1;
	}
	if ($('#home_luck_button').attr("luck") == "bad") {
		fumble_range_adjustment += 1;
	}
	if ($('#home_master_button').attr("master") == "true") {
		fumble_range_adjustment -= 1;
	}
	
	var open_roll_range = 89 + open_roll_range_adjustment;
	var fumble_range = 3 + fumble_range_adjustment;
	
	do {
		random_number = Math.ceil(Math.random()*100);
		total += random_number;
		open_roll_range += 1;
		if (open_roll_range > 100) {
			open_roll_range = 100;
		}
	} while ((random_number >= open_roll_range) && ($('#home_openroll_button').attr("openroll") == "true"));
	
	result_content += total;
	
	// FUMBLE CHECKS
	if (total == (fumble_range)) {
		penalty -= 15;
		if (penalty < 0) {
			penalty = 0;
		}
		total -= penalty;
		result_content += " FUMBLE! Final Result = " + total;
	} else if (total == (fumble_range - 1)) {
		total -= penalty;
		result_content += " FUMBLE! Final Result = " + total;
	} else if (total <= (fumble_range - 2)) {
		penalty += 15;
		total -= penalty;
		result_content += " FUMBLE! Final Result = " + total;
	}

	$('#home_roll_result').html(result_content);
});
