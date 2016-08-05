/** model loader */
//make loader type more generic

ITSME.IMModel = class IMModel extends THREE.Object3D {

  /**
  * Create a mesh model
  * @param {object/string} url - If the only param, then an object all params, otherwise the asset path
  * @param {string} [modelObj] - name of the mesh
  * @param {string} [type] - type of model(json, obj, objmtl)
  * @param {string} [texture] - name of texture file
  * @param {string} [animation] - name of default avatar animation
  * @param {string} [material] - material to apply to avatar
  * @param {string} [name] - name of avatar in scene tree
  * @param {number} [scale] - scale size of the avatar
  */

  constructor(url, modelObj, type, texture, animation, material, name, scale) {

    if ((arguments.length > 1 && ITSME.MESH_TYPES[type] == undefined) &&
    (ITSME.MESH_TYPES[url.type] == undefined)){
      alert("Non-supported mesh type");
      return false;
    }
    super()

    this.queuedFunctions = [];
    this.loaded = false;


    if (arguments.length > 1){
      this.assets_path = url;
      this.format = ITSME.MESH_TYPES[type];
    } else {
      this.format = ITSME.MESH_TYPES[url.type];
    }


    
      switch(this.format){
        case ITSME.MESH_TYPES.objmtl:
          var mtlLoader = new THREE.MTLLoader(ITSME.loadManager);
          //mtlLoader.setPath( 'assets/textures/' );
          mtlLoader.setTexturePath( `${this.assets_path}/assets/textures/` );

          mtlLoader.load( `${this.assets_path}${modelObj}.mtl`,  materials => {
              materials.preload();
              this.load(modelObj, materials)
              //.then(this.onLoadCompleted.bind(this), this.onLoadFailed);        
          });
        break;
        case ITSME.MESH_TYPES.obj:
        case ITSME.MESH_TYPES.json:

          if ((modelObj && texture) || arguments.length == 1) {
            
            if (arguments.length > 1){
              this.load(modelObj, texture)
              .then(this.onLoadCompleted.bind(this), this.onLoadFailed);  
            } else {
              this.loadFixed(url.url, url.texture)
              .then(this.onLoadCompleted.bind(this), this.onLoadFailed);
            }
            

            if (material)
              this.materialType = material;
            else
              this.materialType = 'unlit'

            if (ITSME.viewer.gui) {
              ITSME.viewer.gui.add(this, 'materialType', Object.keys(ITSME.MATERIAL_TYPES))
                .onFinishChange((value) => {
                  this.materialType = value
                })
            }          
          }

        break;

      }
      
   
    this.name = name || url.name;
    this.anim = {};

    if (animation){
      this.currentAnimation = animation || url.animation;
    } else
      this.currentAnimation = null;

    if (!scale)
      scale = url.scale;
      
    this.scale.set(scale || ITSME.MODEL_SCALE, scale || ITSME.MODEL_SCALE, scale || ITSME.MODEL_SCALE)


    this.IMBones = {}

				    
  }

  load(obj, texture, type) {

    let loader;
    let objPath = `${this.assets_path}${obj}`;
    if (this.format == ITSME.MESH_TYPES.objmtl){
      this.loadObjMtl(obj, texture);
      return;
    }
    else if (this.format == ITSME.MESH_TYPES.obj){
      loader = new THREE.OBJLoader(ITSME.loadManager);
      objPath += ".obj";
    }
    else if (this.format == ITSME.MESH_TYPES.json){
      objPath += ".json";
      loader = new THREE.JSONLoader(ITSME.loadManager)
    }


    let texPath = `${this.assets_path}${texture}`;

    let texloader = new THREE.TextureLoader(ITSME.loadManager);
    texloader.crossOrigin = 'anonymous'


    let promiseFunc = function(resolve, reject) {

      this.texture = texloader.load( texPath, ()=>{
        loader.load(objPath, resolve, this.onLoadProgress, reject)
      })

    }

    return new Promise(promiseFunc.bind(this));

  }


  loadFixed(obj, texture, type) {

    let loader;
    let objPath = `${this.assets_path}${obj}`;
    if (this.format == ITSME.MESH_TYPES.objmtl){
      this.loadObjMtl(obj, texture);
      return;
    }
    else if (this.format == ITSME.MESH_TYPES.obj){
      loader = new THREE.OBJLoader(ITSME.loadManager);
      objPath += ".obj";
    }
    else if (this.format == ITSME.MESH_TYPES.json){
      objPath += ".json";
      loader = new THREE.JSONLoader(ITSME.loadManager)
    }

    let texloader = new THREE.TextureLoader(ITSME.loadManager);
    texloader.crossOrigin = 'anonymous'


    let promiseFunc = function(resolve, reject) {

      this.texture = texloader.load( texture, ()=>{
        loader.load(obj, resolve, this.onLoadProgress, reject)
      })

    }

    return new Promise(promiseFunc.bind(this));

  }



  loadObjMtl(obj, materials) {
    let objPath = `${this.assets_path}${obj}.obj`;

    let loader = new THREE.OBJLoader(ITSME.loadManager);
    loader.setMaterials( materials );

    loader.load(objPath, this.onLoadCompleted.bind(this), this.onLoadProgress, this.onLoadFailed)
    

  }


  get materialType() {
    return this._materialType
  }

  set materialType(type) {
    if (type === this._materialType) return
    this._materialType = type

    let material = new ITSME.MATERIAL_TYPES[type]()
    material.skinning = true
    material.map = this.texture
    material.side = THREE.DoubleSide
    material.shininess = 1

    this.material = material

    if (this.mesh) {
      this.mesh.material = material
    }
  }

  initializeObject() {
    switch (this.format){
      case ITSME.MESH_TYPES.objmtl:
        this.mesh = this.obj.children[0]
      break;
      case ITSME.MESH_TYPES.json:
        this.mesh = new THREE.SkinnedMesh(this.obj, this.material)
        if(this.currentAnimation)
          this.addAnimation(this.currentAnimation);        
      break
    }
         
    this.mesh.castShadow = true
    this.mesh.frustumCulled = false


    this.add(this.mesh)
  }

  addAnimation(animation, play=false){
    if (!this.loaded){
      this.queuedFunctions.push(this.addAnimation.bind(this,animation, play))
      return;
    }
    if (!this.anim[animation])
      this.anim[animation] = new ITSME.IMAnimation(animation, this);
    if(play)
      this.playAnimation(animation);
  }

  /**
  * attach an object to a bone
  * @param {string} bone name of the bone
  * @param {THREE.Object3D} the object to attach
  * @param {THREE.Vector3} [position=null] the new position of the attached object, relative to it's bone
  * @param {number} [scale=null] the new scale of the attached object
  */
  attach(bone, obj, position, scale=null){
    try{
      this.IMBones[bone].add(obj);
      if (position)  
        obj.position.copy(position)
      if(scale)
        obj.scale.set(scale, scale, scale)
    } catch(e){
      console.log("Invalid bone: "+ e.message)
    }
    
  }

  playCurrentAnimation(){
    if (this.currentAnimation){
      if(!this.anim[this.currentAnimation.name]){
        this.addAnimation(this.currentAnimation);
      }
      this.anim[this.currentAnimation.name].play();
    }
    else if( Object.keys(this.anim).length){
      this.currentAnimation = Object.keys(this.anim)[0]
      this.playCurrentAnimation();
    }
    else
      console.log("no animation to play");
  }

  playAnimation(animation){
    if (this.currentAnimation)
      this.currentAnimation.stop();
    this.currentAnimation = this.anim[animation];
    this.playCurrentAnimation();

  }

  onLoadCompleted(obj) {
    this.obj = obj;
    console.log(this)
   
     let me = this;    
    //this.add(obj)
    this.initializeObject()
    this.traverse(child => {
      
      if (child instanceof THREE.Bone)
        me.IMBones[child.name] = child;
    /*["mixamorig:Hips",
      "Spine",
      "Spine1",
      "Spine2",
      "Neck",
      "Head",
      "HeadTop_End",
      "LeftShoulder",
      "LeftArm",
      "LeftForeArm",
      "LeftHand",
      "RightShoulder",
      "RightArm",
      "RightForeArm",
      "RightHand",
      "LeftUpLeg",
      "LeftLeg",
      "LeftFoot",
      "LeftToeBase",
      "LeftToe_End",
      "RightUpLeg",
      "RightLeg",
      "RightFoot",
      "RightToeBase",
      "RightToe_End"]*/

    })
    
    this.dispatchEvent({type: 'load'})
    ITSME.viewer.activeScene.add(this);
    this.loaded = true;
    while (this.queuedFunctions.length){
      (this.queuedFunctions.shift())();
    }

  }

  onLoadProgress(xhr) {
    if (!xhr.lengthComputable) return

    let percentComplete = xhr.loaded / xhr.total * 100
    console.log(`${Math.round(percentComplete, 2)}% downloaded`)
  }

  onLoadFailed(xhr) {
    alert("ERROR: Could not load model.  Check console for details");
    console.error(xhr)
  }
}
