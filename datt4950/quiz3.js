
var quiztext = '<p>Which of these is NOT one of the four main components of the theory of natural evolution?</p><ul><li><input type="radio" name="entry.2132821073" value="Population" id="group_2132821073_1" aria-label="Population">Population</li> <li><input type="radio" name="entry.2132821073" value="Diversity" id="group_2132821073_2" aria-label="Diversity">Diversity</li> <li><input type="radio" name="entry.2132821073" value="Heredity" id="group_2132821073_3" aria-label="Heredity">Heredity</li> <li><input type="radio" name="entry.2132821073" value="Selection" id="group_2132821073_4" aria-label="Selection">Selection</li> <li><input type="radio" name="entry.2132821073" value="Development" id="group_2132821073_5" aria-label="Development">Development</li></ul><p>Which of these statements is true of natural evolution?</p><ul><li><input type="radio" name="entry.1888302190" value="Organisms are subject to a pre-defined fitness function" id="group_1888302190_1" aria-label="Organisms are subject to a pre-defined fitness function">Organisms are subject to a pre-defined fitness function</li> <li><input type="radio" name="entry.1888302190" value="If an adaptation performs well in one context, it will perform well in most others" id="group_1888302190_2" aria-label="If an adaptation performs well in one context, it will perform well in most others">If an adaptation performs well in one context, it will perform well in most others</li> <li><input type="radio" name="entry.1888302190" value="Natural evolution implies progress toward a goal" id="group_1888302190_3" aria-label="Natural evolution implies progress toward a goal">Natural evolution implies progress toward a goal</li> <li><input type="radio" name="entry.1888302190" value="All species are in competition with each other" id="group_1888302190_4" aria-label="All species are in competition with each other">All species are in competition with each other</li> <li><input type="radio" name="entry.1888302190" value="Only the fittest organisms can contribute to the gene pool" id="group_1888302190_5" aria-label="Only the fittest organisms can contribute to the gene pool">Only the fittest organisms can contribute to the gene pool</li> <li><input type="radio" name="entry.1888302190" value="Every facet of an organism is subject to evolutionary selection pressure" id="group_1888302190_6" aria-label="Every facet of an organism is subject to evolutionary selection pressure">Every facet of an organism is subject to evolutionary selection pressure</li> <li><input type="radio" name="entry.1888302190" value="Evolution alone is not creative" id="group_1888302190_7" aria-label="Evolution alone is not creative">Evolution alone is not creative</li> <li><input type="radio" name="entry.1888302190" value="None of the above" id="group_1888302190_8" aria-label="None of the above">None of the above</li></ul><p>Which of these statements about artificial evolution is true?</p><ul><li><input type="radio" name="entry.1086235379" value="Any problem can be solved by evolutionary search" id="group_1086235379_1" aria-label="Any problem can be solved by evolutionary search">Any problem can be solved by evolutionary search</li><li><input type="radio" name="entry.1086235379" value="Using a static fitness function makes evolution a form of optimization" id="group_1086235379_2" aria-label="Using a static fitness function makes evolution a form of optimization">Using a static fitness function makes evolution a form of optimization</li><li><input type="radio" name="entry.1086235379" value="The best strategy is always to breed from the fittest candidate" id="group_1086235379_3" aria-label="The best strategy is always to breed from the fittest candidate">The best strategy is always to breed from the fittest candidate</li> <li><input type="radio" name="entry.1086235379" value="Evolution works faster if a fixed fitness function is replaced by a human agent" id="group_1086235379_4" aria-label="Evolution works faster if a fixed fitness function is replaced by a human agent">Evolution works faster if a fixed fitness function is replaced by a human agent</li> <li><input type="radio" name="entry.1086235379" value="All of the above" id="group_1086235379_5" aria-label="All of the above">All of the above</li> <li><input type="radio" name="entry.1086235379" value="None of the above" id="group_1086235379_6" aria-label="None of the above">None of the above</li></ul><p>What is a phenotype?</p><ul  aria-label="What is a phenotype?  "><li><input type="radio" name="entry.221425905" value="The manifestation of a genotype" id="group_221425905_1" aria-label="The manifestation of a genotype">The manifestation of a genotype</li> <li><input type="radio" name="entry.221425905" value="An individual organism in a population" id="group_221425905_2" aria-label="An individual organism in a population">An individual organism in a population</li> <li><input type="radio" name="entry.221425905" value="Something subject to natural evolution" id="group_221425905_3" aria-label="Something subject to natural evolution">Something subject to natural evolution</li> <li><input type="radio" name="entry.221425905" value="All of the above" id="group_221425905_4" aria-label="All of the above">All of the above</li> <li><input type="radio" name="entry.221425905" value="None of the above" id="group_221425905_5" aria-label="None of the above">None of the above</li></ul><p>What is a genotype?</p><ul><li><input type="radio" name="entry.1589437110" value="Information that is discarded once an organism has fully developed" id="group_1589437110_1" aria-label="Information that is discarded once an organism has fully developed">Information that is discarded once an organism has fully developed</li> <li><input type="radio" name="entry.1589437110" value="A perfect copy of the parent" id="group_1589437110_2" aria-label="A perfect copy of the parent">A perfect copy of the parent</li> <li><input type="radio" name="entry.1589437110" value="The sole source of the variety of life" id="group_1589437110_3" aria-label="The sole source of the variety of life">The sole source of the variety of life</li> <li><input type="radio" name="entry.1589437110" value="All of the above" id="group_1589437110_4" aria-label="All of the above">All of the above</li> <li><input type="radio" name="entry.1589437110" value="None of the above" id="group_1589437110_5" aria-label="None of the above">None of the above</li></ul>';

$(document).ready(function(){

	$("#quizbody").html(quiztext);
	$("#quiz").hide();

	function reset_form() { document.getElementById("ss-form").reset(); }
	$(window).blur(function(){ reset_form(); });	
	// full-screen available?
	if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled
	) {
		// let start button open fullscreen:
		var quiz = document.getElementById("quiz");
		$("#start").click(function() {	
			// go full-screen			
			if (quiz.requestFullscreen) {
				quiz.requestFullscreen();
			} else if (quiz.webkitRequestFullscreen) {
				quiz.webkitRequestFullscreen();
			} else if (quiz.mozRequestFullScreen) {
				quiz.mozRequestFullScreen();
			} else if (quiz.msRequestFullscreen) {
				quiz.msRequestFullscreen();
			}
		});		
		// when fullscreen happens:
		function FShandler(b) { 
			if (document.fullscreen
			 || document.mozFullScreen
			 || document.webkitIsFullScreen
			 || document.msFullscreenElement) {
				//console.log("fullscreen on");
				reset_form();
				$("#quiz").show();
			} else {
				//console.log("fullscreen off");
				reset_form();
				$("#quiz").hide();
			}
		}	
		document.addEventListener("fullscreenchange", FShandler);
		document.addEventListener("webkitfullscreenchange", FShandler);
		document.addEventListener("mozfullscreenchange", FShandler);
		document.addEventListener("MSFullscreenChange", FShandler);
	} else {
		document.write("<p>This page requires a browser with full screen support.</p>");
	}
});