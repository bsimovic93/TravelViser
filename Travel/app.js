
/*Display the current date*/
let temp;
let timediv = document.getElementsByClassName("current-time-tr");

temp = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

timediv[0].innerHTML = "Today is: " + temp.toLocaleDateString('en-US',options);




let genSeats = () =>{
	for (let i = 0; i < 48; i++) {
		if (i % 12 == 0) {
			$(".card-text").before("<br>");
		}
		if (i == 24) {
			$(".card-text").before("<br>");
		}
		$(".card-text").before("<div class = 'seat-item-tr'></div>&nbsp; ");
	
	}

}

let openPopup = ()=>{
	

}

let locations = [];

$(document).ready(function () {
	
	$.get('https://localhost:44323/api/location', function (data) {
		for (let i = 0; i < data.length; i++) {
			locations.push(data[i]['Name']);
		}
		console.table(data);
	}).fail( function () {
		locations = [...locations,'Test1','Test2']; console.log('Failed!', locations)
		$('.loc-tr').autocomplete({
			source: locations
		});
	
	})

	$('.loc-tr').autocomplete({
		source: locations
	});
});

let SwapLocations = () => {
	let a = $('#from-tr').val();
	let b = $('#to-tr').val();
	$('#from-tr').val(b);
	$('#to-tr').val(a);
}

$('.card-header').click(
	function(){
		$('.card-body').toggle(150);
	},
);
$('.button-gray-tr').click(()=>{

	$('#user-form').toggle(150);
})

let printSeatNumbers = () => {
	let seats = document.getElementsByClassName('seat-item-tr');
	let cs = 1;
	for(let i = 0; i < 48; i++){
		seats[i].innerHTML = cs.toString();
		cs += 4;
		if(cs > 48){
			cs = cs - 47;
		}

	}
}
console.time('⏱️');
$('.card').ready(genSeats());
$('.card-header-tr').ready(printSeatNumbers());

console.timeEnd('⏱️');
