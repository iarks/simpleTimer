var worker;
var sessionID = 0;
var startButton,stopButton;
var timerStatus,whatSessionIsThi,workSessionsLeftBeforeBreak,longBreadDuration;

window.onload = function init()
{
    startButton = document.getElementById("startTimer");
    startButton.addEventListener("click",startTimer);
    
    stopButton=document.getElementById("stopTimer");
    stopButton.disabled=true;
    stopButton.addEventListener("click",stopTimer);

    timerStatus = document.getElementById("timerStatus");
    timerStatus.innerHTML="Timer Stopped";

    whatSessionIsThi = document.getElementById("whatSessionisThis");
    whatSessionIsThi.innerHTML = "Timer not running. No session information."

    workSessionsLeftBeforeBreak = document.getElementById("workSessionLeftBeforeBreak");
    workSessionsLeftBeforeBreak.innerHTML="0";
}

function startTimer()
{
    console.log("timer started");

    sessionParams.timerLoops[0] = document.getElementById("workSessionDuration").value;
    sessionParams.timerLoops[1] = document.getElementById("numberOfSessionBeforeLongBreak").value-1;

    sessionParams.timerLoops[2] = document.getElementById("breakSessionDuration").value;
    sessionParams.timerLoops[3] = document.getElementById("longBreakSessionDuration").value;

    sessionID = 1;
    
    startWorker(sessionParams.timerLoops[0]);

    document.getElementById("startTimer").disabled=true;
    document.getElementById("stopTimer").disabled=false;

    whatSessionIsThi.innerHTML="WORKING SESSION";

    workSessionsLeftBeforeBreak.innerHTML=sessionParams.timerLoops[1];
}

function stopTimer()
{
    worker.terminate();
    document.getElementById("watchFace").innerHTML="--\t:\t--";
    timerStatus.innerHTML="Timer Stopped";
    console.log("a session is complete");

    startButton.disabled=false;
    stopButton.disabled=true;
}

function startWorker(time)
{
    
    //console.log("inside start worker");
    worker = new Worker('scripts/worker.js');

    timerStatus.innerHTML="Timer started for "+  (time < 10 ? "0" : "")+ time + "\t:\t00"; 
    
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
    sessionID++;
    console.log("new session id "+sessionID);
    if(sessionID%2==0)
    {
        if(sessionParams.timerLoops[1]==0)
        {
            console.log("staring long session");
            whatSessionIsThi.innerHTML="LONG BREAK SESSION";
            startWorker(sessionParams.timerLoops[3])
        }
        else
        {
            whatSessionIsThi.innerHTML="SHORT BREAK SESSION";
            console.log("staring break session");
            startWorker(sessionParams.timerLoops[2])
        }
    }
    else
    {
        sessionParams.timerLoops[1]--;
        workSessionsLeftBeforeBreak.innerHTML=sessionParams.timerLoops[1];
        console.log("staring work session");
        whatSessionIsThi.innerHTML="WORKING SESSION";
        startWorker(sessionParams.timerLoops[0]);
    }
}