window.onload=function(){
    var button=document.getElementById("add_button");
    button.onclick=createsticky;
    var clearbutton=document.getElementById("clear_button");
    clearbutton.onclick=clearstorage;
    var stickiesarray=getstickiesarray();
    for (var i = 0; i < stickiesarray.length; i++){
        var key=stickiesarray[i];
        var stickyobj=JSON.parse(localStorage[key]);
        addstickytodom(key,stickyobj);
        }
};

function createsticky(){
    var value=document.getElementById("note_text").value;
    var currenttime=new Date();
    var colorselectobj=document.getElementById("note_color");
    var index=colorselectobj.selectedIndex;
    var color=colorselectobj[index].value;
    var key="sticky_"+ currenttime.getTime();
    var stickyobj={
        "value":value,
        "color":color
    };
    localStorage.setItem(key,JSON.stringify(stickyobj));
    var stickiesarray=getstickiesarray();
    stickiesarray.push(key);
    localStorage.setItem("stickiesarray",JSON.stringify(stickiesarray));
    addstickytodom(key,stickyobj);
}

function getstickiesarray(){
    var stickiesarray=localStorage.getItem("stickiesarray");
    if(!stickiesarray){
        stickiesarray=[];
        localStorage.setItem("stickiesarray",JSON.stringify(stickiesarray));
    }
    else {
        stickiesarray=JSON.parse(stickiesarray);
    }
    return stickiesarray;
}
function addstickytodom(key,stickyobj){
    var stickies=document.getElementById("stickies");
    var sticky=document.createElement("li");
    var span=document.createElement("span");
    sticky.setAttribute("class","sticky");
    sticky.style.backgroundColor=stickyobj.color;
    sticky.setAttribute("id",key);
    span.innerHTML=stickyobj.value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
    sticky.onclick=deletesticky;
}

function deletesticky(e) {
    var key = e.target.id;
    if (e.target.tagName.toLowerCase() == "span")
        key = e.target.parentNode.id;
    localStorage.removeItem(key);
    var stickiesarray=getstickiesarray();
    if(stickiesarray){
        for(var i=0;i<stickiesarray.length;i++){
            if(stickiesarray[i]==key)
                stickiesarray.splice(i,1);
        }
    }
    localStorage.setItem("stickiesarray",JSON.stringify(stickiesarray));
    removestickyfromdom(key);
}

function removestickyfromdom(key){
    var sticky=document.getElementById(key);
    sticky.parentNode.removeChild(sticky);
}
function clearstorage(){
    localStorage.clear();
}
