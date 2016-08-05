/** This is specifically used to load ItsMe models */

ITSME.IMAvatar = class IMAvatar extends ITSME.IMModel {

  /**
  * Create an animation
  * @param {string} model - If the only param, then name of avatar config, otherwise the asset path
  * @param {string} [avatarObj] - name of the mesh
  * @param {string} [texture] - name of default texture
  * @param {string} [animation] - name of default avatar animation
  * @param {string} [material] - material to apply to avatar
  * @param {string} [name] - name of avatar in scene tree
  * @param {number} [scale] - scale size of the avatar
  */

  constructor(model, avatarObj, texture, animation, material, name, scale) {

    if (!ITSME.params.email || !ITSME.params.key) {
      alert("Error: No model key provided.");
      return
    }

    if (arguments.length > 1)
      super(model, avatarObj, 'json', `avatar.jpg`, animation, material, name, scale);
    else {
      super(ITSME.config.avatars[model]);
    }
      
  }

  onLoadCompleted(obj){
    super.onLoadCompleted(obj);
    if (this.currentAnimation)
      this.playCurrentAnimation()


      
    //else
    //  this.playAnimation("breakdancing")
  }


  /*load(objPath, texPath) {
    THREE.ImageUtils.crossOrigin = 'anonymous'
    this.texture = THREE.ImageUtils.loadTexture(texPath)

    var loader = new THREE.JSONLoader
    loader.load(objPath, this.onLoadCompleted.bind(this), this.onLoadProgress, this.onLoadFailed)
  }*/



}
