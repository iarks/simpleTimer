var timeoutHandle;
var stop = false;
var w;
var y=1;

window.onload = function init(){
    document.getElementById("startTimer").addEventListener("click",startTimer);
    document.getElementById("stopTimer").addEventListener("click",stopTimer);
}

function startTimer(){
    console.log("timer started");
    
    startWorker();

    console.log("timer started");
    //console.log("timer started for :" + time + " min(s)");

    //document.getElementById("minutes").innerHTML=y;
}

function stopTimer()
{
    w.terminate();
}

function startWorker()
{
    //console.log("inside start worker");
    w = new Worker('scripts/worker.js');
    
    //console.log("worker started")

    w.postMessage([60]);
    
    w.onmessage = f;
    //document.getElementById("minutes").innerHTML=y;
}

function f(ev)
{
    // console.log("printing from main " + parseInt(ev.data)-60);
    var x= parseInt(ev.data);
    //x=x-60;
    console.log(x);
    document.getElementById("minutes").innerHTML=(y < 10 ? "0" : "")+y+"\t:\t"+(x < 10 ? "0" : "") + x;
    if(x==0)
    {
        if(y!=0)
        {
            w.terminate();
            --y;
            startWorker();
        }
        else
        {
            stopTimer();
        }
    }
}