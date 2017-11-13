/*
  FILE NAME: scripts/document_loader.js
  WRITTEN BY: Håvard Bjerke
  WHEN: October 2017
  PURPOSE: This file implements a document loader which uses XMLHttpRequest.
    It also lists the dependencies of the different pages.
 */

/* Listing of stylesheets and scripts attached to a given article */
var documentDependencies = {
  home: {
    stylesheets: ["styles/home.css"],
    scripts: ["scripts/splash_image.js"],
    onload: "si_load",
    isLoaded: false
  },
  guestbook: {
    stylesheets: ["styles/guestbook.css"],
    scripts: ["scripts/guestbook.js"],
    onload: "gb_loadComments",
    isLoaded: false
  },
  discography: {
    stylesheets: ["styles/discography.css"],
    scripts: ["scripts/discography.js"],
    onload: "addAlbums",
    isLoaded: false
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
function loadArticle(url, targetContainer, before, closure, otherwise) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (req.readyState != XMLHttpRequest.DONE) return;

    if (req.status == 200) {
      /* On success... */
      before();
      //console.log(req.responseText);
      targetContainer.outerHTML = req.responseText;
      /* ... and notify the client */
      closure();
    } else if (req.status == 404) {
      /* On complete failure, tell the client */
      otherwise();
    }
  };

  req.open("GET", url);
  req.send();
}

/* Given a list of stylesheets, either disable it (state=false)
 *  or enable it (state=true) */
function setStylesheetState(stylesheetInfo, state) {
  for (var i = 0; i < stylesheetInfo.length; i++) {
    var query = stylesheetInfo[i];
    for (var j = 0; j < document.styleSheets.length; j++) {
      if (document.styleSheets[j].href == null) continue;
      if (document.styleSheets[j].href.endsWith(query))
        document.styleSheets[j].disabled = !state;
    }
  }
}

function scriptLoad(articleName) {
  if (
    documentDependencies[articleName] !== undefined &&
    documentDependencies[articleName].onload !== undefined
  )
    window[documentDependencies[articleName].onload]();
}

/* A version of quickLoad() which allows a predicate upon failure */
/* Do not chain calls to quickLoad_ext() through the predicate. */
function quickLoad_ext(articleName, otherwise) {
  var targetContainer = document.getElementsByTagName("main")[0];
  var articleResource = "articles/" + articleName + ".html";

  var firstLoad = true;

  loadArticle(
    articleResource,
    targetContainer,
    function() {
      /* Code to be run before the page properly loads */
      /* Add page dependencies, like stylesheets and scripts
         *  to the page */
      /* Allows minimal loading of page */
      var deps = documentDependencies[articleName];

      /* Disable the previous stylesheets */
      /* We can do this by setting a property on the stylesheet,
         *  putting it out of use for the current page */
      if (location.search.length != 0) {
        var prevArticle = location.search;
        prevArticle = prevArticle.replace("?", "");
        var stylesheetInfo = documentDependencies[prevArticle];
        if (stylesheetInfo != undefined) {
          setStylesheetState(stylesheetInfo.stylesheets, false);
        }
      }

      /* The rest of the code does not make sense if the page does
         *  not carry unique stylesheets */
      if (deps == null) return;

      /* If elements are already inserted, just enable the stylesheets */
      if (deps.isLoaded) {
        var stylesheetInfo = documentDependencies[articleName];

        if (stylesheetInfo != undefined) {
          setStylesheetState(stylesheetInfo.stylesheets, true);
        }

        firstLoad = false;
        return;
      }

      /* We set a state flag to indicate that the
         *  dependencies are loaded */
      deps.isLoaded = true;

      /* Get a reference to the <head> element into which scripts and
         *  stylesheets will be inserted */
      var headerElement = document.getElementsByTagName("head")[0];

      /* In this case, the stylesheets have yet to be injected */
      for (var i = 0; i < deps.stylesheets.length; i++) {
        var sheetElement = document.createElement("link");
        sheetElement.rel = "stylesheet";
        sheetElement.href = deps.stylesheets[i];

        headerElement.append(sheetElement);
      }

      /* Insert script tags for the scripts we need to load */
      for (var i = 0; i < deps.scripts.length; i++) {
        var scriptElement = document.createElement("script");
        scriptElement.onload = function() {
          scriptLoad(articleName);
        };
        scriptElement.src = deps.scripts[i];
        scriptElement.type = "text/javascript";

        headerElement.append(scriptElement);
      }
    },
    function() {
      /* Some Javascript files will need initialization on page load */
      /* Providing a function name, we can call a loader function.
         *  It is not immediately available, so we have to wait a
         *  little bit for it to become available.
         * Let the race begin! */
      if (!firstLoad) scriptLoad(articleName);

      /* If navigation was successful, set location such that
         *  the user may bookmark the page */
      history.pushState(null, null, "?" + articleName);
    },
    function() {
      /* TODO: Add better error handling... */
      console.log("Failed to load page: " + articleName);
      otherwise();
    }
  );
}

/* The basic function to load an article, no fluff */
function quickLoad(articleName) {
  quickLoad_ext(articleName, function() {});
}

/* On loading the page clean, load a page */
window.onload = function() {
  var target = location.search;
  target = target.replace("?", "");

  /* Try to load the article given in the URL, otherwise
     *  load the home page for now.
     */
  if (target.length > 0)
    quickLoad_ext(target, function() {
      quickLoad("home");
    });
  else quickLoad("home");
};
