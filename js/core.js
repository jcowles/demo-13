var renderer;
var stats, seq;

// Global namespace
F = {}

// shortcut for console.log
function log(msg) {
    console.log(msg);
}

function init() {
    // -- Uncomment to enable stats -- //
    //stats = new Stats();
    //stats.domElement.style.position	= 'absolute';
    //stats.domElement.style.bottom	= '0px';
    //document.body.appendChild( stats.domElement );

    renderer = new THREE.WebGLRenderer({
            antialias               : true,    // to get smoother output
            preserveDrawingBuffer   : true     // to allow screenshot
            });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClear = false;

    document.body.appendChild( renderer.domElement );

    seq = new F.Seq(renderer, document.getElementById("soundtrack"));

    // Time units are in seconds
    seq.addShots([

        // Red stripe effect
        [new F.Shots.Intro(), 0],

        // Black & white circles
        [new F.Shots.CircleSpline_6(), 9.23],

        // Cold neon intro, vocals
        [new F.Shots.Warp_1(), 22.2],
        
        // Sub-sampled curves   
        [new F.Shots.CircleSpline_4(), 28.5],

        // L has vocals, dwell and hard out after brief crescendo
        [new F.Shots.Warp_3(), 35.0],

        // octogonal rotation
        [new F.Shots.CircleSpline_2(), 46.2],

        // M Sizzle strings 1, grand neon reveal
        [new F.Shots.Warp_2(), 52.5],

        // blue & white curves chasing their tails
        [new F.Shots.CircleSpline_1(), 59.0],

        // M Sizzle strings 2, grand costar reveal
        [new F.Shots.Warp_4(), 65.27],

        // blue & white curves, three circles
        [new F.Shots.CircleSpline_5(), 71.8],

        // S Beat 1
        [new F.Shots.Warp_5(), 73.4],

        // blue & white curves
        [new F.Shots.CircleSpline_1(), 75.0],

        // S Beat 2
        [new F.Shots.Warp_6(), 76.6],

        // Whistle break
        [new F.Shots.WhistleBreak(), 78.2],
            // sub-sampled curves
            [new F.Shots.CircleSpline_4(), 88.0],
            // blue & white curves
            [new F.Shots.CircleSpline_1(), 89.5],
            // osc-like effect
            [new F.Shots.CircleSpline_3(), 91.0],

        // M Beats 1
        [new F.Shots.Warp_7(), 93.7],

        // blue & white curves 
        [new F.Shots.CircleSpline_1(), 97.0],

        // M Beats 2
        [new F.Shots.Warp_8(), 100.1],

        // black and white effect
        [new F.Shots.CircleSpline_6(), 103.2],

        // L Neon beats and crescendo with hard out to outro
        [new F.Shots.Warp_9(), 106.4],
        
        // Red stripes
        [new F.Shots.Outro(), 113.1],

        ]);

    seq.preload();

    // EDIT ME FOR CHOREOGRAPHY PURPOSES.
    // The number of seconds into the playlist we actually start playback.
    seq.setOffset(0);
}

function animate() {
    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );

    //stats.update();
    seq.update();
}

