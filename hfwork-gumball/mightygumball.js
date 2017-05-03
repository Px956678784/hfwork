window.onload=function(){
    setInterval(handlefresh,3000);
};
var lastreporttime;
function handlefresh(){
    var url="http://gumball.wickedlysmart.com/?callback=updateSales"+"&lastreporttime="+lastreporttime+"&random="+(new Date()).getTime();
    var newScriptElement=document.createElement("script");
    newScriptElement.setAttribute("src",url);
    newScriptElement.setAttribute("id","jsonp");
    var oldScriptElement=document.getElementById("jsonp");
    var head=document.getElementsByTagName("head")[0];
    if(oldScriptElement==null){
        head.appendChild(newScriptElement);
    }
    else head.replaceChild(newScriptElement,oldScriptElement);
}

function updateSales(sales){
    var salesDiv=document.getElementById("sales");
    for(var i=0;i<sales.length;i++){
        var sale=sales[i];
        var div=document.createElement("div");
        div.innerHTML=sale.name +" sold "+sale.sales + " gumballs ";
        div.setAttribute("class","itemdiv");
        salesDiv.appendChild(div);
    }
    if (sales.length>0) {
        lastreporttime=sales[sales.length-1].time;
    }
}
