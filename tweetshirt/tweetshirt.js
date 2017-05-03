window.onload=function(){
  var button=document.getElementById("previewButton");
    button.onclick=previewhandler;

};

function previewhandler(){
    var canvas=document.getElementById("tshirtcanvas");
    var context=canvas.getContext("2d");
    fillbackgroundcolor(canvas,context);
    var selectobj=document.getElementById("shape");
    var index=selectobj.selectedIndex;
    var shape=selectobj[index].value;
    if(shape=="squares") {
        for (var i = 0; i < 20; i++) {
            drawsquare(canvas, context);
        }
    }
    if(shape=="circles"){
        for(var j=0;j<20;j++) {
            drawcircle(canvas,context);
        }
    }
    drawtext(canvas,context);
    drawbird(canvas,context);
}

function fillbackgroundcolor(canvas,context){
    var selectobj=document.getElementById("backgroundcolor");
    var index=selectobj.selectedIndex;
    var bgcolor=selectobj[index].value;
    context.fillStyle=bgcolor;
    context.fillRect(0,0,canvas.width,canvas.height);
}

function drawsquare(canvas,context){
    var w=Math.floor(Math.random() * 40);
    var x=Math.floor(Math.random() * canvas.width);
    var y=Math.floor(Math.random() * canvas.height);
    context.fillStyle="lightblue";
    context.fillRect(x,y,w,w);
}

function  drawcircle(canvas,context){
    var radius = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, true);
    context.fillStyle = "lightblue";
    context.fill();
}

function updateTweets(tweets){
    var tweetsselection=document.getElementById("tweets");

    for (var i=0;i<tweets.length;i++){
        tweet=tweets[i];
        var option=document.createElement("option");
        option.text=tweet.text;
        option.value=tweet.text.replace("\"", "'");
        tweetsselection.options.add(option);
    }
    tweetsselection.selectedIndex=0;
}

function drawtext(canvas,context){
    var selectobj=document.getElementById("foregroundColor");
    var index=selectobj.selectedIndex;
    var fgcolor=selectobj[index].value;
    context.fillStyle=fgcolor;
    context.font="bold 1em sans-serif";
    context.textAlign="left";
    context.fillText("I saw this tweet",20,40);
    selectobj=document.getElementById("tweets");
    index=selectobj.selectedIndex;
    var tweet=selectobj[index].value;
    context.font="italic 1.2em serif";
    context.fillText(tweet,30,100);
    context.font="bold 1em sans-serif";
    context.textAlign="right";
    context.fillText("and all I got was this lousy T-shirt!",canvas.width-20,canvas.height-40);
}

function drawbird(canvas,context){
    var twitterbird=new Image();
    twitterbird.src="img/twitterbird.jpg";
    twitterbird.onload=function() {
        context.drawImage(twitterbird, 20, 120, 70, 70);
    };
}

