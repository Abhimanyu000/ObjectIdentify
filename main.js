img="";
STATUS="";
object=[];

function preload(){
    img=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(1000, 700);
    canvas.center();

    MoDeL=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Object detection has begun";
}

function draw(){
    image(img, 0, 0, 1000, 700);

    if(STATUS!=""){
        for(i=0; i<object.length; i+1){
            document.getElementById("status").innerHTML="Object detected";
            fill("red");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%", object[i].x+10, object[i].y+10);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function modelLoaded(){
    STATUS="true";
    console.log("MODEL LOADED");
    MoDeL.detect(img, gotresults);
}

function gotresults(error, results){
    if (error){
        console.log("ERROR 404");
    }
    else{
        console.log(results);
        object=results;
    }
}