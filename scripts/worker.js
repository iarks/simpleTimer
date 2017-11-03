this.onmessage = function running(params)
{
    //console.log(params.data + "printing from worker")
    tickTock(params.data[0]);  
}

function tickTock(secondsCountdown)
{
    setInterval(function(){postMessage(--secondsCountdown)},1000);
}