(function() {
  let message = document.querySelector('[data-message]')
  let hint = document.querySelector('.viewer-hint')

  window.addEventListener('message', ITSME.receiveMessage, false)



  ITSME.params = location.search.substr(1).split('&') || {};
  
  /*if (co)
    THREE.ImageUtils.crossOrigin = "anonymous";*/

  ;
  //message.innerHTML = "Register scene"
  ITSME.makeViewer(ITSME.params.debug)
  ITSME.registerSceneType("skybox", ITSME.IMScene);
  ITSME.viewer.doRender = true;
  ITSME.viewer.setScene(new ITSME.sceneTypes["skybox"]("cube2"));
  ITSME.viewer.activeScene.makeSkybox("cube2", 1500, new THREE.Vector3(0,0,0), "cube2");

  ITSME.viewer.activeScene.add(ITSME.camera);

  /*if (ITSME.params['static'])
    ITSME.viewer.avatar = new ITSME.IMAvatar(`${root_url}/users/${ITSME.params.email}/${ITSME.params.key}`)
  else
    ITSME.viewer.avatar = new ITSME.IMAvatar(`${root_url}/users/${ITSME.params.email}/${ITSME.params.key}`,ITSME.params.animation)
    */

    requestAnimationFrame(ITSME.viewer.animate)



 /* message.innerHTML = "Loading your itsme 3D avatar!"
  ITSME.viewer.avatar.addEventListener('load', function() {
    message.innerHTML = ""
    ITSME.viewer.animate()
  })

*/
  function addEventListeners() {

    window.addEventListener('message', ITSME.receiveMessage, false)
  }


  addEventListeners()

  parent.postMessage(ITSME.params.key, '*');

})()
