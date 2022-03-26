find_status="";
object=[]
function setup(){
    canvas=createCanvas(380,380)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    object_Detection=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="Status:  Detecting Object"
}
function modelLoaded(){
    console.log("Model Loaded");
    find_status=true;
    object_Detection.detect(video,gotResults)
}
function preload(){
    song=loadSound("song.mp3")
}
function draw(){
    r=random(255);
    g=random(255);
    b=random(255);
    image(video,0,0,380,380)
    if(find_status!=""){
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="Status:  Detected Object(s)"
            if(object.length=0){
                document.getElementById("btobnt").innerHTML="Baby not found";
                song.play()
            }
            else{
                document.getElementById("btobnt").innerHTML="Baby Found!!!!";
            }
            fill(r,g,b)
            percent=floor(object[i].confidence*100)
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y)
            textSize(22)
            noFill()
            stroke(r,g,b)
            rect(object[i].x,object[i].y,object[i].width,object[i].height)
        }
    }
}
function gotResults(error,results){
if(error){
    console.log(error);
}
console.log(results);
object=results
}