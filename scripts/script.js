var worker;
var sessionID = 0;

const WORK_SESSION = 1;
const BREAK_SESSION = 2;
const LONG_BREAK_SESSION = 3;

window.onload = function init(){
    document.getElementById("startTimer").addEventListener("click",startTimer);
    document.getElementById("stopTimer").addEventListener("click",stopTimer);
}

function startTimer()
{
    console.log("timer started");

    sessionParams.timerLoops[0] = document.getElementById("workSession").value;
    sessionParams.timerLoops[1] = document.getElementById("numberOfSession").value-1;

    sessionParams.timerLoops[2] = document.getElementById("breakSession").value;
    sessionParams.timerLoops[3] = document.getElementById("longBreakSession").value;

    sessionID = WORK_SESSION;
    
    startWorker(sessionParams.timerLoops[0]);
}

function stopTimer()
{
    worker.terminate();
    document.getElementById("watchFace").innerHTML="--:--";
}

function startWorker(time)
{
    
    //console.log("inside start worker");
    worker = new Worker('scripts/worker.js');
    
    //console.log("worker started")

    worker.postMessage([time*60]);
    
    worker.onmessage = onReplyFromWorker;
    //document.getElementById("minutes").innerHTML=y;
}

function onReplyFromWorker(params)
{
    console.log("from script = "+params.data);
    document.getElementById("watchFace").innerHTML=params.data;
    if(params.data==="00"+"\t:\t"+"0-1")
    {
        stopTimer();
        nextSession();
    }
}

var sessionParams={
    timerLoops: [0,0,0]
};

function nextSession()
{
    switch(sessionID)
    {
        case WORK_SESSION:
            if(sessionParams.timerLoops[1] != 0)
            {
                sessionParams.timerLoops[1]--;
                sessionID=BREAK_SESSION;
                startWorker(sessionParams.timerLoops[2]);
                return;
            }
            sessionID=LONG_BREAK_SESSION;
            startWorker(sessionParams.timerLoops[3]);
            break;
        case BREAK_SESSION:
        case LONG_BREAK_SESSION:
            sessionID=WORK_SESSION;
            startWorker(sessionParams.timerLoops[1]);
    }
}