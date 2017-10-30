/* Listing of stylesheets and scripts attached to a given article */
var documentDependencies = {
    home: {
        stylesheets: [
            'styles/home.css'
        ],
        scripts: [
            
        ],
        isLoaded: false,
    },
    guestbook: {
        stylesheets: [
            'styles/guestbook.css'
        ],
        scripts: [
            'scripts/guestbook.js'
        ],
        isLoaded: false,
    },
    about: {
        stylesheets: [
            'styles/about.css'
        ],
        scripts: [
            
        ],
        isLoaded: false,
    }
};

/*
    Load an article from a given URL into a given container.
    Plain text insertion into innerHTML
    
    \url absolute/relative URL to resource
    \targetContainer HTML element to insert into
    \before function to run before loading the page proper
    \closure function to be run after loading content
    \otherwise function to be run if loading fails
 */ 
function loadArticle(url, targetContainer, before, closure, otherwise)
{
    var req = new XMLHttpRequest();
    
    req.onreadystatechange = function() {
        if(req.readyState != XMLHttpRequest.DONE)
            return;
    
        if(req.status == 200)
        {
            /* On success... */
            before();
            //console.log(req.responseText);
            targetContainer.outerHTML = req.responseText;
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

/* Given a list of stylesheets, either disable it (state=false) or enable it (state=true) */
function setStylesheetState(stylesheetInfo, state)
{
    for(var i=0;i<stylesheetInfo.length;i++)
    {
        var query = stylesheetInfo[i];
        for(var j=0;j<document.styleSheets.length;j++)
        {
            if(document.styleSheets[j].href == null)
                continue;
            if(document.styleSheets[j].href.endsWith(query))
                document.styleSheets[j].disabled = !state;
        }
    }
}

/* A version of quickLoad() which allows a predicate upon failure */
/* Do not chain calls to quickLoad_ext() through the predicate. */
function quickLoad_ext(articleName, otherwise)
{
    var targetContainer = document.getElementsByTagName("main")[0];
    var articleResource = "articles/" + articleName + ".html";

    loadArticle(articleResource, targetContainer, function() {
        /* Code to be run before the page properly loads */
        /* Add page dependencies, like stylesheets and scripts to the page */
        /* Allows minimal loading of page */
        var deps = documentDependencies[articleName];
        
        /* Disable the previous stylesheets */
        /* We can do this by setting a property on the stylesheet,
         *  putting it out of use for the current page */
        if(location.search.length != 0)
        {
            var prevArticle = location.search;
            prevArticle = prevArticle.replace("?", "");
            var stylesheetInfo = documentDependencies[prevArticle];
            if(stylesheetInfo != undefined)
            {
                setStylesheetState(stylesheetInfo.stylesheets, false);
            }
        }
        
        /* The rest of the code does not make sense if the page does not carry unique stylesheets */
        if(deps == null)
            return;
        
        /* If elements are already inserted, just enable the stylesheets */
        if(deps.isLoaded)
        {
            var stylesheetInfo = documentDependencies[articleName];
            
            if(stylesheetInfo != undefined)
            {
                setStylesheetState(stylesheetInfo.stylesheets, true);
            }
            return;
        }
        
        /* We set a state flag to indicate that the dependencies are loaded */
        deps.isLoaded = true;
        
        /* Get a reference to the <head> element into which scripts and
         *  stylesheets will be inserted */
        var headerElement = document.getElementsByTagName("head")[0];
        
        /* In this case, the stylesheets have yet to be injected */
        for(var i=0;i<deps.stylesheets.length;i++)
        {
            var sheetElement = document.createElement("link");
            sheetElement.rel = "stylesheet";
            sheetElement.href = deps.stylesheets[i];
            
            headerElement.append(sheetElement);
        }
        
        /* TODO: Allow dynamic loading of Javascript sources */
        
    }, function() {
        
        /* Some Javascript files will need initialization on page load */
        switch(articleName)
        {
        case "guestbook":
            /* Reads comments from localStorage and generates the comment section */
            gb_loadComments();
            break;
        default:
            break;
        }
        
        /* If navigation was successful, set location such that
         *  the user may bookmark the page */
        history.pushState(null, null, '?' + articleName);
        
    }, function() {
        /* TODO: Add better error handling... */
        console.log("Failed to load page: " + articleName);
        otherwise();
    });
}

/* The basic function to load an article, no fluff */
function quickLoad(articleName)
{
    quickLoad_ext(articleName, function(){});
}

/* On loading the page clean, load a page */
window.onload = function() {
    var target = location.search;
    target = target.replace("?", "");
    
    /* Try to load the article given in the URL, otherwise
     *  load the home page for now.
     */
    if(target.length > 0)
        quickLoad_ext(target, function() {
            quickLoad("home");
        });
    else
        quickLoad("home");
}

