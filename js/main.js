// Denna fil ska innehålla din lösning till uppgiften (moment 6).

"use strict" Dania Abd Almajeed;

/*  Delar till ej obligatorisk funktionalitet, som kan ge poäng för högre betyg
*   Radera rader för funktioner du vill visa på webbsidan. */
//document.getElementById("player").style.display = "none";      // Radera denna rad för att visa musikspelare
//document.getElementById("shownumrows").style.display = "none"; // Radera denna rad för att visa antal träffar

/* Här under börjar du skriva din JavaScript-kod */

document.addEventListener("DOMContentLoaded", function () {

    const playButton = document.getElementById("playbutton");
    const playChannelSelect = document.getElementById("playchannel");
    const numRowsInput = document.getElementById("numrows");
    const radioPlayer = document.getElementById("radioplayer");


    const channelData = [
        {
            name: "P1",
            description: "Talat innehåll om samhälle, kultur och vetenskap. Kanalen erbjuder nyheter och aktualiteter, granskning och fördjupning men också livsåskådnings-och livsstilsprogram samt underhållning och upplevelser till exempel i form av teater.",
            endpoint: "http://api.sr.se/v2/scheduledepisodes?channelid=132&page=1",// URL for P1 channel
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/132.mp3"
        },
       
        {
            name: "P2",
            description: "P2 är den klassiska musikkanalen som även erbjuder jazz samt folk- och världsmusik. Digitalt sänder vi musikprogram dygnet runt, i FM finns även program på andra språk än svensk",
            endpoint: "http://api.sr.se/v2/scheduledepisodes?channelid=163&page=1", // URL for P2 channel
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/163.mp3"
        },
        
        {
            name: "P3",
            description: "Kanalen för dig som gillar ny musik, livesänd radio och högkvalitativa poddar. Lyssna på P3 för populärkultur, samhällsjournalistik, musik och humor.",
            endpoint: "http://api.sr.se/v2/scheduledepisodes?channelid=164&page=1",
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/164.mp3"
        },
        // Add more channels with their respective endpoints here
        {
            name: "P4",
            description: "I P4 Blekinge hör du lokala nyheter, lokala aktualiteter och lokal kultur. Du bjuds på en heltäckande, angelägen kanal där du bor.",
            endpoint: "http://api.sr.se/v2/scheduledepisodes?channelid=213&page=2",
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/213.mp3"
        },
        {
            name: "P4 Dalarna",
            description: "P4 Dalarna gör angelägen lokal radio för dalfolket, på plats när det händer. I våra populära program och prisbelönta nyheter hör du ämnen som berör, alltid dagsaktuella och alltid med Dalarna i centrum.",
            endpoint: "http://api.sr.se/v2/scheduledepisodes?channelid=223&page=2",
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/223.mp3"
        },
        {
            name: "P4 Gotland",
            description: "P4 Gotland bevakar det som händer på och omkring Gotland, med nyheter, intervjuer och reportage.",
            endpoint: "http://api.sr.se/v2/scheduledepisodes?channelid=205&page=2",
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/205.mp3"
        },
        {
            name: "P4 Gävleborg",
            description: "I P4 Gävleborg hör du lokala nyheter, lokala aktualiteter och lokal kultur. Du bjuds på en heltäckande, angelägen kanal där du bor.",
            endpoint: "http://api.sr.se/v2/scheduledepisodes?channelid=210&page=2",
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/210.mp3"
        },
        {
            name: "P4 Göteborg",
            description: "Sveriges Radio P4 Göteborg ger dig lokala nyheter - i radion och på webben",
            endpoint: "http://api.sr.se/v2/scheduledepisodes?channelid=212&page=2",
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/212.mp3"
        },
        {
            name: "P4 Halland",
            description: "P4 Halland erbjuder lokala nyheter och aktualiteter.",
            endpoint: "https://api.sr.se/v2/scheduledepisodes?channelid=220&page=1",
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/220.mp3"
        },
        // Add more channels with their respective endpoints here
        {
            name: "P4 Jämtland",
            description: "I P4 Jämtland hör du lokala nyheter, aktualiteter, väderprognoser, sport och kultur.",
            endpoint: "http://api.sr.se/v2/scheduledepisodes?channelid=200&page=2" ,
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/200.mp3"
        },
    ];

    

  // Function to create and populate the navigation menu
function createNavigationMenu() {
    const mainnavlist = document.getElementById('mainnavlist');
    mainnavlist.innerHTML = ''; // Clear existing navigation menu
// Use the selected number of rows from the input
const selectedNumChannels = parseInt(numRowsInput.value, 10);

channelData.slice(0, selectedNumChannels).forEach(channelData =>  {
     // Creating and populating navigation menu items.
        const listItem = document.createElement('li');
        const channelLink = document.createElement('a');
        channelLink.textContent = channelData.name;
        channelLink.title = channelData.description;
        // Add click event listener to handle channel selection
        channelLink.addEventListener('click', () => {
            // Call the fetchChannelData function to fetch and display the program schedule
            fetchChannelData(channelData);
        });

        listItem.appendChild(channelLink);
        mainnavlist.appendChild(listItem);
        // Event listener for the "Number of Channels" input
        numRowsInput.addEventListener("input", createNavigationMenu);
    });
}

function fetchChannelData(channelData) {
 // Make an API request for the specific channel using its endpoint
 fetch(channelData.endpoint)
 .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text();
})
.then(xmlText => {
    // Parse the XML response using DOMParser
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    // Extract the schedule elements
    const scheduleElements = xmlDoc.querySelectorAll('scheduledepisode');
    const scheduleContainer = document.getElementById('info');
    // Clear existing schedule content
    scheduleContainer.innerHTML = '';

    // Loop through the schedule elements and display them
    scheduleElements.forEach(scheduleElement => {
      const title = scheduleElement.querySelector('title').textContent;
      const startDateTime = new Date(scheduleElement.querySelector('starttimeutc').textContent);
      const endDateTime = new Date(scheduleElement.querySelector('endtimeutc').textContent);
      const startTime = startDateTime.toLocaleTimeString();
      const endTime = endDateTime.toLocaleTimeString();
      
      const description = scheduleElement.querySelector('description').textContent;

      // Create HTML elements to display the schedule details
      const scheduleItem = document.createElement('div');
      scheduleItem.innerHTML = `
        <h3>${title}</h3>
        <p>${startTime}- ${endTime}</p>
        <p>${description}</p>
      `;

      // Append the schedule item to the container
      scheduleContainer.appendChild(scheduleItem);
    });
  })
 .catch(error => {
     console.error('Error fetching channel data:', error);
 });
}



playButton.addEventListener("click", function () {
    const selectedChannelId = playChannelSelect.value;
    const selectedChannel = channelData.find(channel => channel.name === selectedChannelId);
    if (selectedChannel) {
        radioPlayer.innerHTML = ''; // Clear previous audio player content
        const audioElement = document.createElement("audio");
        audioElement.controls = true;
        audioElement.autoplay = true;
        const sourceElement = document.createElement("source");
        sourceElement.src = selectedChannel.streamingLink;
        sourceElement.type = "audio/mpeg";
        audioElement.appendChild(sourceElement);
        radioPlayer.appendChild(audioElement);
    }
});

function populateChannelSelect() {
    channelData.forEach(channel => {
        const option = document.createElement("option");
        option.value = channel.name;
        option.text = channel.name;
        playChannelSelect.appendChild(option);
    });
}


// Call this function to populate the channel select element when the page loads
populateChannelSelect();



// Call the function to create and populate the navigation menu when the page loads
 createNavigationMenu();


});
