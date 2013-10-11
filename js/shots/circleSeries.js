Circ = {};
Circ.GetComposer = function(renderer, scene, camera) {
    composer = new THREE.EffectComposer( renderer );
    
    composer.model = new THREE.RenderPass(scene, camera);
    composer.addPass(composer.model); // render to buffer1

    composer.vignette = new THREE.ShaderPass(THREE.VignetteShader);
    composer.vignette.uniforms[ "offset" ].value = .7;
    composer.vignette.uniforms[ "darkness" ].value = 0;
    composer.vignette.renderToScreen = false;
    composer.addPass(composer.vignette);

    return composer;
}
