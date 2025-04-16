/* 

General Overview + Thought Process:

Just to preface, I used Javascript previously for my 1st website but I wasn't too familiar with it, I really wanted
to get better and learn more about it so I went through this entire video to get it going

https://www.youtube.com/watch?v=FazgJVnrVuI


1. Card Structure

Initiially I saw that we were given like a list of strings as you can see below,

Example
["Fresh Prince of Bel Air", "Curb Your Enthusiasm", "East Los High"]

I realized with the data that I wanted to work with, this wasn't adequate to store all the data/information I wanted to work with.
So my next thought intuition was to use an object, something that I had previously learned in one of my python courses.

I generally knew I wanted to store the name, the rating, images, location, and possibly a link to the place so I came up with a
general skeleton that looked like this and then committed to it

Array of Objects Skeleton

Array
[
  Object
  {
    Name -> String
    Rating -> Number
    Images -> Array of Objects (Image Source, Description)
    Location -> String 
    Yelp -> String
  }
]

I originally opted to pull images online from the url but was worried in case it might go down and I heard it was better practice
to store them locally, so I created an images folder in my directory.

Functions relating to Card Structure

Two of the functions that were given to us initially were the showCards() function and the editCardContent() function.

The showCards() function was more or less the same as the original code. I used the creation of a blank card from the original code
and used a for loop to create however many cards I had in my restaurants array. In there I just kept calling the editCardContent()
function to fill it out.

I did end up updating the editCardContent() function in order for it to properly use my array of objects and all the data inside.

https://www.w3schools.com/jsref/met_node_appendchild.asp
https://www.w3schools.com/jsref/met_document_queryselector.asp#:~:text=Description,selector(s)%20is%20invalid.
https://www.w3schools.com/jsref/met_document_createelement.asp
https://www.youtube.com/watch?v=FazgJVnrVuI

In my previous project I used JavaScript for the first time but wasn't too familiar and comfortable with using the DOM.
For this project, I definitely became more familiar with DOM manipulation and realized how useful it is. I definitely struggled to 
understand how things worked, but with a variety of resources like the ones above from w3schools helped alot.

More specifically, the editCardContent() fucntion was where I took my actual data and updated the DOM to create my new card
structure, so using functions like querySelector, createElement, and appendChild were particularly useful.


2. Functionalities (Adding, Sorting, Random Select/Scroll, Face-Icons)

My thought process for sorting functions sortByNameAscending(), sortByNameDescending(), and sortByRating() was fairly simple. 
I knew that I wanted to be able to sort the restaurants either by name (A–Z or Z–A) or by their rating. 
After some quick Googling and trial and error, I figured out I could just use the built in sort() method on my array of restaurant objects 
and compare either the name or rating values.

For the adding a new restaurant function, addNewRestaurant(), I initially wasn’t sure how to gather all the input values and create a new card for it. 
But once I got more comfortable using getElementById and grabbing the .value of each input field,
I realized I could just build a new object, push it to the restaurants array, and then call showCards() again to refresh the list.

For removing a restaurant, removeRestaurant(), I learned that the key was finding a way to remove the right item from my restaurants array based on its name. 
Once I figured out how to loop through the array and check if the name matched, I could use .splice() to take that one item out 
and then simply refresh the display using the showCards() function.

The surpriseMe() function/feature was just a fun extra idea I had — like a button for when you're feeling indecisive on where to eat. 
For this, I just thought to randomly pick a restaurant from the array using Math.random(), scroll the page to its card using scrollIntoView(),
and lastly a CSS class to highlight the specific card so it was obvious which one was being selected. 

One of the more creative features I added was the visual face rating system. Instead of just displaying a number like “4.5/5,” 
I wanted each card to show that rating using icons of my face, kind of like stars, so I wrote the getFaceIcons(), that translates
the numbers into a visual representation of up to 5 face icons. 

*/



// Decided I needed to use an array of objects to hold key-value pairs of information for the data I was using
let restaurants = [
  {
    name: "Ramen Nagi",
    rating: 4.5,
    images: [
      { src: "images/ramen-nagi-1.jpg", description: "Shoyu Tonkotsu Ramen" },
      { src: "images/ramen-nagi-2.jpg", description: "Spicy Red King Ramen" },
      { src: "images/ramen-nagi-3.jpg", description: "Black King Ramen" },
      { src: "images/ramen-nagi-4.jpg", description: "Chicken Karaage" }
    ],
    location: "Century City, CA",
    yelp: "https://www.yelp.com/biz/ramen-nagi-century-city"
  },
  {
    name: "Izakaya Hachi",
    rating: 4.5,
    images: [
      { src: "images/izakaya-hachi-1.jpg", description: "Gobo Chips" },
      { src: "images/izakaya-hachi-2.jpg", description: "Raw Oyster" },
      { src: "images/izakaya-hachi-3.jpg", description: "Ponzu Ribeye Steak" },
      { src: "images/izakaya-hachi-4.jpg", description: "Pumpkin Ice Cream" }
    ],
    location: "Torrance, CA",
    yelp: "https://www.yelp.com/biz/izakaya-hachi-torrance"
  },
  {
    name: "Petrillo's Pizza",
    rating: 4.1,
    images: [
      { src: "images/petrillo-pizza-1.jpg", description: "Carne Pizza" },
      { src: "images/petrillo-pizza-2.jpg", description: "Bruschetta" },
      { src: "images/petrillo-pizza-3.jpg", description: "Buffalo Wings" },
      { src: "images/petrillo-pizza-4.jpg", description: "Calamari" }
    ],
    location: "San Gabriel, CA",
    yelp: "https://www.yelp.com/biz/petrillos-pizza-san-gabriel"
  },
  {
    name: "Ji Rong Peking Duck",
    rating: 4.3,
    images: [
      { src: "images/jirong-1.jpg", description: "Crispy Walnut Shrimp" },
      { src: "images/jirong-2.jpg", description: "Spicy Pork Stomach" },
      { src: "images/jirong-3.jpg", description: "Scallops with Vermicelli" },
      { src: "images/jirong-4.jpg", description: "Xiao Long Bao (Steamed Soup Dumplings)" }
    ],
    location: "Rosemead, CA",
    yelp: "https://www.yelp.com/biz/ji-rong-peking-duck-rosemead"
  },
  {
    name: "Zest Grill House",
    rating: 3.5,
    images: [
      { src: "images/zest-1.jpg", description: "Lamb Chops" },
      { src: "images/zest-2.jpg", description: "Chicken Shish" }
    ],
    location: "Glendale, CA",
    yelp: "https://www.yelp.com/biz/zest-grill-house-glendale"
  },
  {
    name: "Yuk Dae Jang",
    rating: 3.9,
    images: [
      { src: "images/yukdaejang-1.jpg", description: "Premium Pork Belly" },
      { src: "images/yukdaejang-2.jpg", description: "Army Stew" },
      { src: "images/yukdaejang-3.jpg", description: "Braised Spicy Beef Ribs" }
    ],
    location: "Los Angeles, CA",
    yelp: "https://www.yelp.com/biz/yuk-dae-jang-los-angeles"
  },
  {
    name: "Kamon Sushi",
    rating: 3.7,
    images: [
      { src: "images/kamon-1.jpg", description: "Spicy Langostino Roll" },
      { src: "images/kamon-2.jpg", description: "Salmon with Blue Crab" },
      { src: "images/kamon-3.jpg", description: "Beef Teriyaki Bento" },
      { src: "images/kamon-4.jpg", description: "Spicy Tuna Crispy Rice" }
    ],
    location: "Monterey Park, CA",
    yelp: "https://www.yelp.com/biz/kamon-sushi-monterey-park"
  },
  {
    name: "Salt Creek Grill",
    rating: 3.5,
    images: [
      { src: "images/saltcreek-1.jpg", description: "Swordfish Special" },
      { src: "images/saltcreek-2.jpg", description: "Beef Stroganoff" },
      { src: "images/saltcreek-3.jpg", description: "Brussels Sprouts" }
    ],
    location: "Valencia, CA",
    yelp: "https://www.yelp.com/biz/salt-creek-grille-valencia"
  },
  {
    name: "Xinjiang BBQ",
    rating: 4.8,
    images: [
      { src: "images/xin-1.jpg", description: "Chicken & Gizzard Skewers" },
      { src: "images/xin-2.jpg", description: "Chicken Wings" },
      { src: "images/xin-3.jpg", description: "Pork Belly & Octopus" },
      { src: "images/xin-4.jpg", description: "Beef Skewers" }
    ],
    location: "San Gabriel, CA",
    yelp: "https://www.yelp.com/biz/xinjiang-bbq-san-gabriel"
  },
 {
  name: "Stacks Pancake House",
  rating: 3.6,
  images: [
    { src: "images/stacks-1.jpg", description: "Kalua Pork Egg Benedict" },
    { src: "images/stacks-2.jpg", description: "Peanut Butter Banana French Toast" },
    { src: "images/stacks-3.jpg", description: "Chicken Katsu" }
  ],
  location: "Torrance, CA",
  yelp: "https://www.yelp.com/biz/stacks-pancake-house-torrance"
},
{
  name: "Maru Sushi",
  rating: 3.8,
  images: [
    { src: "images/maru-1.jpg", description: "Salmon Carpaccio with Truffle" },
    { src: "images/maru-2.jpg", description: "Yuzu Yellowtail Sashimi" },
    { src: "images/maru-3.jpg", description: "Coconut Softshell Crab" },
    { src: "images/maru-4.jpg", description: "Spicy Tuna with Avocado" }
  ],
  location: "Los Angeles, CA",
  yelp: "https://www.yelp.com/biz/maru-sushi-los-angeles"
},
{
  name: "Garden Cafe",
  rating: 4.0,
  images: [
    { src: "images/gardencafe-1.jpg", description: "Chicken Steak with Pasta" },
    { src: "images/gardencafe-2.jpg", description: "Seafood Pasta" },
    { src: "images/gardencafe-3.jpg", description: "Satay Beef Chow Mein" }
  ],
  location: "Alhambra, CA",
  yelp: "https://www.yelp.com/biz/garden-cafe-alhambra"
},
{
  name: "Capital Seafood",
  rating: 4.3,
  images: [
    { src: "images/capital-1.jpg", description: "Shrimp and Pork Siu Mai" },
    { src: "images/capital-2.jpg", description: "Seafood Beancurd" },
    { src: "images/capital-3.jpg", description: "Har Gao (Shrimp Dumpling)" },
    { src: "images/capital-4.jpg", description: "Turnip Cake" }
  ],
  location: "Arcadia, CA",
  yelp: "https://www.yelp.com/biz/capital-seafood-restaurant-arcadia"
},
{
  name: "Norms Restaurant",
  rating: 4.2,
  images: [
    { src: "images/norms-1.jpg", description: "Sirloin Steak" },
    { src: "images/norms-2.jpg", description: "Chicken Gumbo Soup & Salad" },
    { src: "images/norms-3.jpg", description: "Vanilla Sundae" }
  ],
  location: "West Covina, CA",
  yelp: "https://www.yelp.com/biz/norms-restaurant-west-covina"
},
{
  name: "Joy",
  rating: 3.7,
  images: [
    { src: "images/joy-1.jpg", description: "Spicy Wontons" },
    { src: "images/joy-2.jpg", description: "Dan Dan Noodle" },
    { src: "images/joy-3.jpg", description: "Slack Season Noodle" },
    { src: "images/joy-4.jpg", description: "Minced Pork Bowl & Pork Belly Bun" }
  ],
  location: "Highland Park, Los Angeles, CA",
  yelp: "https://www.yelp.com/biz/joy-los-angeles"
},
{
  name: "Aikan Sushi & Ramen",
  rating: 4.4,
  images: [
    { src: "images/aikan-1.jpg", description: "Agedashi Tofu" },
    { src: "images/aikan-2.jpg", description: "Pork Tonkotsu Ramen" },
    { src: "images/aikan-3.jpg", description: "Variety Sushi (Salmon, Yellowtail, Raw Shrimp)" },
    { src: "images/aikan-4.jpg", description: "Mixed Tempura" }
  ],
  location: "Alhambra, CA",
  yelp: "https://www.yelp.com/biz/aikan-sushi-and-ramen-alhambra"
},
{
  name: "Mancora Peruvian Cuisine",
  rating: 3.8,
  images: [
    { src: "images/mancora-1.jpg", description: "Bistek a lo Pobre" },
    { src: "images/mancora-2.jpg", description: "Diced Steak Pasta" },
    { src: "images/mancora-3.jpg", description: "Lomo Saltado" }
  ],
  location: "El Monte, CA",
  yelp: "https://www.yelp.com/biz/mancora-peruvian-cuisine-el-monte"
},
{
  name: "Fritto Misto",
  rating: 4.6,
  images: [
    { src: "images/fritto-1.jpg", description: "New Orleans Pasta" },
    { src: "images/fritto-2.jpg", description: "Jumbo Ravioli" },
    { src: "images/fritto-3.jpg", description: "Garlic Shrimp Pasta" },
    { src: "images/fritto-4.jpg", description: "Linguine with Italian Turkey Sausage" }
  ],
  location: "Santa Monica, CA",
  yelp: "https://www.yelp.com/biz/fritto-misto-santa-monica"
},
{
  name: "Howlin' Ray's",
  rating: 5.0,
  images: [
    { src: "images/howlin-1.jpg", description: "Chicken Sando" },
    { src: "images/howlin-2.jpg", description: "Chicken Tenders" },
    { src: "images/howlin-3.jpg", description: "Chicken & Waffles" }
  ],
  location: "Chinatown, Los Angeles, CA",
  yelp: "https://www.yelp.com/biz/howlin-rays-los-angeles"
},

];

function sortByNameAscending() {
  restaurants.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });
  showCards();
}

function sortByNameDescending() {
  restaurants.sort(function(a, b) {
    return b.name.localeCompare(a.name);
  });
  showCards();
}

function sortByRating() {
  restaurants.sort(function(a, b) {
    return b.rating - a.rating;
  });
  showCards();
}

function addNewRestaurant() {
  const name = document.getElementById("restaurant-name").value;
  const location = document.getElementById("restaurant-location").value;
  const rating = parseFloat(document.getElementById("restaurant-rating").value);
  const image = document.getElementById("restaurant-image").value;
  const description = document.getElementById("restaurant-description").value;
  const yelp = document.getElementById("restaurant-yelp").value;

  // only requiring name, location, and rating (image/description/yelp link are optional) 
  if (!name || !location || isNaN(rating)) {
    alert("Please fill in the restaurant name, location, and rating.");
    return;
  }

// if an image IS provided, add it to the array
// use the user's description if available, otherwise we use default "Restaurant Name image"
  let images = [];
  if (image) {
    images.push({
      src: image,
      description: description || name + " image"
    });
  }

  // creating the new restaurant object
  const newRestaurant = {
    name: name,
    rating: rating,
    images: images,
    location: location,
    yelp: yelp
  };

  // adding new restaurant object to the array and refreshing the cards
  restaurants.push(newRestaurant);
  showCards();

  // clear form after submission
  document.getElementById("restaurant-name").value = "";
  document.getElementById("restaurant-location").value = "";
  document.getElementById("restaurant-rating").value = "";
  document.getElementById("restaurant-image").value = "";
  document.getElementById("restaurant-description").value = "";
  document.getElementById("restaurant-yelp").value = "";
}

function removeRestaurant(name) {
  // Iterate through the restaurants array at each array index
  for (let i = 0; i < restaurants.length; i++) {
    const currentRestaurant = restaurants[i];

    // Check if the name matches
    if (currentRestaurant.name === name) {
      // Remove the restaurant from the array if matching name
      restaurants.splice(i, 1); //built in splice function that removes based on (startIndex, howManyToRemove)

      // Break out of loop after removing the restaurant we were looking for
      break;
    }
  }
  showCards();
}

function surpriseMe() {
  // random index to select a random restaurant within our data array
  const randomIndex = Math.floor(Math.random() * restaurants.length);
  const chosenRestaurant = restaurants[randomIndex];

  // querySelectorAll returns a static NodeList representing the document's eleemtns that match specififed selectors and "." is to select by classname
  const allCards = document.querySelectorAll(".card");

  // Remove previous highlights using a regular loop
  for (let i = 0; i < allCards.length; i++) {
    allCards[i].classList.remove("highlighted-card");
  }

  // find and highlight the chosen restaurant's card
  for (let i = 0; i < allCards.length; i++) {
    const card = allCards[i];
    const title = card.querySelector("h2"); // this is to select the name of restaurant which resides in h2 tag

    if (title.textContent === chosenRestaurant.name) {
      card.scrollIntoView({ behavior: "smooth", block: "center" }); // this scrolls down to part of screen where the card is 
      card.classList.add("highlighted-card"); // adding the highlight class from css file to that specific card we selected
      break;
    }
  }
}

// function to create Face Icon for _/5 ratings
function getFaceIcons(rating) {
  let facesHTML = "";
  let fullFaces = Math.floor(rating);
  let hasHalfFace = false;

  // Check if there's a decimal 0.5 or more
  let decimal = rating - fullFaces;
  if (decimal >= 0.5) {
    hasHalfFace = true;
  }
  // Add full face icons
  for (let i = 0; i < fullFaces; i++) {
    facesHTML = facesHTML + '<img src="images/kelvin-face.jpeg" class="face-icon" alt="Kelvin face">';
  }
  // Add half face if needed
  if (hasHalfFace === true) {
    facesHTML = facesHTML + '<img src="images/kelvin-face.jpeg" class="face-icon half" alt="Half Kelvin face">';
  }
  // Count how many faces have been added so far
  let totalFaces = fullFaces;
  if (hasHalfFace === true) {
    totalFaces = totalFaces + 1;
  }
  // Add faded faces to make total of 5
  for (let i = totalFaces; i < 5; i++) {
    facesHTML = facesHTML + '<img src="images/kelvin-face.jpeg" class="face-icon faded" alt="Faded Kelvin face">';
  }
  return facesHTML;
}


// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container"); 
  cardContainer.innerHTML = ""; // we want to clear out everything in the container everytime we remove or add, so we can build the current list from the updated data correctly
  const templateCard = document.querySelector(".card"); //the "." means class in css/html selector syntax

  for (let i = 0; i < restaurants.length; i++) {
    let restaurant = restaurants[i];

    const nextCard = templateCard.cloneNode(true); // Copy the template card (deep copy of entire element and its children are made)
    editCardContent(nextCard, restaurant); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function editCardContent(card, restaurant) {
  card.style.display = "block"; //This is to show the card

  // Setting the name
  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = restaurant.name;

  // Setting the image and alt image 
  const gallery = card.querySelector(".photo-gallery");
  gallery.innerHTML = ""; // Clear previous images if any

  for (const imageSource of restaurant.images) {
    const image = document.createElement("img");
    image.src = imageSource.src;
    image.alt = restaurant.name + " photo";
    image.title = imageSource.description; //the hover text of which food dish it is
    image.className = "gallery-image";
    gallery.appendChild(image);
  }

  // Setting the restaurant details 
  const bulletList = card.querySelector("#card-details");
  bulletList.innerHTML = ""; // Clear existing list

  // Setting rating and handling logic to create faces separately 
  const ratingValue = document.createElement("li");

  const faceLabel = document.createElement("span");
  faceLabel.textContent = "Rating: ";
  ratingValue.appendChild(faceLabel);
  
  const faceContainer = document.createElement("div");
  faceContainer.className = "face-rating";
  
  const faces = getFaceIcons(restaurant.rating);
  faceContainer.innerHTML = faces;
  
  ratingValue.appendChild(faceContainer);
  
  // Setting location
  const locationArea = document.createElement("li");
  locationArea.textContent = "Location: " + restaurant.location;

  // Setting Yelp Link
  const yelpLink = document.createElement("li"); 
  yelpLink.innerHTML = `<a href="${restaurant.yelp}" target="_blank">Yelp Page</a>`;

  bulletList.appendChild(ratingValue);
  bulletList.appendChild(locationArea);
  bulletList.appendChild(yelpLink);

  // Added this to add a numberical value rating for each card because the faces may seem confusing/unclear
  const ratingBadge = document.createElement("div");
  ratingBadge.className = "numeric-rating";
  ratingBadge.textContent = restaurant.rating + " / 5";
  card.appendChild(ratingBadge)

  // adding a remove button to each card
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.className = "remove-button";

  // when clicked, remove the card by name
  removeButton.onclick = function () {
    removeRestaurant(restaurant.name);
  };

  card.appendChild(removeButton);

  console.log("created card for:", restaurant.name);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);
