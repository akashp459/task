const SLOTS_PER_REEL = 12;
const REEL_RADIUS = 150;
const images = ['airtel', 'amazon', 'dell', 'flipkart', 'pizza', 'myntra', 'paytm', 'yatra', 'vivo', 'altbalaji', 'jbl', 'lenovo']

function createSlots (ring) {
	var slotAngle = 360 / SLOTS_PER_REEL;
	var seed = getSeed();
	for (var i = 0; i < SLOTS_PER_REEL; i ++) {
		var slot = document.createElement('div');
		slot.className = 'slot';
		var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';
    slot.style.transform = transform;
    $(slot).attr("data-company", images[((seed + i)%12)]);
		var content = $(slot).append(`<p> <img src=assets/images/${images[((seed + i)%12)]}.png></p>`);
		ring.append(slot);
	}
}

function getSeed() {
	return Math.floor(Math.random()*(SLOTS_PER_REEL));
}

function spin(timer) {
  values = []
	for(var i = 1; i < 6; i ++) {
		var oldSeed = -1;
    var oldClass = $('#ring'+i).attr('class');
		if(oldClass.length > 4) {
			oldSeed = parseInt(oldClass.slice(10));
		}
		var seed = getSeed();
		while(oldSeed == seed) {
			seed = getSeed();
		}

		$('#ring'+i)
			.css('animation','back-spin 1s, spin-' + seed + ' ' + (timer + i*0.5) + 's')
      .attr('class','ring spin-' + seed);
      values.push(seed);
  }
  showResults(values,timer);

}

$(document).ready(function() {
	// initiate slots 
 	createSlots($('#ring1'));
 	createSlots($('#ring2'));
 	createSlots($('#ring3'));
 	createSlots($('#ring4'));
 	createSlots($('#ring5'));

 	// hook start button
 	$('#spin').on('click',function(){
 		var timer = 2;
 		spin(timer);
 	})

 });

 function showResults(values, timer) {
  for(let i=1; i< 6; i++) {
    console.log($(`#ring${i}`).attr('class'));
  }
 }