function gb_getStorage()
{
    var storedString = localStorage["guestbook"];
    
    try{
        return JSON.parse(storedString);
    } catch(e) {
        return [];
    }
}

function gb_saveStorage(data)
{
    localStorage["guestbook"] = JSON.stringify(data);
}

function gb_loadComments()
{
    var comments = gb_getStorage();
    var container = document.getElementById("guestbookComments");
    
    /* Clear the comment container, to avoid duplicate comments */
    while(container.lastChild) {
        container.removeChild(container.lastChild);
    }
    
    for(var i=0; i<comments.length; i++)
    {
        var comment = comments[i];
        
        var element = document.createElement("div");
        
        var dateL = document.createElement("emph");
        var nameL = document.createElement("strong");
        var textL = document.createElement("div");
        
        /* TODO: Add CSS class for textL and element */
        
        dateL.innerHTML = new Date(comment.date).toLocaleDateString(["en-GB"]);
        nameL.innerHTML = comment.name;
        textL.innerHTML = comment.message;
        
        element.append(dateL);
        element.append(document.createElement("br"));
        element.append(nameL);
        element.append(document.createElement("br"));
        element.append(textL);
        
        container.append(element);
    }
}

function gb_submitComment()
{
    var nameBox = document.getElementById("gb_nameBox");
    var msgBox = document.getElementById("gb_msgBox");
    
    var currentBook = gb_getStorage();
    
    currentBook.push({
        name: nameBox.value,
        message: msgBox.value,
        date: Date.now()
    });
    
    gb_saveStorage(currentBook);
    
    gb_loadComments();
}

function gb_onLoad()
{
}

