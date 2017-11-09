/*
FILE NAME: scripts/Navbar.html
WRITTEN BY: Kristoffer Håkonsen
A big thanks to w3schools.com for inspiraton on how to create the dropdown navbar

WHEN: October/November 2017
PURPOSE: This page contains the Javascript which makes the navbar expand on click.
*/

//Contains the name of the dropdown buttons
btns = ["", "aboutbtn", "mediabtn", "contactbtn"];

//Toggles showing and not showing the dropdowns
/* We would like to thank the w3school for their idea about appending "show" to make the dropdown appear and disaper. 
The idea came from their articles: https://www.w3schools.com/howto/howto_js_dropdown.asp */
function dropdownFunction(buttonclicked) {
	
    //Checks if the clicked button is already showing a dropdown menu
	if(document.getElementById(btns[buttonclicked]).classList.contains("show")){
		removeDropdown();
		
	}
    else{
		//Removes all dropdowns
		removeDropdown();

		//Shows the dropdown
		document.getElementById(btns[buttonclicked]).classList.toggle("show");

		}
	}


// If the screen is clicked outside the dropdown buttons or outside the small dropdown icon

window.onclick = function(event){
    if (!event.target.matches('.dropbtn')) {
        removeDropdown();
    }
   if  (!event.target.matches('.icon')){
       removeSmallDropdown();
    }
}

//Removed all the regular dropdowns
/*Thanks to the w3school for help on this function. We used the principles from https://www.w3schools.com/howto/howto_js_dropdown.asp to create the removeDropdown() function. */
function removeDropdown() {
   
    var dropdowns = document.getElementsByClassName("dropdown-content");
    
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}

/*Removes the small dropdown*/
function removeSmallDropdown() {
    var dropdowns = document.getElementsByClassName("smalldropdown");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}



//Toggles the small dropdown menu
function smallDropDown() {
    document.getElementById("smalldropdownbtn").classList.toggle('show');
}