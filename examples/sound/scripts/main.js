(function() {
  var message = document.querySelector('[data-message]')
  window.addEventListener('message', ITSME.receiveMessage, false)

  ITSME.params = location.search.substr(1).split('&') || {};

  //remote_url = `${remote_url}/users/${ITSME.params[email]}/${ITSME.params[key]}/`;
  

  ITSME.makeViewer(ITSME.params.debug)
  ITSME.registerSceneType("skybox", ITSME.IMScene);
  
  ITSME.viewer.setScene(new ITSME.sceneTypes["skybox"]("cube2"));
  //ITSME.viewer.activeScene.makeSkybox("cube2", 1500, new THREE.Vector3(0,0,0), "cube2");

  //save background music to viewer.  this MUST be used as the background music variable in order for sound on iOS to work
  //iOS has a limitation of 1 audio file.  whomp.
  ITSME.viewer.music = new ITSME.IMAudio("discotechy.mp3", {volume:0.25, autoplay:true, useAudioElement: ITSME.mobileCheck}, ITSME.camera.listener);


  ITSME.loadManager.onLoad = function(){
    ITSME.viewer.doRender = true;
    message.innerHTML = ""
  }
  

  //use this to update the background music.
  ITSME.viewer.music.changeAudio("blue_car.mp3", {autoplay:true});


  function addEventListeners() {

    window.addEventListener('message', ITSME.receiveMessage, false)
  }
  parent.postMessage(ITSME.params.key, '*');


})()


