/** this is for running ItsMe avatar animations */


ITSME.IMAnimation = class IMAnimation {

  /**
  * Create an animation
  * @param {object/string} animation - If the only param, then an object all params, otherwise just the name
  * @param {THREE.Object3D} [model] - the object to attach
  */

  constructor(animation, model) {
    if (arguments.length > 1){
      this.name = animation;
      this.model = model;      
    } else {
      this.name = animation.name;
      this.model = animation.model;
    }
    
    let json = ITSME.ANIM_CACHE[name]
    if (json) {
      this.onLoad(json, model)
    } else {
      let loader = new THREE.XHRLoader(ITSME.loadManager)
      loader.crossOrigin = 'anonymous'

      let aniPath;
      if (ITSME.config.animations[animation])
        aniPath = ITSME.config.animations[animation].url;
      else
        aniPath = remote_url + 'animations/' + name + '.json';
      loader.load(aniPath, (json) => {
        json = JSON.parse(json)
        ITSME.ANIM_CACHE[name] = json
        this.onLoad(json, model)
      })
    }
  }

  onLoad(json, model) {
    this.anim = new THREE.Animation(model.mesh, json)

    if (this.playing)
      this.play()
  }

  play() {
    this.playing = true

    if (this.anim) {
      if (this.model.mesh.skeleton.bones.length !== this.anim.hierarchy.length)
        return console.error("Bones in animation do not match model.")

      this.anim.play()
    }
  }

  stop() {
    if (this.anim)
      this.anim.stop()
  }
}
