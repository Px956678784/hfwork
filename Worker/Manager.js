window.onload=function(){
  var worker=new Worker("Worker.js");
    worker.onmessage=function(event){
        alert("Worker says " + event.data);
    };

    worker.postMessage("ping");


};

