var topics = ["sad", "cheerful", "happy", "laughing"];
// Function for dumping the JSON content for each button into the div
function displayGiphyInfo() {

    var movie = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&limit=10&api_key=8Sf436IWzrJd8373enL6IoGYUQH8UBxg";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        console.log("hello");
        $(".row").empty();
        // Storing an array of results in the results variable
        var results = response.data;
        // Looping over every result item

        for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                //Creating a div for col-4
                var col4 = $("<div>");
                col4.addClass("col-4");
                // Creating a div for the gif
                var gifDiv = $("<div>");
                gifDiv.addClass("card");
                // Storing the result item's rating
                var rating = results[i].rating;
                console.log(results[i].rating);

                // Creating an image tag
                var gifImage = $("<img>");
                gifImage.addClass("gif card-image");
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                console.log(results[i]);
                console.log(results[i].images);
                console.log(results[i].images.fixed_height_still.url);
                // var still = results[i].images.fixed_height_still.url;

                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                //set width and height for the image
                gifImage.attr("width", 200);
                gifImage.attr("height", 200);
                //Creating div for the rating
                var cardContent = $("<div>");
                cardContent.addClass("card-content");
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
                cardContent.append(p);


                // action(personImage, still);
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(gifImage);
                gifDiv.append(cardContent);
                col4.append(gifDiv);

                // Prepending the gifDiv to the ".row" div in the HTML
                // if (i < 3) {
                $(".row").prepend(col4);





                // }
            }


            // }
        }
    });

}

// Function for displaying movie data
function renderButtons() {

    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamically generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of gif to our button
        a.addClass("movie");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-movie").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();

    // Adding the movie from the textbox to our array
    topics.push(movie);
    console.log(topics);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state == 'still') {
        $(this).attr('src', $(this).attr("data-animate"));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
});


// Function for displaying the movie info
// Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
$(document).on("click", ".movie", displayGiphyInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();
