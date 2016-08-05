ITSME.IMScene = class IMScene extends THREE.Scene {
  constructor(name, scene) {
    
    if (!scene){
      super();
    } else {
      THREE.Scene.apply(this);
    }

    //models have a name and a reference to their geometry
    this.name = name | "";
    this.models = [];
    this.lights = new THREE.Object3D;
    this.add(this.lights)
    this.skyBox = null;
    
  }

  addModel(model){
    this.add(model)
    this.models.push({
      name:model.name,
      geometry:model
    });
  }

  addNewModel(objPath, texturePath, animation, material, name){
    let model = new ITSME.IMModel(objPath, texturePath, animation, material, name);
    this.addModel(model);
  }

  /*addScene(objPath, texturePath, animation, material, name){
    let model = new ITSME.IMModel(objPath, texturePath, animation, material, name);
    model.scene = new ITSME.IMScene(model.scene);
    model.scene.models = this.models;
    model.scene.lights = this.lights;
    this = model.scene;
    this.updateMatrix();
    //should this be this.addModel?
    this.models.push({
      name:model.name,
      geometry:model
    });
  }*/

  addAvatar(url, animation, material){
    let avatar = new ITSME.IMModel(objPath, texturePath, animation, material);
    this.addModel(avatar);
  }

  removeModel(name){
    let selectedObject = this.getObjectByName(name);
    this.remove( selectedObject );
  }

  showShadows(show) {
	  this.traverse( function ( child ) {
  		if (child instanceof THREE.Mesh) {
  			child.castShadow = show;
  			child.receiveShadow = show;
  			// child.material.needsUpdate = true;
  	  }
	  });
  }

  //create a new light and add it to the scene
  makeLight(type, color, intensity, name){
    switch (type){
      case "ambient":
        this.lights.add(new ITSME.LIGHTING[type](color));
      break;
      case "directional":
        this.lights.add(new ITSME.LIGHTING[type](color, intensity));
      break;
      default:
        return;
      break;
    }
    if (name !== undefined){
      let newest = this.lights.children.length;
      this.lights.children[newest].name = name;
    }

  }

  //add an exsisting light to a scene
  set light(light){
    this.lights.add(light)
  }

  //access light based on name
  getLight(name){
    return this.lights.getObjectByName(name);
  }

  //set up initial control movement
  setMotionRange(minDist, maxDist, maxAng){
    ITSME.viewer.camera.updateProjectionMatrix();

    ITSME.viewer.oControls.minDistance = minDist;
    ITSME.viewer.oControls.maxDistance = maxDist;
    ITSME.viewer.oControls.maxPolarAngle = maxAng;
  }

  positionCamera(x, y, z){
    ITSME.viewer.oControls.object.position.set(z, y, z);
  }

  setCameraFocus(target, xOffset, yOffset, zOffset){
    ITSME.viewer.oControls.target.set(target.position.x+xOffset, target.position.y+yOffset, target.position.z+zOffset);
    ITSME.viewer.oControls.object.position.copy(target.position);//(-1225, -1385, 100);

  }

  positionListener(x, y, z){
    ITSME.viewer.camera.listener.position.set(x, y, z);
  }

  set shadowType(type){
    switch (type) {
      case "soft":
        ITSME.viewer.renderer.shadowMap.type = ITSME.SHADOWS[type]
      break;
      default:
        return false;
      break;
    }

  }


  makeSkybox(path, skySize, position, name){
    let texloader = new THREE.TextureLoader();
    texloader.crossOrigin = 'anonymous'

    let imagePrefix = `${root_url}/assets/textures/${path}/`;
  	//let directions  = ["lf", "rt", "up", "dn", "ft", "bk"];
  	let directions  = ["posx", "negx", "posy", "negy", "posz", "negz"];
  	let imageSuffix = ".jpg";
  	let skyGeometry = new THREE.BoxGeometry( skySize, skySize, skySize );

  	let materialArray = [];
  	let loaded = false;
  	for (let i = 0; i < 6; i++){
  	  let tex = null;
  	  
      materialArray.push(new THREE.MeshBasicMaterial({
        map: texloader.load( imagePrefix + directions[i] + imageSuffix, function(){
            if (!loaded && materialArray.length == 6){
              console.log(loaded);
              loaded = true;

              let skyMaterial = new THREE.MultiMaterial(materialArray);
              ITSME.viewer.activeScene.skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
              ITSME.viewer.activeScene.skyBox.name = name;
              ITSME.viewer.activeScene.skyBox.position.copy(position);
              ITSME.viewer.activeScene.add(ITSME.viewer.activeScene.skyBox);
              
            }          
        }),
        side: THREE.BackSide}
      ));
    }
  }





  render() {}
}
