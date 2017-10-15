/*
    Load an article from a given URL into a given container.
    Plain text insertion into innerHTML
    
    \url absolute/relative URL to resource
    \targetContainer HTML element to insert into
 */ 
function loadArticle(url, targetContainer, closure, otherwise)
{
    var req = new XMLHttpRequest();
    
    req.onreadystatechange = function() {
        if(req.readyState != XMLHttpRequest.DONE)
            return;
    
        if(req.status == 200)
        {
            /* On success... */
            console.log(req.responseText);
            targetContainer.innerHTML = req.responseText;
            /* ... and notify the client */
            closure();
        }else if(req.status == 404)
        {
            /* On complete failure, tell the client */
            otherwise();
        }
    };
    
    req.open("GET", url);
    req.send();
}

function quickLoad_ext(articleName, otherwise)
{
    var targetContainer = document.getElementsByTagName("content")[0];
    var articleResource = "articles/" + articleName + ".html";

    loadArticle(articleResource, targetContainer, function() {
        /* TODO: Implement some sort of transition effect here
         *  to avoid blinking */
        console.log("Page loaded: " + articleName);
        
        switch(articleName)
        {
        case "guestbook":
            gb_loadComments();
            break;
        default:
            break;
        }
    }, function() {
        /* TODO: Add better error handling... */
        console.log("Failed to load page: " + articleName);
        otherwise();
    });
}

function quickLoad(articleName)
{
    quickLoad_ext(articleName, function(){});
}

window.onload = function() {
    var target = location.hash;
    target = target.replace("#", "");
    
    /* Try to load the article given in the URL, otherwise
     *  load the home page for now.
     */
    quickLoad_ext(target, function() {
        quickLoad("home");
    });
    
    /* Because window.onload is global, we have to collect it somehow */
    gb_onLoad();
}

