// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    nbPoints: 45, //16 because we want 22.5° angle per line
    scale: 0.1,
    translate: 8,
    noiseScale: 1,
    Download_Image: () => save(),
}
gui.add(params, "nbPoints", 0, 200, 1)
gui.add(params, "scale", 0, 2, 0.05)
gui.add(params, "translate", 0, 50, 1)
gui.add(params, "noiseScale", 0, 200, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {
    background('white');
    let xPoint = 0;
    let yPoint = 0;
    const angle = 360 / params.nbPoints; // 22.5°
    const radius =  width/2;
    randomSeed(0);

    function distortLine(x1, y1, x2, y2){
        const step = 0.01;
            for(let i =0; i <1 ; i+= step){
                const x_start = lerp(x1, x2, i);
                const y_start = lerp(x1, x2, i);
                const x_end = lerp(x1, x2, i + step);
                const y_end = lerp(y1, y2, i + step);
                line(x_start + noise(x_start, y_start), y_start, x_end, y_end);
            }
        //lerp on a param de % entre 0 et 1
    }
    		
    function drawCircle() {
        for (let i = 0; i < 360; i = i + angle) {
            const x = cos(radians(i)) * width; //convert angle to radians for x and y coordinates
            const y = sin(radians(i)) * width;
            distortLine(radius, radius, x*width, y*width);
            //line(radius, radius, x * width, y * width); //draw a line from each point back to the centre     
        }
    }

   

   function repeat(){
        for (xPoint=0; xPoint<=width+200; xPoint +=100) {
            for(yPoint=0; yPoint<=height+200; yPoint +=100){
                push();
                   translate(xPoint-75 + randomGaussian(-params.translate, params.translate), 
                   yPoint-75 + randomGaussian(-params.translate, params.translate));
                   //translate(xPoint-100, yPoint-100 );
                   scale(params.scale ,params.scale);
                    drawCircle();
                pop();
            }
            
        }
    }
    //drawCircle();
    repeat();
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}