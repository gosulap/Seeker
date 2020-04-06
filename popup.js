// <div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
function makeList(inputText){
    // go clear all the children in the list 
    while (document.getElementById("results").hasChildNodes()) {
        document.getElementById("results").removeChild(document.getElementById("results").lastChild);
    }
    let maxwidth = 350; 
    chrome.bookmarks.search(inputText,function(items){
        let results = document.getElementById("results"); 
        // set the width to start when there is nothing in the input 
        document.body.style.width = maxwidth + "px"; 
        for(let i = 0;i < items.length; i++){
            // make sure we arent looking at a folder 
            if(items[i]["url"] !== undefined){ 
                
                let wrapper = document.createElement("div"); 
                wrapper.className = "collection-item"; 

                // setup the row 
                let current = document.createElement("a"); 
                current.appendChild(document.createTextNode(items[i]["title"])); 
                current.href = items[i]["url"]; 
                current.target = "_blank";  

                let button = document.createElement("button"); 
                button.id = items[i]["id"]; 
                button.innerHTML = "✕"; 
                button.title = "Delete this bookmark";
                button.addEventListener("click",function(){
                    let id = this.id; 
                    chrome.bookmarks.remove(id,function(){
                        console.log("deleted"); 
                        makeList(inputText); 
                    }); 
                }); 
    
                wrapper.appendChild(button); 
                wrapper.appendChild(current);
                results.appendChild(wrapper);

                // go make the window as big as the largest title 
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");       
                let width = Math.ceil(ctx.measureText(items[i]["title"]).width);
                if(width > maxwidth){
                    maxwidth = width; 
                    document.body.style.width = maxwidth + "px"; 
                    console.log(items[i]["title"]); 
                }
            }
        }
    });
}

document.getElementById("seeker").addEventListener("input",function(){
    // go grad whatever is in the input and clean it up 
    let inputText = document.getElementById("seeker").value.trim(); 
    makeList(inputText); 
}); 