var gui = new dat.GUI();
var params = {
    nbPoints: 45,
    scale: 0.1,
    translate: 8,
    noiseScale: 1,
    Download_Image: function () { return save(); },
};
gui.add(params, "nbPoints", 0, 200, 1);
gui.add(params, "scale", 0, 2, 0.05);
gui.add(params, "translate", 0, 50, 1);
gui.add(params, "noiseScale", 0, 200, 1);
gui.add(params, "Download_Image");
function draw() {
    background('white');
    var xPoint = 0;
    var yPoint = 0;
    var angle = 360 / params.nbPoints;
    var radius = width / 2;
    randomSeed(0);
    function distortLine(x1, y1, x2, y2) {
        var step = 0.01;
        for (var i = 0; i < 1; i += step) {
            var x_start = lerp(x1, x2, i);
            var y_start = lerp(x1, x2, i);
            var x_end = lerp(x1, x2, i + step);
            var y_end = lerp(y1, y2, i + step);
            line(x_start + noise(x_start, y_start), y_start, x_end, y_end);
        }
    }
    function drawCircle() {
        for (var i = 0; i < 360; i = i + angle) {
            var x = cos(radians(i)) * width;
            var y = sin(radians(i)) * width;
            distortLine(radius, radius, x * width, y * width);
        }
    }
    function repeat() {
        for (xPoint = 0; xPoint <= width + 200; xPoint += 100) {
            for (yPoint = 0; yPoint <= height + 200; yPoint += 100) {
                push();
                translate(xPoint - 75 + randomGaussian(-params.translate, params.translate), yPoint - 75 + randomGaussian(-params.translate, params.translate));
                scale(params.scale, params.scale);
                drawCircle();
                pop();
            }
        }
    }
    repeat();
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map