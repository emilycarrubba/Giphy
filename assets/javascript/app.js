var animalArray = [
	"cat",
	"dog",
	"bird",
	"turtle",
	"hamster",
	"goldfish",
	"chicken",
	"goat",
	"pig",
	"hedgehog",
	"sugarglider",
	"grumpycat",
	"salamander",
	"skunk",
	"teacuppig",
	"greatdane"
];

// creating default animal buttons
for (var i = 0; i < animalArray.length; i++) {
	console.log("animal name" + animalArray[i]);
	$("#whateverwewant").append("<button class='animalButtons'>" + animalArray[i] + "</button>");
}

// this is the event handeler for the animal button click events
var giphs = function (event) {
	console.log("animalButtons", {
		event: event,
		this: this,
		animalName: this.textContent
	})
	var queryURL =
		"https://api.giphy.com/v1/gifs/search?q=" +
		this.textContent +
		"&api_key=dc6zaTOxFJmzC&limit=10";


	// Performing our AJAX part of jQuery GET request; how we call the internet to get something back -- like accessing giphy
	var getGifs = $.ajax({
		url: queryURL,
		method: "GET"
	})
	// After the data comes back from the API
	getGifs.then(function (gifResults) {
		// Storing an array of results in the results variable
		var results = gifResults.data;
		console.log(gifResults);
		console.log(results);


		// Looping over every result item
		for (var i = 0; i < results.length; i++) {

			// Only taking action if the photo has an appropriate rating
			if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
				// Creating a div with the class "item"
				var gifDiv = $("<div class='item'>");

				// Storing the result item's rating
				var rating = results[i].rating;

				// Creating a paragraph tag with the result item's rating
				var p = $("<p>").text("Rating: " + rating);

				// Creating an image tag
				var personImage = $("<img>");

				// Giving the image tag an src attribute of a proprty pulled off the
				// result item
				personImage.attr("src", results[i].images.fixed_height.url);

				// Appending the paragraph and personImage we created to the "gifDiv" div we created
				gifDiv.append(p);
				gifDiv.append(personImage);

				// Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
				$("#gifs-appear-here").prepend(gifDiv);
			}
		}
	});
};

// stings and call backs 
$("button").on("click", giphs)




// // Adding click event listen listener to all buttons
// $("button").on("click", function () {
//     // Grabbing and storing the data-animal property value from the button
//     var animal = $(this).attr("data-animal");

//     // Constructing a queryURL using the animal name
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//       animal + "&api_key=dc6zaTOxFJmzC&limit=10";

//     // Performing an AJAX request with the queryURL
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//       })
//       // After data comes back from the request
//       .then(function (response) {
//         console.log(queryURL);

//         console.log(response);
//         // storing the data from the AJAX request in the results variable
//         var results = response.data;

//         // Looping through each result item
//         for (var i = 0; i < results.length; i++) {

//           // Creating and storing a div tag
//           var animalDiv = $("<div>");
//           console.log(results[i]);
//           // Creating a paragraph tag with the result item's rating
//           var p = $("<p>").text("Rating: " + results[i].rating);

//           // Creating and storing an image tag
//           var animalImage = $("<img>");
//           // Setting the src attribute of the image to a property pulled off the result item
//           animalImage.attr("src", results[i].images.fixed_height.url);

//           // Appending the paragraph and image tag to the animalDiv
//           animalDiv.append(p);
//           animalDiv.append(animalImage);

//          Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
//           $("#gifs-appear-here").prepend(animalDiv);
//         }
//       });
//   });