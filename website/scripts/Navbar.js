
//Viser/viser ikke
function dropdownFunction(buttonclicked) {
    
    //Fjerner alle dropdowns
    removeDropdown();

    //Viser den aktuelle dropdownen
    switch (buttonclicked) {
    
        case 1:
            document.getElementById("aboutbtn").classList.toggle("show");
            break;
        case 2:
            document.getElementById("mediabtn").classList.toggle("show");
            break;
        case 3:
            document.getElementById("contactbtn").classList.toggle("show");
            break;
    }
    
}


// Hvis vi klikker på skjermen utenfor dropdown knappene fjernes dropdownen
window.onclick = function(event){
    if (!event.target.matches('.dropbtn')) {
        removeDropdown();
    }
}

//Fjerner alle dropdowns
function removeDropdown() {
   
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
    
}
