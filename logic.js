let home2session=document.querySelector("#stdiv")
if (home2session){
home2session.addEventListener("click",()=>{
    window.location.href="session.html"
})}

let home2stats=document.querySelector("#viewdiv")
if(home2stats){
home2stats.addEventListener("click",()=>{
    window.location.href="stats.html"
})}
/*-------------------------------------------------------home-------------------------------------------------------------*/
let typeCounter=0
let sessionType=document.querySelector('#session_label')
let sessionCounter=0
let sessions=["work","study","yoga"]
if (sessionType){
sessionType.addEventListener("click",()=>{
    sessionType.textContent=sessions[sessionCounter%3]
    localStorage.setItem("sessionType",sessions[(sessionCounter)%3])
    sessionCounter+=1
    typeCounter+=1
})}

let session2analysis=document.querySelector("#end_session")
if (session2analysis){
    session2analysis.addEventListener("click",()=>{
        if(typeCounter>=1){
        window.location.href="analysis.html"
        }
        else{
            alert("select session type")
        }
    })}
function updateTime() {

    pause_time = Date.now() - start_time;

    let seconds = Math.floor(pause_time / 1000) % 60;
    let minutes = Math.floor(pause_time / (1000 * 60)) % 60;
    let hours = Math.floor(pause_time / (1000 * 60 * 60));

    seconds = String(seconds).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    hours = String(hours).padStart(2, "0");

    document.querySelector("#stopwatch").textContent = `${hours}:${minutes}:${seconds}`;
    localStorage.setItem("displaytime",document.querySelector("#stopwatch").textContent)
}


let start_time=0
let pause_time=0
let time_interval
let running=false
if(document.querySelector('#start')){
document.querySelector('#start').addEventListener("click",()=>{
    if(running) return
    running=true
    start_time=Date.now()-pause_time
    time_interval=setInterval(updateTime,10)
})}
if(document.querySelector('#stop')){
document.querySelector("#stop").addEventListener("click",()=>{
    running=false
    clearInterval(time_interval)
})}
if(document.querySelector('#reset')){
document.querySelector("#reset").addEventListener("click",()=>{
    running=false
    clearInterval(time_interval)
    pause_time=0
    document.querySelector("#stopwatch").textContent="00:00:00"
})}

/*---------------------------------------------------------session----------------------------------------------------------------*/
let analysis2home=document.querySelector("#analysis_to_home")
if(analysis2home){
    analysis2home.addEventListener("click",()=>{
        window.location.href="home.html"
    })}
let analysis_session_type=document.querySelector("#session_display")
if (analysis_session_type){
analysis_session_type.textContent="session type :"+localStorage.getItem("sessionType")
localStorage.removeItem("sessionType")
}
const live_date= new Date()
const formatted_live_date=live_date.toDateString()
if(document.querySelector("#current_date")){
document.querySelector("#current_date").textContent="Date :"+formatted_live_date
}
if(document.querySelector("#time_display")){
document.querySelector("#time_display").textContent="Duration :"+localStorage.getItem("displaytime")
}
/*graph is the dict that stores date and duration */
let graph = JSON.parse(localStorage.getItem("graph")) || {};

let graph_time = localStorage.getItem("displaytime");

if (graph_time !== null) {

    graph_time =
        parseInt(graph_time.slice(0,2)) * 60 +
        parseInt(graph_time.slice(3,5)) +
        parseInt(graph_time.slice(6,8)) / 60;

    let today = new Date().toLocaleDateString("en-GB");

    graph[today] = (graph[today] ?? 0) + graph_time;

    localStorage.setItem("graph", JSON.stringify(graph));
    localStorage.removeItem("displaytime");
}
/*--------------------------------------------------------------analysis------------------------------------------------------------*/
console.log(graph)
let labels = Object.keys(graph);
let values = Object.values(graph);

const canvas =document.querySelector("#myChart")
if(canvas){
const ctx = document.querySelector("#myChart").getContext("2d");

let myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: labels,
        datasets: [{
            label: "Duration (minutes)",
            data: values,
            borderWidth: 2,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});}
if(document.querySelector("#stats_2_home")){
    document.querySelector("#stats_2_home").addEventListener("click",()=>{
        window.location.href="home.html"
    })
}
/*-----------------------------------------------------------------stats-------------------------------------------------------------------*/


