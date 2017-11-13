/*
  FILE NAME: scripts/splash_image.js
  WRITTEN BY: Caroline Stensland Selte
  WHEN: October/November 2017
  PURPOSE: Splashes the images in, making it look cooler
*/


function si_load() {
  var image = document.getElementById("bulletin");
  image.classList.add("splash");
  var text = document.getElementById("homesplash");
  text.classList.add("splash");
}
