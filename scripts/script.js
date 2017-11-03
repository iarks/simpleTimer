var worker;
var minutes=1;// for x minutes set minutes to x-1

window.onload = function init(){
    document.getElementById("startTimer").addEventListener("click",startTimer);
    document.getElementById("stopTimer").addEventListener("click",stopTimer);
}

function startTimer(){
    console.log("timer started");
    
    startWorker();
}

function stopTimer()
{
    worker.terminate();
}

function startWorker()
{
    //console.log("inside start worker");
    worker = new Worker('scripts/worker.js');
    
    //console.log("worker started")

    worker.postMessage([60]);
    
    worker.onmessage = onReplyFromWorker;
    //document.getElementById("minutes").innerHTML=y;
}

function onReplyFromWorker(params){
    // console.log("printing from main " + parseInt(ev.data)-60);
    var seconds= parseInt(params.data);
    //x=x-60;
    console.log(seconds);
    document.getElementById("watchFace").innerHTML=(minutes < 10 ? "0" : "")+minutes+"\t:\t"+(seconds < 10 ? "0" : "") + seconds;
    if(seconds==0)
    {
        if(minutes!=0)
        {
            worker.terminate();
            --minutes;
            startWorker();
        }
        else
        {
            stopTimer();
        }
    }
}