(function() {
  var message = document.querySelector('[data-message]')

//  ITSME.params = location.search.substr(1).split('&') || {};


  ITSME.makeViewer(ITSME.params.debug)
  ITSME.registerSceneType("skybox", ITSME.IMScene);
  ITSME.viewer.setScene(new ITSME.sceneTypes["skybox"]("cube2"));
  ITSME.viewer.activeScene.makeLight("ambient", 0xffffff);
  ITSME.viewer.activeScene.makeSkybox("cube2", 1500, new THREE.Vector3(0,0,0), "cube2");

  //ITSME.viewer.activeScene.add(adam);

  //create objmtl model
  var adam = new ITSME.IMModel(root_url, "assets/models/Adam", "objmtl", null, null, "unlit", "Adam", 0.1);
  //create json model with skeleton
  var john = new ITSME.IMModel(root_url, "assets/models/avatar", "json", "/assets/textures/avatar.jpg", null, "unlit", "John", 30);
  adam.position.set(-10, -10, -50);
  john.position.set(10, -10, -50);


  ITSME.loadManager.onLoad = function(){
    ITSME.viewer.doRender = true;
    message.innerHTML = ""

    john.attach("LeftHand", adam, new THREE.Vector3(0, -10, 0), 0.5)

  }

})()
