var rick = null;
(function() {
  var message = document.querySelector('[data-message]')

  ITSME.params = location.search.substr(1).split('&') || {};


  ITSME.makeViewer(ITSME.params.debug)
  ITSME.registerSceneType("skybox", ITSME.IMScene);

  ITSME.viewer.setScene(new ITSME.sceneTypes["skybox"]("cube2"));
  ITSME.viewer.activeScene.makeSkybox("cube2", 1500, new THREE.Vector3(0,0,0), "cube2");
  ITSME.viewer.activeScene.makeLight("ambient", 0xffffff);
  //rick = new ITSME.IMAvatar(`${remote_url}users/${ITSME.params.email}/${ITSME.params.key}/`, "avatar", "avatar.jpg", ITSME.params.animation, null, "rick", 30)

  ITSME.config.avatars.rick = {
    url: `${remote_url}users/${ITSME.params.email}/${ITSME.params.key}/avatar.json`,
    type: 'json',
    texture: `${remote_url}users/${ITSME.params.email}/${ITSME.params.key}/avatar.jpg`,
    animation: ITSME.params.animation,
    material: null,
    name: "rick",
    scale: 30
  }
  ITSME.config.animations.singing = {
    url: "https://static.itsme3d.com/animations/singing.json"
  }
  rick = new ITSME.IMAvatar("rick")
  var sword = new ITSME.IMModel(root_url, "assets/models/sword", "objmtl", null, null, "unlit", "sword", 0.1);

  rick.position.set(-10, -10, -50);
  rick.addAnimation("singing")


  sword.position.set(-10, -10, -50);



  ITSME.loadManager.onLoad = function(){
    ITSME.viewer.doRender = true;
    message.innerHTML = ""

    rick.attach("RightHand", sword, new THREE.Vector3(0, 5, 0), 1)


    rick.playAnimation("singing")

  }


  function addEventListeners() {

    window.addEventListener('message', ITSME.receiveMessage, false)
  }


})()
