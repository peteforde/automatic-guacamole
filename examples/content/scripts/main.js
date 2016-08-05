var rick = null;
(function() {
  ITSME.params = location.search.substr(1).split('&') || {};

  var debug = true;
  ITSME.makeViewer(debug)
  ITSME.registerSceneType("skybox", ITSME.IMScene);

  ITSME.viewer.setScene(new ITSME.sceneTypes["skybox"]("cube2"));
  ITSME.viewer.activeScene.makeSkybox("cube2", 1500, new THREE.Vector3(0,0,0), "cube2");

  ITSME.config.avatars.rick = {
    url: 'https://content.itsme3d.com/cr268-grc3CF_T9sL7MoyQ/avatar.json',
    type: 'json',
    texture: 'https://content.itsme3d.com/JZMB8E2TZqyVVrMesZqZRA/avatar.jpg',
    animation: null,
    material: null,
    name: "rick",
    scale: 20
  };

  ITSME.config.animations.singing = {
    url: 'https://static.itsme3d.com/animations/singing.json'
  };

  rick = new ITSME.IMAvatar("rick");

  rick.position.set(-10, -10, -50);
  rick.addAnimation("singing");

  ITSME.loadManager.onLoad = function(){
    ITSME.viewer.doRender = true;
    rick.playAnimation("singing");
  }

})();
