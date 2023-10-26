"use strict"    ;


//document.getElementById("player").style.display = "none";      // Radera denna rad för att visa musikspelare

//document.getElementById("shownumrows").style.display = "none"; // Radera denna rad för att visa antal träffar

// Listen for the DOMContentLoaded event before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {

   // Define an array of channel data 
    const channelData = [
        {
            name: "P1",
            id: 132,
            description: "Talat innehåll om samhälle, kultur och vetenskap. Kanalen erbjuder nyheter och aktualiteter, granskning och fördjupning men också livsåskådnings-och livsstilsprogram samt underhållning och upplevelser till exempel i form av teater.",
            endpoint: "https://api.sr.se/v2/scheduledepisodes?format=json&size=10&indent=false&channelid=132", // URL for P1 channel
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/132.mp3"
        },
       
        {
            name: "P2",
            id:163,
            description: "P2 är den klassiska musikkanalen som även erbjuder jazz samt folk- och världsmusik. Digitalt sänder vi musikprogram dygnet runt, i FM finns även program på andra språk än svensk",
            endpoint: "https://api.sr.se/v2/scheduledepisodes?format=json&size=10&indent=false&channelid=163", // URL for P2 channel
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/163.mp3"
        },
        
        {
            name: "P3",
            id:164,
            description: "Kanalen för dig som gillar ny musik, livesänd radio och högkvalitativa poddar. Lyssna på P3 för populärkultur, samhällsjournalistik, musik och humor.",
            endpoint: "https://api.sr.se/v2/scheduledepisodes?format=json&size=10&indent=false&channelid=164",
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/164.mp3"
        },
       
        {
            name: "P4",
            id:213,
            description: "I P4 Blekinge hör du lokala nyheter, lokala aktualiteter och lokal kultur. Du bjuds på en heltäckande, angelägen kanal där du bor.",
            endpoint: "https://api.sr.se/v2/scheduledepisodes?format=json&size=10&indent=false&channelid=213",
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/213.mp3"
        },
        {
            name: "P4 Dalarna",
            id:223,
            description: "P4 Dalarna gör angelägen lokal radio för dalfolket, på plats när det händer. I våra populära program och prisbelönta nyheter hör du ämnen som berör, alltid dagsaktuella och alltid med Dalarna i centrum.",
            endpoint: "https://api.sr.se/v2/scheduledepisodes?format=json&size=10&indent=false&channelid=223",
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/223.mp3"
        },
        {
            name: "P4 Gotland",
            id:205,
            description: "P4 Gotland bevakar det som händer på och omkring Gotland, med nyheter, intervjuer och reportage.",
            endpoint: "https://api.sr.se/v2/scheduledepisodes?format=json&size=10&indent=false&channelid=205",
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/205.mp3"
        },
        {
            name: "P4 Gävleborg",
            id:210,
            description: "I P4 Gävleborg hör du lokala nyheter, lokala aktualiteter och lokal kultur. Du bjuds på en heltäckande, angelägen kanal där du bor.",
            endpoint: "https://api.sr.se/v2/scheduledepisodes?format=json&size=10&indent=false&channelid=210 ",
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/210.mp3"
        },
        {
            name: "P4 Göteborg",
            id:212,
            description: "Sveriges Radio P4 Göteborg ger dig lokala nyheter - i radion och på webben",
            endpoint: "https://api.sr.se/v2/scheduledepisodes?format=json&size=10&indent=false&channelid=212",
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/212.mp3"
        },
        {
            name: "P4 Halland",
            id:220,
            description: "P4 Halland erbjuder lokala nyheter och aktualiteter.",
            endpoint: "https://api.sr.se/v2/scheduledepisodes?format=json&size=10&indent=false&channelid=220",
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/220.mp3"
        },
        
        {
            name: "P4 Jämtland",
            id:200,
            description: "I P4 Jämtland hör du lokala nyheter, aktualiteter, väderprognoser, sport och kultur.",
            endpoint: "https://api.sr.se/v2/scheduledepisodes?format=json&size=10&indent=false&channelid=200" ,
            streamingLink: "http://sverigesradio.se/topsy/direkt/srapi/200.mp3"
        },
    ];


     // Define variables to access HTML elements by their IDs
     const playButton = document.getElementById("playbutton");
     const playChannelSelect = document.getElementById("playchannel");
     const numRowsInput = document.getElementById("numrows");
     const radioPlayer = document.getElementById("radioplayer");  

     
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
        
    });
}

    // Function to fetch and display the program schedule for a selected channel
function fetchChannelData(channelData) {
    const scheduleContainer = document.getElementById('info');
    scheduleContainer.innerHTML = '';

 
    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];
   

    // Make an API request to fetch the program schedule for the selected channel
    fetch(`${channelData.endpoint}&date=${currentDate}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(scheduleData => {
            scheduleData.schedule.forEach(scheduleItem => {
                const title = scheduleItem.title || 'Title not available';
                const description = scheduleItem.description || 'Description not available';

            const startTimeUtc = parseInt(scheduleItem.starttimeutc.match(/\d+/)[0]);
            const endTimeUtc = parseInt(scheduleItem.endtimeutc.match(/\d+/)[0]);
             // Parse start and end times as Date objects
             const startTime = new Date(startTimeUtc);
            const endTime = new Date(endTimeUtc);

            const formattedStartTime = formatTime(startTime);
            const formattedEndTime = formatTime(endTime);
            const scheduleItemElement = document.createElement('div');
            scheduleItemElement.innerHTML = `
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <p>${formattedStartTime} - ${formattedEndTime}</p>
                `;

                scheduleContainer.appendChild(scheduleItemElement);
             
            });
        })
        .catch(error => {
            console.error('Error fetching channel data:', error);
        });
}


//Function to format a date string as "HH:MM"
function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}



 // Event listener for the "Play" button to start streaming a selected channel
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

// Function to populate the channel selection dropdown
function populateChannelSelect() {
    channelData.forEach(channel => {
        const option = document.createElement("option");
        option.value = channel.name;
        option.text = channel.name;
        playChannelSelect.appendChild(option);
    });
}

// Event listener for the "Number of Channels" input
numRowsInput.addEventListener("input", createNavigationMenu);


// Call this function to populate the channel select element when the page loads
populateChannelSelect();  

// Call the function to create and populate the navigation menu when the page loads
createNavigationMenu();

});
