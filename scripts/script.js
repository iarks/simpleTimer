var timeoutHandle;
var stop = false;

window.onload = function init(){
    document.getElementById("startTimer").addEventListener("click",startTimer);
    document.getElementById("stopTimer").addEventListener("click",stopTimer);

    console.log(sessionParams.continuousMode);
}

function countdown(minutes)
{
    var seconds = 60;
    var mins = minutes
    
    function tick()
    {
        // get reference of place where time shoulf be updated
        var counter = document.getElementById("demo");

        // curent minute value needs to a 1 less --> example, if time is set as 5 --> countdown starts from 4:59 --> so mins is one less
        var current_minutes = mins-1

        // similarly seconds are one less
        seconds--;

        // set the date and time on display 
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        
        // if seconds is greater than 0 normal execution - wait for a second and redo
        if(!stop)
        {
            if(seconds>0)
            {
                timeoutHandle=setTimeout(tick, 1000);
            }
            else
            {
                // if mins is greater than 1 normal execution
                if(mins>1)
                {
                    setTimeout(function ()
                    {
                        countdown(mins - 1);
                    }, 1000);
                }
            }
        }
        else
        {
            document.getElementById("demo").innerHTML="--:--</br>Timer Stopped";
            stop=false;
            return;
        }
    }
    
    
    tick();
}

function startTimer()
{
    //todo - stop existing timers if running
    //stopTimer(); 
    console.log("timer started");
    var time = document.getElementById("workSession").value;
    console.log("timer started for :" + time + " min(s)");
    countdown(time);
}

function stopTimer()
{
    stop=true;
}


var sessionParams =
{
    workSessionDuration:00,
    breakDuration:00,
    numBerOfSessions:00,
    continuousMode:false
};