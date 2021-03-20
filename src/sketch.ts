// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    nbPoints: 45, //16 because we want 22.5° angle per line
    scale: 0.1,
    translate: 8,
    Download_Image: () => save(),
}
gui.add(params, "nbPoints", 0, 200, 1)
gui.add(params, "scale", 0, 2, 0.05)
gui.add(params, "translate", 0, 50, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {
    background('white');
    let xPoint = 0;
    let yPoint = 0;
    const angle = 360 / params.nbPoints; // 22.5°
    const radius =  width/1.5;
    
    		
    function drawCircle() {
        for (let i = 0; i < 360; i = i + angle) {
            let x = cos(radians(i)) * width; //convert angle to radians for x and y coordinates
            let y = sin(radians(i)) * width;
            line(radius, radius, x * width, y * width); //draw a line from each point back to the centre     
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