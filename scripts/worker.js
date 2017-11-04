var minutes=0;
var reply;

this.onmessage = function running(params)
{
    //console.log(params.data + "printing from worker")
    tickTock(parseInt(params.data[0]));  
}

function tickTock(secondsCountdown)
{
    console.log(reply);
    setInterval(function()
    {
        secondsCountdown--;
        minutes = parseInt(secondsCountdown/60);
        console.log(secondsCountdown+"\t::\t"+minutes)
        reply = (minutes < 10 ? "0" : "")+minutes+"\t:\t"+(secondsCountdown < 10 ? "0" : "") + (secondsCountdown-(minutes*60));
        postMessage(reply)},1000);
}