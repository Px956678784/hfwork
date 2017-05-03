var numberofworkers=8;
var workers=[];
var nextrow=0;
var generation=0;

window.onload=init;
function init(){
	setupGraphics();
    canvas.onclick=function(event){
        handleclick(event.clientX,event.clientY);
    };
    window.onresize = function() {
        resizeToWindow();
    };

	for(var i=0;i<numberofworkers;i++){
        var worker = new Worker("worker.js");
		worker.onmessage=function(event){
			progressWork(event.target,event.data);
		};
		worker.idle=true;
		workers.push(worker);

	}
	startWorks();
}

function startWorks(){
	generation++;
	nextrow=0;
	for(var i=0;i<workers.length;i++){
		var worker=workers[i];
		if(worker.idle){
			var task=createTask(nextrow);
            worker.idle=false;
            worker.postMessage(task);
            nextrow++;
		}
	}
}

function progressWork(worker,workerresult){
    if(workerresult.generation==generation)
        drawRow(workerresult);
    reassignworker(worker);
}

function reassignworker(worker){
    var row=nextrow++;
    if(row>=canvas.height){
        worker.idle=true;
    }
    else {
        var task=createTask(row);
        worker.idle=false;
        worker.postMessage(task);
    }
}


function handleclick(x,y){
    var width=r_max-r_min;
    var height=i_min-i_max;
    var click_r=r_min + width * x /canvas.width;
    var click_i=i_max+ height * y /canvas.height;
    var zoom=8;
    r_max=click_r - width/zoom;
    r_min=click_r + width/zoom;
    i_max=click_i - height/zoom;
    i_min=click_i + height/zoom;
    startWorks();
}

function resizeToWindow() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var width = ((i_max - i_min) * canvas.width / canvas.height);
    var r_mid = (r_max + r_min) / 2;
    r_min = r_mid - width/2;
    r_max = r_mid + width/2;
    rowData = ctx.createImageData(canvas.width, 1);
    startWorks();
}

