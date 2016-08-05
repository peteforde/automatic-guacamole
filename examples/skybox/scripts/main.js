(function() {
  var message = document.querySelector('[data-message]')

//  ITSME.params = location.search.substr(1).split('&') || {};
  

  ITSME.makeViewer(ITSME.params.debug)
  ITSME.registerSceneType("skybox", ITSME.IMScene);
  ITSME.viewer.doRender = true;
  ITSME.viewer.setScene(new ITSME.sceneTypes["skybox"]("cube2"));
  ITSME.viewer.activeScene.makeSkybox("cube2", 1500, new THREE.Vector3(0,0,0), "cube2");
  message.innerHTML = ""


})()
