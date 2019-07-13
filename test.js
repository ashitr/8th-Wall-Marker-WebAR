// Copyright (c) 2018 8th Wall, Inc.
var storageRef = firebase.storage().ref();

const onxrloaded = () => {
    XR.addCameraPipelineModules([ // Add camera pipeline modules.
        // Existing pipeline modules.
        // XR.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
        XRExtras.AlmostThere.pipelineModule(), // Detects unsupported browsers and gives hints.
        // XRExtras.FullWindowCanvas.pipelineModule(), // Modifies the canvas to fill the window.
        XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
        XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.
        XR.canvasScreenshot().cameraPipelineModule()
    ])

    // Request camera permissions and run the camera.
    XR.run({ canvas: document.getElementById('camerafeed') })
}
var intervalID = window.setInterval(myCallback, 100);

function myCallback() {
    XR.canvasScreenshot().takeScreenshot().then(
        data => {
            // myImage is an <img> HTML element
            const image = document.getElementById('myImage')
            image.src = 'data:image/jpeg;base64,' + data
        },
        error => {
            console.log(error)
                // Handle screenshot error.
        })
    var mountainsRef = storageRef.child('image.jpg');
    var mountainImagesRef = storageRef.child('images/mountains.jpg');
    mountainsRef.name === mountainImagesRef.name // true
    mountainsRef.fullPath === mountainImagesRef.fullPath

}
// Show loading screen before the full XR library has been loaded.
const load = () => { XRExtras.Loading.showLoading({ onxrloaded }) }
window.onload = () => { window.XRExtras ? load() : window.addEventListener('xrextrasloaded', load) }