# DARAZOUKI.github.io
# Labbgrund till Moment 6 i kursen DT084G, Introduktion till programmering i JavaScript
## Dania Abd Almajeed  daab2301@student.miun.se

## Moment5  Sveriges Radios API
The goal of this assignment is to create a web application that utilizes Sveriges Radio's open data for program schedules and broadcasts of various radio channels. The application should provide a main menu based on Sweden's Radio's different channels, displaying information about each channel when hovering over it.
Upon clicking on a channel, the program schedule for the current day should be displayed, showing only upcoming programs for the day and excluding those that have already aired.

## Mandatory Functionality
The following mandatory functionalities must be included in the final solution:
1. Navigation menu in the left sidebar, displaying channels along with channel information when hovering over a channel (use the `title` attribute in HTML).
2. Clicking on a channel in the menu should show the program schedule for that channel for the current day, starting from the current time until midnight.
3. You can decide the number of channels to display in the left menu based on what you find appropriate.
4. Parsing program schedules and displaying them in a suitable format.

### Optional Functionality
* User-selectable number of channels to be displayed in the left menu via an input field (e.g., numrows).
* A radio player that plays a live stream (available in MP3 format) of the selected radio channel.
  The user should be able to choose a radio channel from a dropdown list (e.g., playchannel select box), and clicking a button should play the stream of the selected channel.
  A media player (HTML <audio>) should be displayed in an element with the ID radioplayer.

### Additional Information
Feel free to experiment and expand your application with other features. For example, you can add dynamic content such as real-time information about the currently playing programs on a set of channels. Just make sure to keep your additional work within the main.js file (do not modify HTML or CSS directly).

### Project Resources
Sveriges Radios API for open data can be found at: https://sverigesradio.se/oppetapi
