importScripts("workerlib.js");
onmessage=function(task){
    var workresult=computeRow(task.data);
    postMessage(workresult);
};