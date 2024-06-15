//QUESTION 1
// Pre-declared arrays for city and travel dropdown options
const destinations = ["Paris", "London", "New York", "Tokyo"];
const transportOptions = ["Car", "Train", "Airplane", "Ship"];

// Styling html tag 1, h1
let hStyling = document.getElementsByClassName("h-Styling");

// for loop
for (let i = 0; i < hStyling.length; i++) {
  hStyling[i].style.color = "#3FB1F5";
  hStyling[i].style.fontWeight = "bold";
}

// tyling html tag 2, label for budget
let budgetLabel = document.querySelector('label[for="budget"]');
budgetLabel.style.fontWeight = "bold";

// calling function showInfo() to show the app summary when button is clicked
function showInfo() {
  let infoDiv = document.getElementById("info");
  infoDiv.style.display = "block";
}

// calling function toggleDarkMode() to toggle theme
function toggleDarkMode() {
  let body = document.body;
  body.classList.toggle("dark-mode");
  console.log("theme changed");
}

// Function to populate select elements with options from the arrays
function populateOptions(selectElement, optionsArray) {
  // ensuring the box is empty when function populateOptions() first called
  selectElement.innerHTML = "";
  // Add an empty option to allow an empty box when first loaded/reset. User can also select nothing but then the submit button is not enabled
  const emptyOption = document.createElement("option");
  emptyOption.textContent = "";
  emptyOption.value = "";
  selectElement.appendChild(emptyOption);

  // Populate the dropdown with all the other options from the array
  optionsArray.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.textContent = option;
    optionElement.value = option;
    selectElement.appendChild(optionElement);
  });
}

// Populate destination/city and transportation options
populateOptions(document.getElementById("destination"), destinations);
populateOptions(document.getElementById("transport"), transportOptions);

// Variables to track whether the user has selected destination, transport, and set a budget
// using boolean values
let destinationSelected = false;
let transportSelected = false;
let budgetSet = false;

// Function checkFields() to check if all required fields are selected
// We need this for the submission button validation
function checkFields() {
  return destinationSelected && transportSelected && budgetSet;
}

// Function toggleSubmitButton() to enable or disable the submit button based on if required fields are not empty
function toggleSubmitButton() {
  document.getElementById("submitBtn").disabled = !checkFields();
}

// Event listener for destination dropdown menu
// Allows the web app to know which option user has chosen
document.getElementById("destination").addEventListener("change", function () {
  destinationSelected = this.value !== "";
  toggleSubmitButton(); // Toggle submit button based on selection
});

// Event listener for transport dropdown menu
// Same workings as destination dropdown
document.getElementById("transport").addEventListener("change", function () {
  transportSelected = this.value !== "";
  toggleSubmitButton();//calling toggleSubmitButton()
});

// Event listener for budget radio buttons
document.querySelectorAll('input[name="budget"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    budgetSet = this.checked;
    toggleSubmitButton();//calling toggleSubmitButton()

    // Define the options to be disabled based on the selected budget
    const optionsToDisable = ["Airplane", "Ship"];

    // Disable airplane and ship options if budget is under £500
    // If else statement
    if (this.value === "Less than £250" || this.value === "£250 - £500") {
      disableOptions(optionsToDisable, true);
    } else {
      // Enable all options if budget is over £500
      disableOptions(optionsToDisable, false);
    }
  });
});

// Function disableOptions() to disable or enable options in the transport dropdown
function disableOptions(optionsArray, disable) {
  let transportDropdown = document.getElementById("transport");
  let transportOptions = transportDropdown.getElementsByTagName("option");
// For loop
  for (let i = 0; i < transportOptions.length; i++) {
    if (optionsArray.includes(transportOptions[i].value)) {
      transportOptions[i].disabled = disable;
    }
  }
}

// Event listener for submit button
document
  .getElementById("submitBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the selected destination, transport, and budget using the event listeners
    const selectedDestination = document.getElementById("destination").value;
    const selectedTransport = document.getElementById("transport").value;
    const selectedBudget = document.querySelector(
      'input[name="budget"]:checked'
    );

    // Check if all required fields are selected
    // validation check
    // using If-else statements
    if (selectedDestination && selectedTransport && selectedBudget) {
      // Process the selected destination, transport, and budget
      // Get the selected budget value
      const selectedBudgetValue = selectedBudget ? selectedBudget.value : "";

      // Check if the selected destination, transport, and budget are valid
      // If else statement
      if (
        activitiesData[selectedDestination] &&
        activitiesData[selectedDestination][selectedBudgetValue] &&
        activitiesData[selectedDestination][selectedBudgetValue][
          selectedTransport
        ]
      ) {
        // Retrieve activities based on the selected destination, budget, and transport
        const activities =
          activitiesData[selectedDestination][selectedBudgetValue][
            selectedTransport
          ];

        // Display the activities
        displayActivities(activities);
      } else {
        console.log(
          "No activities available for the selected destination, budget, or transport."
        );
      }
    } else {
      console.log(
        "Please select destination, mode of transport, and enter a valid budget."
      );
    }
  });

// Activity data based on location, budget, and transport
// listed as an ordered list underneath the user input fields

// Not listed as one block directly under the city as error occured linked to the fact we have set the under £500 budget not allowing ship/airplane
const activitiesData = {
  Paris: {
    "Less than £250": {
      Car: [
        "Paris's beautiful parks, such as Jardin des Tuileries or Luxembourg Gardens",
        "Walking Tour of Montmartre",
        "Take a Seine River Cruise",
        "Visit Notre-Dame Cathedral",
        "Cooking Class",
        "Take a Bateaux Parisiens River Cruise",
        "Visit Sainte-Chapelle",
        "Seine River Cruise"
      ],
      Train: [
        "Paris's beautiful parks, such as Jardin des Tuileries or Luxembourg Gardens",
        "Walking Tour of Montmartre",
        "Take a Seine River Cruise",
        "Visit Notre-Dame Cathedral",
        "Cooking Class",
        "Take a Bateaux Parisiens River Cruise",
        "Visit Sainte-Chapelle",
        "Seine River Cruise"
      ],
      Airplane: [
        "Paris's beautiful parks, such as Jardin des Tuileries or Luxembourg Gardens",
        "Walking Tour of Montmartre",
        "Take a Seine River Cruise",
        "Visit Notre-Dame Cathedral",
        "Cooking Class",
        "Take a Bateaux Parisiens River Cruise",
        "Visit Sainte-Chapelle",
        "Seine River Cruise"
      ],
      Ship: [
        "Paris's beautiful parks, such as Jardin des Tuileries or Luxembourg Gardens",
        "Walking Tour of Montmartre",
        "Take a Seine River Cruise",
        "Visit Notre-Dame Cathedral",
        "Cooking Class",
        "Take a Bateaux Parisiens River Cruise",
        "Visit Sainte-Chapelle",
        "Seine River Cruise"
      ]
    },
    "£250 - £500": {
      Car: [
        "Day trip to Champagne region",
        "Visit Palace of Fontainebleau",
        "Dinner at a Michelin-starred Restaurant",
        "Visit Giverny and Monet's Gardens",
        "Explore Musée d'Orsay",
        "Take a day trip to Mont Saint-Michel",
        "Visit Claude Monet's House",
        "Dinner at a Michelin-starred Restaurant"
      ],
      Train: [
        "Day trip to Champagne region",
        "Visit Palace of Fontainebleau",
        "Dinner at a Michelin-starred Restaurant",
        "Visit Giverny and Monet's Gardens",
        "Explore Musée d'Orsay",
        "Take a day trip to Mont Saint-Michel",
        "Visit Claude Monet's House",
        "Dinner at a Michelin-starred Restaurant"
      ],
      Airplane: [
        "Day trip to Champagne region",
        "Visit Palace of Fontainebleau",
        "Dinner at a Michelin-starred Restaurant",
        "Visit Giverny and Monet's Gardens",
        "Explore Musée d'Orsay",
        "Take a day trip to Mont Saint-Michel",
        "Visit Claude Monet's House",
        "Dinner at a Michelin-starred Restaurant"
      ],
      Ship: [
        "Day trip to Champagne region",
        "Visit Palace of Fontainebleau",
        "Dinner at a Michelin-starred Restaurant",
        "Visit Giverny and Monet's Gardens",
        "Explore Musée d'Orsay",
        "Take a day trip to Mont Saint-Michel",
        "Visit Claude Monet's House",
        "Dinner at a Michelin-starred Restaurant"
      ]
    },
    "£500 - £1000": {
      Car: [
        "Explore Champagne region with wine tasting",
        "Visit Loire Valley Castles",
        "Day trip to Disneyland Paris",
        "Visit Château de Chantilly",
        "Dinner at a Michelin-starred Restaurant",
        "Visit Palace of Versailles with guide",
        "Take a day trip to Reims",
        "Hot Air Balloon Ride over Paris",
        "Visit Brussels and Bruges",
        "Take a Seine River dinner cruise",
        "Visit Claude Monet's Gardens in Giverny",
        "Wine Tasting and Vineyard Tour in Champagne"
      ],
      Train: [
        "Explore Champagne region with wine tasting",
        "Visit Loire Valley Castles",
        "Day trip to Disneyland Paris",
        "Visit Château de Chantilly",
        "Dinner at a Michelin-starred Restaurant",
        "Visit Palace of Versailles with guide",
        "Take a day trip to Reims",
        "Hot Air Balloon Ride over Paris",
        "Visit Brussels and Bruges",
        "Take a Seine River dinner cruise",
        "Visit Claude Monet's Gardens in Giverny",
        "Wine Tasting and Vineyard Tour in Champagne"
      ],
      Airplane: [
        "Explore Champagne region with wine tasting",
        "Visit Loire Valley Castles",
        "Day trip to Disneyland Paris",
        "Visit Château de Chantilly",
        "Dinner at a Michelin-starred Restaurant",
        "Visit Palace of Versailles with guide",
        "Take a day trip to Reims",
        "Hot Air Balloon Ride over Paris",
        "Visit Brussels and Bruges",
        "Take a Seine River dinner cruise",
        "Visit Claude Monet's Gardens in Giverny",
        "Wine Tasting and Vineyard Tour in Champagne"
      ],
      Ship: [
        "Explore Champagne region with wine tasting",
        "Visit Loire Valley Castles",
        "Day trip to Disneyland Paris",
        "Visit Château de Chantilly",
        "Dinner at a Michelin-starred Restaurant",
        "Visit Palace of Versailles with guide",
        "Take a day trip to Reims",
        "Hot Air Balloon Ride over Paris",
        "Visit Brussels and Bruges",
        "Take a Seine River dinner cruise",
        "Visit Claude Monet's Gardens in Giverny",
        "Wine Tasting and Vineyard Tour in Champagne"
      ]
    },
    "More than £1000": {
      Car: [
        "Private tour of Paris with chauffeur",
        "Private Tour of Versailles with Historian Guide",
        "Explore high-end fashion boutiques along Avenue Montaigne and Rue Saint-Honoré",
        "Private Yacht Cruise on the Seine River",
        "Private Helicopter Tour of Paris",
        "Ritz Paris or the Four Seasons Hotel George V",
        "Exclusive Wine Tasting at Château Lafite Rothschild",
        "VIP Tickets to the Opera Garnier"
      ],
      Train: [
        "Private tour of Paris with chauffeur",
        "Private Tour of Versailles with Historian Guide",
        "Explore high-end fashion boutiques along Avenue Montaigne and Rue Saint-Honoré",
        "Private Yacht Cruise on the Seine River",
        "Private Helicopter Tour of Paris",
        "Ritz Paris or the Four Seasons Hotel George V",
        "Exclusive Wine Tasting at Château Lafite Rothschild",
        "VIP Tickets to the Opera Garnier"
      ],
      Airplane: [
        "Private tour of Paris with chauffeur",
        "Private Tour of Versailles with Historian Guide",
        "Explore high-end fashion boutiques along Avenue Montaigne and Rue Saint-Honoré",
        "Private Yacht Cruise on the Seine River",
        "Private Helicopter Tour of Paris",
        "Ritz Paris or the Four Seasons Hotel George V",
        "Exclusive Wine Tasting at Château Lafite Rothschild",
        "VIP Tickets to the Opera Garnier"
      ],
      Ship: [
        "Private tour of Paris with chauffeur",
        "Private Tour of Versailles with Historian Guide",
        "Explore high-end fashion boutiques along Avenue Montaigne and Rue Saint-Honoré",
        "Private Yacht Cruise on the Seine River",
        "Private Helicopter Tour of Paris",
        "Ritz Paris or the Four Seasons Hotel George V",
        "Exclusive Wine Tasting at Château Lafite Rothschild",
        "VIP Tickets to the Opera Garnier"
      ]
    }
  },
  London: {
    "Less than £250": {
      Car: [
        "Visit the British Museum",
        "Take a Thames River Cruise",
        "Explore the Tower of London",
        "Hyde Park",
        "Take a Walking Tour of Notting Hill",
        "Visit the Tate Modern",
        "Explore Borough Market",
        "Take a Harry Potter Walking Tour",
        "Visit the Victoria and Albert Museum",
        "Explore Camden Market"
      ],
      Train: [
        "Visit the British Museum",
        "Take a Thames River Cruise",
        "Explore the Tower of London",
        "Hyde Park",
        "Take a Walking Tour of Notting Hill",
        "Visit the Tate Modern",
        "Explore Borough Market",
        "Take a Harry Potter Walking Tour",
        "Visit the Victoria and Albert Museum",
        "Explore Camden Market"
      ],
      Airplane: [
        "Visit the British Museum",
        "Take a Thames River Cruise",
        "Explore the Tower of London",
        "Hyde Park",
        "Take a Walking Tour of Notting Hill",
        "Visit the Tate Modern",
        "Explore Borough Market",
        "Take a Harry Potter Walking Tour",
        "Visit the Victoria and Albert Museum",
        "Explore Camden Market"
      ],
      Ship: [
        "Visit the British Museum",
        "Take a Thames River Cruise",
        "Explore the Tower of London",
        "Hyde Park",
        "Take a Walking Tour of Notting Hill",
        "Visit the Tate Modern",
        "Explore Borough Market",
        "Take a Harry Potter Walking Tour",
        "Visit the Victoria and Albert Museum",
        "Explore Camden Market"
      ]
    },
    "£250 - £500": {
      Car: [
        "West End Theatre Show and Dinner",
        "Private Guided Tour of Buckingham Palace",
        "London Eye Champagne Experience",
        "Afternoon Tea at The Ritz",
        "Private Thames River Cruise with Dinner",
        "VIP Behind-the-Scenes Tour of Wimbledon",
        "Helicopter Tour of London",
        "Gourmet Dining Experience at a Michelin-starred Restaurant",
        "Private Art Gallery Tour with an Expert Guide",
        "Luxury Shopping Experience on Bond Street"
      ],
      Train: [
        "West End Theatre Show and Dinner",
        "Private Guided Tour of Buckingham Palace",
        "London Eye Champagne Experience",
        "Afternoon Tea at The Ritz",
        "Private Thames River Cruise with Dinner",
        "VIP Behind-the-Scenes Tour of Wimbledon",
        "Helicopter Tour of London",
        "Gourmet Dining Experience at a Michelin-starred Restaurant",
        "Private Art Gallery Tour with an Expert Guide",
        "Luxury Shopping Experience on Bond Street"
      ],
      Airplane: [
        "West End Theatre Show and Dinner",
        "Private Guided Tour of Buckingham Palace",
        "London Eye Champagne Experience",
        "Afternoon Tea at The Ritz",
        "Private Thames River Cruise with Dinner",
        "VIP Behind-the-Scenes Tour of Wimbledon",
        "Helicopter Tour of London",
        "Gourmet Dining Experience at a Michelin-starred Restaurant",
        "Private Art Gallery Tour with an Expert Guide",
        "Luxury Shopping Experience on Bond Street"
      ],
      Ship: [
        "West End Theatre Show and Dinner",
        "Private Guided Tour of Buckingham Palace",
        "London Eye Champagne Experience",
        "Afternoon Tea at The Ritz",
        "Private Thames River Cruise with Dinner",
        "VIP Behind-the-Scenes Tour of Wimbledon",
        "Helicopter Tour of London",
        "Gourmet Dining Experience at a Michelin-starred Restaurant",
        "Private Art Gallery Tour with an Expert Guide",
        "Luxury Shopping Experience on Bond Street"
     ]
    },
    "£500 - £1000": {
      Car: [
        "Private Thames Dinner Cruise",
        "Exclusive VIP Shopping Experience",
        "Private Tour of Windsor Castle and Stonehenge",
        "Private Fine Dining Experience at The Shard",
        "Luxury Spa Day at The Dorchester",
        "Private Cooking Class with a Celebrity Chef",
        "Exclusive Theatre Box at a West End Show",
        "Hot Air Balloon Ride over London",
        "Private Wine Tasting Experience at Vinopolis",
        "Exclusive Private Tour of the Tower of London"
      ],
      Train: [
        "Private Thames Dinner Cruise",
        "Exclusive VIP Shopping Experience",
        "Private Tour of Windsor Castle and Stonehenge",
        "Private Fine Dining Experience at The Shard",
        "Luxury Spa Day at The Dorchester",
        "Private Cooking Class with a Celebrity Chef",
        "Exclusive Theatre Box at a West End Show",
        "Hot Air Balloon Ride over London",
        "Private Wine Tasting Experience at Vinopolis",
        "Exclusive Private Tour of the Tower of London"
      ],
      Airplane: [
        "Private Thames Dinner Cruise",
        "Exclusive VIP Shopping Experience",
        "Private Tour of Windsor Castle and Stonehenge",
        "Private Fine Dining Experience at The Shard",
        "Luxury Spa Day at The Dorchester",
        "Private Cooking Class with a Celebrity Chef",
        "Exclusive Theatre Box at a West End Show",
        "Hot Air Balloon Ride over London",
        "Private Wine Tasting Experience at Vinopolis",
        "Exclusive Private Tour of the Tower of London"
      ],
      Ship: [
        "Private Thames Dinner Cruise",
        "Exclusive VIP Shopping Experience",
        "Private Tour of Windsor Castle and Stonehenge",
        "Private Fine Dining Experience at The Shard",
        "Luxury Spa Day at The Dorchester",
        "Private Cooking Class with a Celebrity Chef",
        "Exclusive Theatre Box at a West End Show",
        "Hot Air Balloon Ride over London",
        "Private Wine Tasting Experience at Vinopolis",
        "Exclusive Private Tour of the Tower of London"
      ]
    },
    "More than £1000": {
      Car: [
        "Private Helicopter Tour of London and Surroundings",
        "Exclusive Private Dining Experience at a Michelin-starred Restaurant",
        "Luxury Shopping Spree with Personal Stylist",
        "Private Thames River Cruise with Live Entertainment",
        "Exclusive Behind-the-Scenes Tour of Buckingham Palace"
      ],
      Train: [
        "Private Helicopter Tour of London and Surroundings",
        "Exclusive Private Dining Experience at a Michelin-starred Restaurant",
        "Luxury Shopping Spree with Personal Stylist",
        "Private Thames River Cruise with Live Entertainment",
        "Exclusive Behind-the-Scenes Tour of Buckingham Palace"
      ],
      Airplane: [
        "Private Helicopter Tour of London and Surroundings",
        "Exclusive Private Dining Experience at a Michelin-starred Restaurant",
        "Luxury Shopping Spree with Personal Stylist",
        "Private Thames River Cruise with Live Entertainment",
        "Exclusive Behind-the-Scenes Tour of Buckingham Palace"
      ],
      Ship: [
        "Private Helicopter Tour of London and Surroundings",
        "Exclusive Private Dining Experience at a Michelin-starred Restaurant",
        "Luxury Shopping Spree with Personal Stylist",
        "Private Thames River Cruise with Live Entertainment",
        "Exclusive Behind-the-Scenes Tour of Buckingham Palace"
      ]
    }
  },
  "New York": {
    "Less than £250": {
      Car: [
        "Visit the Statue of Liberty and Ellis Island",
        "Explore Central Park",
        "Visit the Metropolitan Museum of Art",
        "Take a High Line Walking Tour",
        "Visit the 9/11 Memorial and Museum",
        "Take a Food Tour in Chinatown"
      ],
      Train: [
        "Visit the Statue of Liberty and Ellis Island",
        "Explore Central Park",
        "Visit the Metropolitan Museum of Art",
        "Take a High Line Walking Tour",
        "Visit the 9/11 Memorial and Museum",
        "Take a Food Tour in Chinatown"
      ],
      Airplane: [
        "Visit the Statue of Liberty and Ellis Island",
        "Explore Central Park",
        "Visit the Metropolitan Museum of Art",
        "Take a High Line Walking Tour",
        "Visit the 9/11 Memorial and Museum",
        "Take a Food Tour in Chinatown"
      ],
      Ship: [
        "Visit the Statue of Liberty and Ellis Island",
        "Explore Central Park",
        "Visit the Metropolitan Museum of Art",
        "Take a High Line Walking Tour",
        "Visit the 9/11 Memorial and Museum",
        "Take a Food Tour in Chinatown"
      ]
    },
    "£250 - £500": {
      Car: [
        "Broadway Show and Dinner Package",
        "Helicopter Tour of Manhattan",
        "Private Guided Tour of the Museum of Modern Art (MoMA)",
        "Culinary Walking Tour of Greenwich Village",
        "Private Sailing Cruise in New York Harbor"
      ],
      Train: [
        "Broadway Show and Dinner Package",
        "Helicopter Tour of Manhattan",
        "Private Guided Tour of the Museum of Modern Art (MoMA)",
        "Culinary Walking Tour of Greenwich Village",
        "Private Sailing Cruise in New York Harbor"
      ],
      Airplane: [
        "Broadway Show and Dinner Package",
        "Helicopter Tour of Manhattan",
        "Private Guided Tour of the Museum of Modern Art (MoMA)",
        "Culinary Walking Tour of Greenwich Village",
        "Private Sailing Cruise in New York Harbor"
      ],
      Ship: [
        "Broadway Show and Dinner Package",
        "Helicopter Tour of Manhattan",
        "Private Guided Tour of the Museum of Modern Art (MoMA)",
        "Culinary Walking Tour of Greenwich Village",
        "Private Sailing Cruise in New York Harbor"
      ]
    },
    "£500 - £1000": {
      Car: [
        "Private Guided Tour of the Statue of Liberty and Ellis Island",
        "VIP Broadway Experience",
        "Private Helicopter Tour with Champagne Toast",
        "Private Food and Wine Tour in the Hudson Valley",
        "Luxury Shopping Experience on Fifth Avenue"
      ],
      Train: [
        "Private Guided Tour of the Statue of Liberty and Ellis Island",
        "VIP Broadway Experience",
        "Private Helicopter Tour with Champagne Toast",
        "Private Food and Wine Tour in the Hudson Valley",
        "Luxury Shopping Experience on Fifth Avenue"
      ],
      Airplane: [
        "Private Guided Tour of the Statue of Liberty and Ellis Island",
        "VIP Broadway Experience",
        "Private Helicopter Tour with Champagne Toast",
        "Private Food and Wine Tour in the Hudson Valley",
        "Luxury Shopping Experience on Fifth Avenue"
      ],
      Ship: [
        "Private Guided Tour of the Statue of Liberty and Ellis Island",
        "VIP Broadway Experience",
        "Private Helicopter Tour with Champagne Toast",
        "Private Food and Wine Tour in the Hudson Valley",
        "Luxury Shopping Experience on Fifth Avenue"
      ]
    },
    "More than £1000": {
      Car: [
        "Private Yacht Charter around Manhattan",
        "Private Broadway Performance",
        "Helicopter Proposal Flight over New York City",
        "Exclusive Fine Dining Experience at Per Se",
        "Private Luxury Shopping Tour with Personal Stylist"
      ],
      Train: [
        "Private Yacht Charter around Manhattan",
        "Private Broadway Performance",
        "Helicopter Proposal Flight over New York City",
        "Exclusive Fine Dining Experience at Per Se",
        "Private Luxury Shopping Tour with Personal Stylist"
      ],
      Airplane: [
        "Private Yacht Charter around Manhattan",
        "Private Broadway Performance",
        "Helicopter Proposal Flight over New York City",
        "Exclusive Fine Dining Experience at Per Se",
        "Private Luxury Shopping Tour with Personal Stylist"
      ],
      Ship: [
        "Private Yacht Charter around Manhattan",
        "Private Broadway Performance",
        "Helicopter Proposal Flight over New York City",
        "Exclusive Fine Dining Experience at Per Se",
        "Private Luxury Shopping Tour with Personal Stylist"
      ]
    }
  },
  Tokyo: {
    "Less than £250": {
      Car: [
        "Visit Senso-ji Temple and Nakamise Shopping Street",
        "Enjoy a Ramen or Sushi Meal",
        "Visit Ueno Park and Museums",
        "Take a Day Trip to Kamakura or Nikko",
        "Experience Shinjuku's Nightlife and Entertainment"
      ],
      Train: [
        "Visit Senso-ji Temple and Nakamise Shopping Street",
        "Enjoy a Ramen or Sushi Meal",
        "Visit Ueno Park and Museums",
        "Take a Day Trip to Kamakura or Nikko",
        "Experience Shinjuku's Nightlife and Entertainment"
      ],
      Airplane: [
        "Visit Senso-ji Temple and Nakamise Shopping Street",
        "Enjoy a Ramen or Sushi Meal",
        "Visit Ueno Park and Museums",
        "Take a Day Trip to Kamakura or Nikko",
        "Experience Shinjuku's Nightlife and Entertainment"
      ],
      Ship: [
        "Visit Senso-ji Temple and Nakamise Shopping Street",
        "Enjoy a Ramen or Sushi Meal",
        "Visit Ueno Park and Museums",
        "Take a Day Trip to Kamakura or Nikko",
        "Experience Shinjuku's Nightlife and Entertainment"
      ]
    },
    "£250 - £500": {
      Car: [
        "Sumo Wrestling Tournament Tickets",
        "Tokyo Disneyland or DisneySea Visit",
        "Guided Food Tour in Tsukiji Outer Market",
        "Shopping in Ginza or Harajuku",
        "Cultural Workshop Experience"
      ],
      Train: [
        "Sumo Wrestling Tournament Tickets",
        "Tokyo Disneyland or DisneySea Visit",
        "Guided Food Tour in Tsukiji Outer Market",
        "Shopping in Ginza or Harajuku",
        "Cultural Workshop Experience"
      ],
      Airplane: [
        "Sumo Wrestling Tournament Tickets",
        "Tokyo Disneyland or DisneySea Visit",
        "Guided Food Tour in Tsukiji Outer Market",
        "Shopping in Ginza or Harajuku",
        "Cultural Workshop Experience"
      ],
      Ship: [
        "Sumo Wrestling Tournament Tickets",
        "Tokyo Disneyland or DisneySea Visit",
        "Guided Food Tour in Tsukiji Outer Market",
        "Shopping in Ginza or Harajuku",
        "Cultural Workshop Experience"
      ]
    },
    "£500 - £1000": {
      Car: [
        "Private Tea Ceremony with a Tea Master",
        "Cooking Class with a Local Chef",
        "Day Trip to Mount Fuji and Hakone",
        "Sumo Wrestling Training Stable Visit",
        "Sushi Omakase Dinner Experience",
        "Private Guided Tour of Tokyo's Neighborhoods",
        "Visit to an Onsen Ryokan in Hakone or Atami"
      ],
      Train: [
        "Private Tea Ceremony with a Tea Master",
        "Cooking Class with a Local Chef",
        "Day Trip to Mount Fuji and Hakone",
        "Sumo Wrestling Training Stable Visit",
        "Sushi Omakase Dinner Experience",
        "Private Guided Tour of Tokyo's Neighborhoods",
        "Visit to an Onsen Ryokan in Hakone or Atami"
      ],
      Airplane: [
        "Private Tea Ceremony with a Tea Master",
        "Cooking Class with a Local Chef",
        "Day Trip to Mount Fuji and Hakone",
        "Sumo Wrestling Training Stable Visit",
        "Sushi Omakase Dinner Experience",
        "Private Guided Tour of Tokyo's Neighborhoods",
        "Visit to an Onsen Ryokan in Hakone or Atami"
      ],
      Ship: [
        "Private Tea Ceremony with a Tea Master",
        "Cooking Class with a Local Chef",
        "Day Trip to Mount Fuji and Hakone",
        "Sumo Wrestling Training Stable Visit",
        "Sushi Omakase Dinner Experience",
        "Private Guided Tour of Tokyo's Neighborhoods",
        "Visit to an Onsen Ryokan in Hakone or Atami"
      ]
    },
    "More than £1000": {
      Car: [
        "Private Tea Ceremony Experience",
        "Private Sushi Making Class with a Master Chef",
        "Private Sumo Wrestling Experience",
        "Luxury Ryokan Stay in Hakone or Kyoto",
        "Exclusive Geisha Experience in Kyoto"
      ],
      Train: [
        "Private Tea Ceremony Experience",
        "Private Sushi Making Class with a Master Chef",
        "Private Sumo Wrestling Experience",
        "Luxury Ryokan Stay in Hakone or Kyoto",
        "Exclusive Geisha Experience in Kyoto"
      ],
      Airplane: [
        "Private Tea Ceremony Experience",
        "Private Sushi Making Class with a Master Chef",
        "Private Sumo Wrestling Experience",
        "Luxury Ryokan Stay in Hakone or Kyoto",
        "Exclusive Geisha Experience in Kyoto"
      ],
      Ship: [
        "Private Tea Ceremony Experience",
        "Private Sushi Making Class with a Master Chef",
        "Private Sumo Wrestling Experience",
        "Luxury Ryokan Stay in Hakone or Kyoto",
        "Exclusive Geisha Experience in Kyoto"
      ]
    }
  }
};

// Function displayActivities() to display activities
function displayActivities() {
  // Get selected values
  const selectedDestination = document.getElementById("destination").value;
  const selectedTransport = document.getElementById("transport").value;
  const selectedBudget = document.querySelector('input[name="budget"]:checked')
    .value;

  // Check if the selected destination, budget, and transport are valid
  //if else statement
  if (
    activitiesData[selectedDestination] &&
    activitiesData[selectedDestination][selectedBudget] &&
    activitiesData[selectedDestination][selectedBudget][selectedTransport]
  ) {
    // Show the ordered list
    const activitiesList = document.createElement("ol");
    const activities =
      activitiesData[selectedDestination][selectedBudget][selectedTransport];
    activities.forEach((activity) => {
      const activityItem = document.createElement("li");
      activityItem.textContent = activity;
      activitiesList.appendChild(activityItem);
    });

    // Clear previous activities and display new ones
    const activitiesContainer = document.getElementById("activities");
    activitiesContainer.innerHTML = "";
    activitiesContainer.appendChild(activitiesList);
    activitiesContainer.style.display = "block";
  } else {
    // Handle the case when the selected destination, budget, or transport is invalid
    console.log("Invalid selection.");
  }
}
// Function showButtonsAfterDelay() to show the buttons after a delay of 10 seconds
function showButtonsAfterDelay() {
  setTimeout(() => {// timeout
    const showImagesBtn = document.getElementById("showImagesBtn");
    const resetBtn = document.getElementById("resetBtn");
    if (showImagesBtn && resetBtn) {//If statement
      showImagesBtn.style.display = "block";
      resetBtn.style.display = "block";
      // Show an alert when the buttons are displayed
      window.alert(
        "Hey there! are you having trouble deciding which city to visit? Click the inspiration button below to see some of these fabulous cities 🎉"
      );
    }
  }, 10000); // 10 seconds delay
}

// Call the function showButtonsAfterDelay() to show buttons after a delay
showButtonsAfterDelay();

// Function showImages() to show images
function showImages() {
  const imageContainer = document.getElementById("imageContainer");
  // Add images to the container
  // all images from google images
  imageContainer.innerHTML = `
    <img src= "https://media-cdn.tripadvisor.com/media/photo-s/1b/4b/59/86/caption.jpg" alt="Paris">
    <img src="https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg" alt=".London">
    <img src="https://media.architecturaldigest.com/photos/5da74823d599ec0008227ea8/master/pass/GettyImages-946087016.jpg" alt="New York">
    <img src="https://media.istockphoto.com/id/1390815938/photo/tokyo-city-in-japan.webp?b=1&s=170667a&w=0&k=20&c=YVI8iGWf-w_cLyQNcWA57Ll9eXv_s_SHfoM0MufEMMQ=" alt="Tokyo">
  `;
}

// Function reset() to reset the images to be hidden from view
//this will only be shown if the user has chosen to view the images
function reset() {
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = ""; // Clear the image container
  document.getElementById("resetBtn").style.display = "none"; // Hide the reset button
  document.getElementById("showImagesBtn").disabled = false; // Enable the show images button
}

// Event listener for "Show Images" button
document.getElementById("showImagesBtn").addEventListener("click", function () {
  // Show the images using the showImages() function
  showImages();
  // show the Reset button
  document.getElementById("resetBtn").style.display = "block";
});

// Event listener for "Reset" button
document.getElementById("resetBtn").addEventListener("click", function () {
  // Reset the images using reset() function
  reset();
});

//QUESTION 2 
//(12 marks total)
//A. Demonstrated knowledge of unshift(), shift(), and split() (6 marks)
//B. Demonstrated knowledge of object methods (3 marks)
//C. Demonstrated knowledge of DOM events (3 marks)
//2.1.
//Q.1 Define unshift(), shift() and split()
//A.1 unshift() allows us to add an  element to beginning of array. 
//    shift() allows us to remove the first element of an array.
//    split() allows us to split a string into an array of substrings.
//Q.2 Using the topic of “CFGdegree”, provide an example of unshift(), shift() and
//split(). (E.g.The theme could be the different CFGdegree streams.)
//A.2 
let cfgDegree = ["Software Engineering", "Full-Stack Developer", "Product Management"];
let fullStack = "Front-end development including HTML, CSS, JavaScript, React";

console.log(cfgDegree);

//using unshift()
cfgDegree.unshift("Data");
console.log(cfgDegree);
//using shift()
cfgDegree.shift();
console.log(cfgDegree);

//using split()
let degreeInfo = fullStack.split(" ");

degreeInfo.forEach(function(word) {
    console.log(word);
});

//2.2.
//Q.3 Define object methods
//A.3 A function inside an Object is called an Object Method
//Q.4 Using the topic of “Programming Languages”, create a new object and object
//methods
//A.4 
let programmingLanguage = {
    name: "JavaScript",
    type: "Script language",
    yearCreated: 1995,
    popularFrameworks: ["React", "Angular"],
    Likeable: true,
  
    displayInfo: function() {
        console.log(`${this.name} is a ${this.type}`);
    }
};

programmingLanguage.displayInfo(); //Output = JavaScript is a Script language
//2.3.
//Q.5 Explain the onmouseover event
//A.6 Triggers JavaScript code when the mouse pointer hovers an element such as a button
//Q.6 Explain two other DOM events of your choosing
//A.6 onclick DOM event executes a piece of JS function when an element gets clicked by the user
//    onplay DOM event occurs when an audio/video is started.