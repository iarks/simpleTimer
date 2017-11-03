var timeoutHandle;
var stop = false;
var w;

window.onload = function init(){
    document.getElementById("startTimer").addEventListener("click",startTimer);
    document.getElementById("stopTimer").addEventListener("click",stopTimer);
}

function startTimer(){
    console.log("timer started");
    
    startWorker();

    console.log("timer started");
    //console.log("timer started for :" + time + " min(s)");
}

function stopTimer()
{
    w.terminate();
}



function startWorker()
{
    console.log("inside start worker");

    w = new Worker('scripts/worker.js');
    
    console.log("worker started")

    w.postMessage([100]);
    
    w.onmessage = f;
}

function f(ev)
{
    console.log("printing from main " + ev.data);
}