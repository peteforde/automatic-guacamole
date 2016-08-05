const OBJ_REGEX = /\.obj/
const MTL_REGEX = /\.mtl/
const TEXTURE_REGEX = /\.(jpg|jpeg|png|gif)/

ITSME.IMViewer = class IMViewer {
  constructor(debug=false) {
    if (!Detector.webgl)
      return Detector.addGetWebGLMessage()

      this.activeScene = null;
      this.renderStack = []
      this.renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true})
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setClearColor(0x000000)
      this.originalRender = this.renderer.render
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFShadowMap
      this.renderer.gammaInput = true
      this.renderer.gammaOutput = true
      this.clock = new THREE.Clock
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200000)
      this.camera.position.z = 1;
      this.doRender = false;


      try {
        this.camera.listener = new THREE.AudioListener
        this.camera.add(this.camera.listener)
      } catch (e) {
        // IE sucks
      }

      let container = document.querySelector('#renderer')
      container.appendChild(this.renderer.domElement)

      if (debug) {
        //this.stats = new Stats()
        //container.appendChild(this.stats.domElement)
      }

      this.oControls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
      this.oControls.enableZoom = true;

      this.fakeCamera = new THREE.Object3D();

      //this.controls = new THREE.VRControls(this.fakeCamera)
      //this.vreffect = new THREE.VREffect(this.renderer)
      //this.vreffect.setSize(window.innerWidth, window.innerHeight)
      //this.vrmanager = new WebVRManager(this.renderer, this.vreffect, {hideButton: ITSME.mobileCheck})

//       let muteButton = this.vrmanager.button.createButton()
//       document.body.appendChild(muteButton)

      // sceneButton.src = root_url + '/player/scene.png'
      // sceneButton.title = 'Switch scene'
      // sceneButton.style.bottom = 0
      // sceneButton.style.left = '48px'
      // sceneButton.style.display = 'block'
      // sceneButton.addEventListener('click', this.switchScene.bind(this))

      this.iosPlay = function(e){
        if (this.music.playing)
          return false;
        this.playAudio(null, null, true);
        document.removeEventListener("touchstart", this.iosPlay, false);
      }

      document.addEventListener("touchstart", this.iosPlay.bind(this), false);


      window.addEventListener('resize', this.onResize.bind(this), false)

//       let orig = this.vrmanager.onVRClick_
//       this.vrmanager.onVRClick_ = () => {
//         this.renderer.shadowMap.enabled = false
//         orig.call(this.vrmanager)
//       }


      this.renderer.context.canvas.addEventListener("webglcontextlost", function(event) {
          event.preventDefault();
          // animationID would have been set by your call to requestAnimationFrame
          console.log("crash!");
      }, false);  


      this.renderer.context.canvas.addEventListener("webglcontextrestored", function(event) {
          console.log("back!");
//          event.preventDefault();
          // animationID would have been set by your call to requestAnimationFrame

      }, false);            
  }

  setScene(scene) {
    if (this.activeScene) {
      this.renderStack.splice(this.renderStack.indexOf(this.activeScene), 1)
    }

    this.activeScene = scene

    if (this.activeScene) {
      this.renderStack.push(scene)
          requestAnimationFrame(ITSME.viewer.animate)
    }

  }

  update(timestamp, delta) {
    if (this.stats)
      this.stats.update()

    this.oControls.update();
    //this.controls.update();

    THREE.AnimationHandler.update(delta);
  }

  render(timestamp) {


    if (!ITSME.viewer.doRender)
      return false;

    let hijackedRender = ITSME.viewer.renderer.render
    ITSME.viewer.renderer.render = ITSME.viewer.originalRender
    //run any custom scene render functions
    for (let i = 0, length = ITSME.viewer.renderStack.length; i < length; i++) {
      ITSME.viewer.renderStack[i].render()
    }
    ITSME.viewer.renderer.render = hijackedRender


	ITSME.viewer.renderer.render( ITSME.viewer.activeScene, ITSME.camera );
    
    
    //this.vrmanager.render(this.activeScene, this.camera, timestamp)

    let oPos = ITSME.viewer.camera.position.clone();

    // Apply the VR HMD camera position and rotation
    // on top of the orbited camera.
     let rotatedPosition = ITSME.viewer.fakeCamera.position.applyQuaternion(
       ITSME.viewer.camera.quaternion);
     ITSME.viewer.camera.position.add(rotatedPosition);
     ITSME.viewer.camera.quaternion.multiply(ITSME.viewer.fakeCamera.quaternion);

    //this.vrmanager.render(this.activeScene, this.camera, timestamp)
    ITSME.viewer.renderer.render( ITSME.viewer.activeScene, ITSME.viewer.camera );
    // Restore the orbit position, so that the OrbitControls can
    // pickup where it left off.
    ITSME.viewer.camera.position.copy(oPos);
  }

  animate(timestamp) {
    let delta = ITSME.viewer.clock.getDelta()

    ITSME.viewer.update(timestamp, delta)
    ITSME.viewer.render(timestamp, delta)

    requestAnimationFrame(ITSME.viewer.animate)
  }

  onResize() {
    if (!this.doRender)
      return false;
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    //this.vreffect.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.render()
  }

  playAudio(file, options, touch) {
    options = options || {}
    if (this.music && this.music.playing) this.music.stop();
    console.log("ios info", touch, this.music);
    if (touch && this.music){
      this.music.play();
      return true;
    }
    if (file)
      return this.music = new IMAudio(file, options, this.camera.listener)

    return false;
  }

  toggleMute() {

    if (!this.music) return
    this.music.pause()

  }
};
