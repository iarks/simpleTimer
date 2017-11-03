this.onmessage = function running(params)
{
    //console.log(params.data + "printing from worker")
    tickTock(params.data[0]);  
}

function tickTock(x)
{
    //x-=60;
    setInterval(function(){postMessage(--x)},1000);
}