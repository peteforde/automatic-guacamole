'use strict';

var _get = function get(_x9, _x10, _x11) { var _again = true; _function: while (_again) { var object = _x9, property = _x10, receiver = _x11; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x9 = parent; _x10 = property; _x11 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ITSME = Object.defineProperties({

  ANIM_CACHE: {},

  config: {
    animations: {},
    avatars: {}
  },

  /**
  json path
  texture path
  material path
  */

  _params: {
    'debug': debug | true,
    'scene': "empty",
    'static': false
  },

  viewer: null,
  sceneTypes: []

}, {
  MODEL_SCALE: {
    get: function get() {
      return 100;
    },
    configurable: true,
    enumerable: true
  },
  MATERIAL_TYPES: {
    get: function get() {
      return {
        'default': THREE.MeshLambertMaterial,
        unlit: THREE.MeshBasicMaterial,
        phong: THREE.MeshPhongMaterial
      };
    },
    configurable: true,
    enumerable: true
  },
  MESH_TYPES: {
    get: function get() {
      return {
        obj: 0,
        objmtl: 1,
        json: 2
      };
    },
    configurable: true,
    enumerable: true
  },
  LIGHTING: { //fbx:3

    get: function get() {
      return {
        "ambient": THREE.AmbientLight,
        "directional": THREE.DirectionalLight
      };
    },
    configurable: true,
    enumerable: true
  },
  SHADOWS: {
    get: function get() {
      return {
        "soft": THREE.PCFSoftShadowMap
      };
    },
    configurable: true,
    enumerable: true
  },
  params: {
    set: function set(query) {
      for (var i = 0, count = query.length; i < count; i++) {
        var parts = query[i].split('=');
        ITSME._params[parts[0]] = parts[1];
      }
    },
    get: function get() {
      return ITSME._params;
    },
    configurable: true,
    enumerable: true
  },
  camera: {
    get: function get() {
      if (!this.viewer) return null;
      return this.viewer.camera;
    },
    configurable: true,
    enumerable: true
  }
});

ITSME.mobileCheck = (function (a) {
  return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
  );
})(navigator.userAgent || navigator.vendor || window.opera);

ITSME.not_IE = function () {
  var check = true;
  (function (a) {
    if (window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) check = false;
  })();
  return check;
};

ITSME.makeViewer = function (debug) {
  this.viewer = new ITSME.IMViewer(debug);
};

ITSME.registerSceneType = function (name, obj) {
  /*let regCount = 0;
  let genName = name;
  while(ITSME.sceneTypes[genName]){
    genName = `${name}-${regCount}`;
  }
   ITSME.sceneTypes[genName] = obj;*/
  ITSME.sceneTypes[name] = obj;
};

ITSME.loadManager = new THREE.LoadingManager();

ITSME.loadManager.onProgress = function (item, loaded, total) {

  console.log(item, loaded, total);
};

/**
* take a screenshot
* @param {bool} [msg=null] display save message
*/
ITSME.screenshot = function () {
  var msg = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  window.open(ITSME.viewer.renderer.domElement.toDataURL("image/png"), "ITSME Screenshot");
  if (msg) alert("Right click image in the new tabe to save your screenshot");
  return false;
};
/*
ITSME.messages = {
  animation: function (name,animation){
    let avatar = ITSME.viewer.activeScene.getObjectByName(name);
    if (!avatar){
      alert("Avatar does not exsist!");
      return false;
    }
    ITSME.viewer.activeScene.getObjectByName(name).addAnimation(animation);
    ITSME.viewer.activeScene.getObjectByName(name).playAnimation(animation);
  },
  sound: function (sound, song_ends = true) {
        if (!ITSME.not_IE())
          return false;

        ITSME.viewer.playAudio(sound + '.mp3', {
          start: 0,
          volume: 100,
          useAudioElement: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
      });
    },
    scene: function (scene, skybox) {
        skybox = skybox || null;
        ITSME.viewer.setScene(new ITSME.sceneTypes[scene](skybox));
    }
}


ITSME.receiveMessage = function(event) {
  var origin = event.origin || event.originalEvent.origin;
  // For Chrome, the origin property is in the event.originalEvent object.
  // if (origin.indexOf("http://localhost") !== 0 && origin.indexOf('www.itsme3d.com') !== -1)
  //   return;
  if (!event.data || (typeof event.data) !== "string") return;
  var data = event.data.split(",");
  if(!ITSME.messages[data[0]])
    return false;

  switch (data[0]) {
    case "sound":
      ITSME.messages[data[0]](data[1], false)
    break;
    case "animation":
      ITSME.messages[data[0]](data[1],data[2]);
    break;
    case "scene":
      if (data[1].indexOf("skybox_") == 0) {
        var scene = data[1].split("skybox_")
        ITSME.messages[data[0]]("skybox", scene[1])
        ITSME.viewer.activeScene.makeSkybox(scene[1], 3000, new THREE.Vector3(0,0,0), scene[1]);
      } else {
        ITSME.messages[data[0]](data[1])
      }
    break;
  }
}
*/
/** this is for running ItsMe avatar animations */

ITSME.IMAnimation = (function () {

  /**
  * Create an animation
  * @param {object/string} animation - If the only param, then an object all params, otherwise just the name
  * @param {THREE.Object3D} [model] - the object to attach
  */

  function IMAnimation(animation, model) {
    var _this = this;

    _classCallCheck(this, IMAnimation);

    if (arguments.length > 1) {
      this.name = animation;
      this.model = model;
    } else {
      this.name = animation.name;
      this.model = animation.model;
    }

    var json = ITSME.ANIM_CACHE[name];
    if (json) {
      this.onLoad(json, model);
    } else {
      var loader = new THREE.XHRLoader(ITSME.loadManager);
      loader.crossOrigin = 'anonymous';

      var aniPath = undefined;
      if (ITSME.config.animations[animation]) aniPath = ITSME.config.animations[animation].url;else aniPath = remote_url + 'animations/' + name + '.json';
      loader.load(aniPath, function (json) {
        json = JSON.parse(json);
        ITSME.ANIM_CACHE[name] = json;
        _this.onLoad(json, model);
      });
    }
  }

  _createClass(IMAnimation, [{
    key: 'onLoad',
    value: function onLoad(json, model) {
      this.anim = new THREE.Animation(model.mesh, json);

      if (this.playing) this.play();
    }
  }, {
    key: 'play',
    value: function play() {
      this.playing = true;

      if (this.anim) {
        if (this.model.mesh.skeleton.bones.length !== this.anim.hierarchy.length) return console.error("Bones in animation do not match model.");

        this.anim.play();
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.anim) this.anim.stop();
    }
  }]);

  return IMAnimation;
})();

ITSME.IMAudio = (function () {
  function IMAudio(file) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var listener = arguments.length <= 2 || arguments[2] === undefined ? ITSME.camera.listener : arguments[2];

    _classCallCheck(this, IMAudio);

    if (options.volume) options.volume = Math.min(1.0, options.volume);

    if (options.useAudioElement) {
      this.audioEngine = "HTML5";
    } else {
      this.audioEngine = "THREE";
    }

    this.loadAudio(file, options, listener);

    this.volume = options.volume || 0.25;
    this.isPaused = false;
  }

  _createClass(IMAudio, [{
    key: 'loadAudio',
    value: function loadAudio(file, options, listener) {

      switch (this.audioEngine) {
        case "HTML5":
          this.audioElementSrc = root_url + 'assets/sound/' + file;
          this.audioElementCb = options.ended;

          if (this.audio) this.audio.src = this.audioElementSrc;else this.audio = new Audio(this.audioElementSrc);

          if (Cookies.get('mute')) this.audio.autoplay = false;else this.audio.autoplay = options.autoplay && true;

          if (this.audio.autoplay) this.play();

          if (this.audioElementCb) {
            this.audio.onended = this.audioElementCb.bind(this.audio);
          }

          this.audioElementSrc = null;
          break;
        default:
          this.audio = new THREE.Audio(listener);

          var audioLoader = new THREE.AudioLoader(ITSME.loadManager);

          audioLoader.load(root_url + '/assets/sound/' + file, (function (audioBuffer) {
            this.audio.setBuffer(audioBuffer);

            if (Cookies.get('mute')) this.audio.autoplay = false;else this.audio.autoplay = options.autoplay && true;

            if (this.audio.autoplay) this.play();

            this.audio.startTime = options.start || 0;
          }).bind(this));

          //if callback function is defined, then
          //copy default callback, call custom callback,
          //THEN run default callback
          if (options.ended) {
            var origOnEnded = audio.source.onended;
            audio.source.onended = function () {
              options.ended.call(audio);
              origOnEnded();
            };
          }
          break;
      }
    }
  }, {
    key: 'changeAudio',
    value: function changeAudio(file) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? { autoplay: false } : arguments[1];
      var listener = arguments.length <= 2 || arguments[2] === undefined ? ITSME.camera.listener : arguments[2];

      switch (this.audioEngine) {
        case "HTML5":
          options.ended = this.audioElementCb;
          this.loadAudio(file, options);
          break;
        default:
          this.loadAudio(file, options, listener);
          break;
      }
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.playing) switch (this.audioEngine) {
        case "HTML5":
          this.audio.play();
          break;
        default:
          this.audio.play();
          break;
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (!this.isPaused) {
        Cookies.set("mute", 1, { expires: 10000 });
        this._pause();
      } else {
        this.play();
        Cookies.remove("mute");
      }
    }
  }, {
    key: '_pause',
    value: function _pause() {
      switch (this.audioEngine) {
        case "HTML5":
          this.audio.pause();
          break;
        default:
          this.audio.pause();
          break;
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      switch (this.audioEngine) {
        case "HTML5":
          this.audio.pause();
          this.audio.currentTime = 0;
          break;
        default:
          this.audio.stop();
          break;
      }
    }
  }, {
    key: 'playing',
    get: function get() {
      switch (this.audioEngine) {
        case "HTML5":
          return !this.audio.paused;
          break;
        default:
          return this.audio.isPlaying;
          break;
      }
    }
  }, {
    key: 'volume',
    set: function set(vol) {
      switch (this.audioEngine) {
        case "HTML5":
          this.audio.volume = vol;
          break;
        default:
          this.audio.setVolume(vol);
          break;
      }
    }
  }]);

  return IMAudio;
})();

/** model loader */
//make loader type more generic

ITSME.IMModel = (function (_THREE$Object3D) {
  _inherits(IMModel, _THREE$Object3D);

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

  function IMModel(url, modelObj, type, texture, animation, material, name, scale) {
    var _this2 = this;

    _classCallCheck(this, IMModel);

    if (arguments.length > 1 && ITSME.MESH_TYPES[type] == undefined && ITSME.MESH_TYPES[url.type] == undefined) {
      alert("Non-supported mesh type");
      return false;
    }
    _get(Object.getPrototypeOf(IMModel.prototype), 'constructor', this).call(this);

    this.queuedFunctions = [];
    this.loaded = false;

    if (arguments.length > 1) {
      this.assets_path = url;
      this.format = ITSME.MESH_TYPES[type];
    } else {
      this.format = ITSME.MESH_TYPES[url.type];
    }

    switch (this.format) {
      case ITSME.MESH_TYPES.objmtl:
        var mtlLoader = new THREE.MTLLoader(ITSME.loadManager);
        //mtlLoader.setPath( 'assets/textures/' );
        mtlLoader.setTexturePath(this.assets_path + '/assets/textures/');

        mtlLoader.load('' + this.assets_path + modelObj + '.mtl', function (materials) {
          materials.preload();
          _this2.load(modelObj, materials);
          //.then(this.onLoadCompleted.bind(this), this.onLoadFailed);      
        });
        break;
      case ITSME.MESH_TYPES.obj:
      case ITSME.MESH_TYPES.json:

        if (modelObj && texture || arguments.length == 1) {

          if (arguments.length > 1) {
            this.load(modelObj, texture).then(this.onLoadCompleted.bind(this), this.onLoadFailed);
          } else {
            this.loadFixed(url.url, url.texture).then(this.onLoadCompleted.bind(this), this.onLoadFailed);
          }

          if (material) this.materialType = material;else this.materialType = 'unlit';

          if (ITSME.viewer.gui) {
            ITSME.viewer.gui.add(this, 'materialType', Object.keys(ITSME.MATERIAL_TYPES)).onFinishChange(function (value) {
              _this2.materialType = value;
            });
          }
        }

        break;

    }

    this.name = name || url.name;
    this.anim = {};

    if (animation) {
      this.currentAnimation = animation || url.animation;
    } else this.currentAnimation = null;

    if (!scale) scale = url.scale;

    this.scale.set(scale || ITSME.MODEL_SCALE, scale || ITSME.MODEL_SCALE, scale || ITSME.MODEL_SCALE);

    this.IMBones = {};
  }

  _createClass(IMModel, [{
    key: 'load',
    value: function load(obj, texture, type) {

      var loader = undefined;
      var objPath = '' + this.assets_path + obj;
      if (this.format == ITSME.MESH_TYPES.objmtl) {
        this.loadObjMtl(obj, texture);
        return;
      } else if (this.format == ITSME.MESH_TYPES.obj) {
        loader = new THREE.OBJLoader(ITSME.loadManager);
        objPath += ".obj";
      } else if (this.format == ITSME.MESH_TYPES.json) {
        objPath += ".json";
        loader = new THREE.JSONLoader(ITSME.loadManager);
      }

      var texPath = '' + this.assets_path + texture;

      var texloader = new THREE.TextureLoader(ITSME.loadManager);
      texloader.crossOrigin = 'anonymous';

      var promiseFunc = function promiseFunc(resolve, reject) {
        var _this3 = this;

        this.texture = texloader.load(texPath, function () {
          loader.load(objPath, resolve, _this3.onLoadProgress, reject);
        });
      };

      return new Promise(promiseFunc.bind(this));
    }
  }, {
    key: 'loadFixed',
    value: function loadFixed(obj, texture, type) {

      var loader = undefined;
      var objPath = '' + this.assets_path + obj;
      if (this.format == ITSME.MESH_TYPES.objmtl) {
        this.loadObjMtl(obj, texture);
        return;
      } else if (this.format == ITSME.MESH_TYPES.obj) {
        loader = new THREE.OBJLoader(ITSME.loadManager);
        objPath += ".obj";
      } else if (this.format == ITSME.MESH_TYPES.json) {
        objPath += ".json";
        loader = new THREE.JSONLoader(ITSME.loadManager);
      }

      var texloader = new THREE.TextureLoader(ITSME.loadManager);
      texloader.crossOrigin = 'anonymous';

      var promiseFunc = function promiseFunc(resolve, reject) {
        var _this4 = this;

        this.texture = texloader.load(texture, function () {
          loader.load(obj, resolve, _this4.onLoadProgress, reject);
        });
      };

      return new Promise(promiseFunc.bind(this));
    }
  }, {
    key: 'loadObjMtl',
    value: function loadObjMtl(obj, materials) {
      var objPath = '' + this.assets_path + obj + '.obj';

      var loader = new THREE.OBJLoader(ITSME.loadManager);
      loader.setMaterials(materials);

      loader.load(objPath, this.onLoadCompleted.bind(this), this.onLoadProgress, this.onLoadFailed);
    }
  }, {
    key: 'initializeObject',
    value: function initializeObject() {
      switch (this.format) {
        case ITSME.MESH_TYPES.objmtl:
          this.mesh = this.obj.children[0];
          break;
        case ITSME.MESH_TYPES.json:
          this.mesh = new THREE.SkinnedMesh(this.obj, this.material);
          if (this.currentAnimation) this.addAnimation(this.currentAnimation);
          break;
      }

      this.mesh.castShadow = true;
      this.mesh.frustumCulled = false;

      this.add(this.mesh);
    }
  }, {
    key: 'addAnimation',
    value: function addAnimation(animation) {
      var play = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (!this.loaded) {
        this.queuedFunctions.push(this.addAnimation.bind(this, animation, play));
        return;
      }
      if (!this.anim[animation]) this.anim[animation] = new ITSME.IMAnimation(animation, this);
      if (play) this.playAnimation(animation);
    }

    /**
    * attach an object to a bone
    * @param {string} bone name of the bone
    * @param {THREE.Object3D} the object to attach
    * @param {THREE.Vector3} [position=null] the new position of the attached object, relative to it's bone
    * @param {number} [scale=null] the new scale of the attached object
    */
  }, {
    key: 'attach',
    value: function attach(bone, obj, position) {
      var scale = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

      try {
        this.IMBones[bone].add(obj);
        if (position) obj.position.copy(position);
        if (scale) obj.scale.set(scale, scale, scale);
      } catch (e) {
        console.log("Invalid bone: " + e.message);
      }
    }
  }, {
    key: 'playCurrentAnimation',
    value: function playCurrentAnimation() {
      if (this.currentAnimation) {
        if (!this.anim[this.currentAnimation.name]) {
          this.addAnimation(this.currentAnimation);
        }
        this.anim[this.currentAnimation.name].play();
      } else if (Object.keys(this.anim).length) {
        this.currentAnimation = Object.keys(this.anim)[0];
        this.playCurrentAnimation();
      } else console.log("no animation to play");
    }
  }, {
    key: 'playAnimation',
    value: function playAnimation(animation) {
      if (this.currentAnimation) this.currentAnimation.stop();
      this.currentAnimation = this.anim[animation];
      this.playCurrentAnimation();
    }
  }, {
    key: 'onLoadCompleted',
    value: function onLoadCompleted(obj) {
      this.obj = obj;
      console.log(this);

      var me = this;
      //this.add(obj)
      this.initializeObject();
      this.traverse(function (child) {

        if (child instanceof THREE.Bone) me.IMBones[child.name] = child;
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
      });

      this.dispatchEvent({ type: 'load' });
      ITSME.viewer.activeScene.add(this);
      this.loaded = true;
      while (this.queuedFunctions.length) {
        this.queuedFunctions.shift()();
      }
    }
  }, {
    key: 'onLoadProgress',
    value: function onLoadProgress(xhr) {
      if (!xhr.lengthComputable) return;

      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  }, {
    key: 'onLoadFailed',
    value: function onLoadFailed(xhr) {
      alert("ERROR: Could not load model.  Check console for details");
      console.error(xhr);
    }
  }, {
    key: 'materialType',
    get: function get() {
      return this._materialType;
    },
    set: function set(type) {
      if (type === this._materialType) return;
      this._materialType = type;

      var material = new ITSME.MATERIAL_TYPES[type]();
      material.skinning = true;
      material.map = this.texture;
      material.side = THREE.DoubleSide;
      material.shininess = 1;

      this.material = material;

      if (this.mesh) {
        this.mesh.material = material;
      }
    }
  }]);

  return IMModel;
})(THREE.Object3D);

ITSME.IMScene = (function (_THREE$Scene) {
  _inherits(IMScene, _THREE$Scene);

  function IMScene(name, scene) {
    _classCallCheck(this, IMScene);

    if (!scene) {
      _get(Object.getPrototypeOf(IMScene.prototype), 'constructor', this).call(this);
    } else {
      THREE.Scene.apply(this);
    }

    //models have a name and a reference to their geometry
    this.name = name | "";
    this.models = [];
    this.lights = new THREE.Object3D();
    this.add(this.lights);
    this.skyBox = null;
  }

  _createClass(IMScene, [{
    key: 'addModel',
    value: function addModel(model) {
      this.add(model);
      this.models.push({
        name: model.name,
        geometry: model
      });
    }
  }, {
    key: 'addNewModel',
    value: function addNewModel(objPath, texturePath, animation, material, name) {
      var model = new ITSME.IMModel(objPath, texturePath, animation, material, name);
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

  }, {
    key: 'addAvatar',
    value: function addAvatar(url, animation, material) {
      var avatar = new ITSME.IMModel(objPath, texturePath, animation, material);
      this.addModel(avatar);
    }
  }, {
    key: 'removeModel',
    value: function removeModel(name) {
      var selectedObject = this.getObjectByName(name);
      this.remove(selectedObject);
    }
  }, {
    key: 'showShadows',
    value: function showShadows(show) {
      this.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = show;
          child.receiveShadow = show;
          // child.material.needsUpdate = true;
        }
      });
    }

    //create a new light and add it to the scene
  }, {
    key: 'makeLight',
    value: function makeLight(type, color, intensity, name) {
      switch (type) {
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
      if (name !== undefined) {
        var newest = this.lights.children.length;
        this.lights.children[newest].name = name;
      }
    }

    //add an exsisting light to a scene
  }, {
    key: 'getLight',

    //access light based on name
    value: function getLight(name) {
      return this.lights.getObjectByName(name);
    }

    //set up initial control movement
  }, {
    key: 'setMotionRange',
    value: function setMotionRange(minDist, maxDist, maxAng) {
      ITSME.viewer.camera.updateProjectionMatrix();

      ITSME.viewer.oControls.minDistance = minDist;
      ITSME.viewer.oControls.maxDistance = maxDist;
      ITSME.viewer.oControls.maxPolarAngle = maxAng;
    }
  }, {
    key: 'positionCamera',
    value: function positionCamera(x, y, z) {
      ITSME.viewer.oControls.object.position.set(z, y, z);
    }
  }, {
    key: 'setCameraFocus',
    value: function setCameraFocus(target, xOffset, yOffset, zOffset) {
      ITSME.viewer.oControls.target.set(target.position.x + xOffset, target.position.y + yOffset, target.position.z + zOffset);
      ITSME.viewer.oControls.object.position.copy(target.position); //(-1225, -1385, 100);
    }
  }, {
    key: 'positionListener',
    value: function positionListener(x, y, z) {
      ITSME.viewer.camera.listener.position.set(x, y, z);
    }
  }, {
    key: 'makeSkybox',
    value: function makeSkybox(path, skySize, position, name) {
      var texloader = new THREE.TextureLoader();
      texloader.crossOrigin = 'anonymous';

      var imagePrefix = root_url + '/assets/textures/' + path + '/';
      //let directions  = ["lf", "rt", "up", "dn", "ft", "bk"];
      var directions = ["posx", "negx", "posy", "negy", "posz", "negz"];
      var imageSuffix = ".jpg";
      var skyGeometry = new THREE.BoxGeometry(skySize, skySize, skySize);

      var materialArray = [];
      var loaded = false;
      for (var i = 0; i < 6; i++) {
        var tex = null;

        materialArray.push(new THREE.MeshBasicMaterial({
          map: texloader.load(imagePrefix + directions[i] + imageSuffix, function () {
            if (!loaded && materialArray.length == 6) {
              console.log(loaded);
              loaded = true;

              var skyMaterial = new THREE.MultiMaterial(materialArray);
              ITSME.viewer.activeScene.skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
              ITSME.viewer.activeScene.skyBox.name = name;
              ITSME.viewer.activeScene.skyBox.position.copy(position);
              ITSME.viewer.activeScene.add(ITSME.viewer.activeScene.skyBox);
            }
          }),
          side: THREE.BackSide }));
      }
    }
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'light',
    set: function set(light) {
      this.lights.add(light);
    }
  }, {
    key: 'shadowType',
    set: function set(type) {
      switch (type) {
        case "soft":
          ITSME.viewer.renderer.shadowMap.type = ITSME.SHADOWS[type];
          break;
        default:
          return false;
          break;
      }
    }
  }]);

  return IMScene;
})(THREE.Scene);

var OBJ_REGEX = /\.obj/;
var MTL_REGEX = /\.mtl/;
var TEXTURE_REGEX = /\.(jpg|jpeg|png|gif)/;

ITSME.IMViewer = (function () {
  function IMViewer() {
    var debug = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    _classCallCheck(this, IMViewer);

    if (!Detector.webgl) return Detector.addGetWebGLMessage();

    this.activeScene = null;
    this.renderStack = [];
    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000);
    this.originalRender = this.renderer.render;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.clock = new THREE.Clock();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200000);
    this.camera.position.z = 1;
    this.doRender = false;

    try {
      this.camera.listener = new THREE.AudioListener();
      this.camera.add(this.camera.listener);
    } catch (e) {
      // IE sucks
    }

    var container = document.querySelector('#renderer');
    container.appendChild(this.renderer.domElement);

    if (debug) {
      //this.stats = new Stats()
      //container.appendChild(this.stats.domElement)
    }

    this.oControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
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

    this.iosPlay = function (e) {
      if (this.music.playing) return false;
      this.playAudio(null, null, true);
      document.removeEventListener("touchstart", this.iosPlay, false);
    };

    document.addEventListener("touchstart", this.iosPlay.bind(this), false);

    window.addEventListener('resize', this.onResize.bind(this), false);

    //       let orig = this.vrmanager.onVRClick_
    //       this.vrmanager.onVRClick_ = () => {
    //         this.renderer.shadowMap.enabled = false
    //         orig.call(this.vrmanager)
    //       }

    this.renderer.context.canvas.addEventListener("webglcontextlost", function (event) {
      event.preventDefault();
      // animationID would have been set by your call to requestAnimationFrame
      console.log("crash!");
    }, false);

    this.renderer.context.canvas.addEventListener("webglcontextrestored", function (event) {
      console.log("back!");
      //          event.preventDefault();
      // animationID would have been set by your call to requestAnimationFrame
    }, false);
  }

  _createClass(IMViewer, [{
    key: 'setScene',
    value: function setScene(scene) {
      if (this.activeScene) {
        this.renderStack.splice(this.renderStack.indexOf(this.activeScene), 1);
      }

      this.activeScene = scene;

      if (this.activeScene) {
        this.renderStack.push(scene);
        requestAnimationFrame(ITSME.viewer.animate);
      }
    }
  }, {
    key: 'update',
    value: function update(timestamp, delta) {
      if (this.stats) this.stats.update();

      this.oControls.update();
      //this.controls.update();

      THREE.AnimationHandler.update(delta);
    }
  }, {
    key: 'render',
    value: function render(timestamp) {

      if (!ITSME.viewer.doRender) return false;

      var hijackedRender = ITSME.viewer.renderer.render;
      ITSME.viewer.renderer.render = ITSME.viewer.originalRender;
      //run any custom scene render functions
      for (var i = 0, _length = ITSME.viewer.renderStack.length; i < _length; i++) {
        ITSME.viewer.renderStack[i].render();
      }
      ITSME.viewer.renderer.render = hijackedRender;

      ITSME.viewer.renderer.render(ITSME.viewer.activeScene, ITSME.camera);

      //this.vrmanager.render(this.activeScene, this.camera, timestamp)

      var oPos = ITSME.viewer.camera.position.clone();

      // Apply the VR HMD camera position and rotation
      // on top of the orbited camera.
      var rotatedPosition = ITSME.viewer.fakeCamera.position.applyQuaternion(ITSME.viewer.camera.quaternion);
      ITSME.viewer.camera.position.add(rotatedPosition);
      ITSME.viewer.camera.quaternion.multiply(ITSME.viewer.fakeCamera.quaternion);

      //this.vrmanager.render(this.activeScene, this.camera, timestamp)
      ITSME.viewer.renderer.render(ITSME.viewer.activeScene, ITSME.viewer.camera);
      // Restore the orbit position, so that the OrbitControls can
      // pickup where it left off.
      ITSME.viewer.camera.position.copy(oPos);
    }
  }, {
    key: 'animate',
    value: function animate(timestamp) {
      var delta = ITSME.viewer.clock.getDelta();

      ITSME.viewer.update(timestamp, delta);
      ITSME.viewer.render(timestamp, delta);

      requestAnimationFrame(ITSME.viewer.animate);
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      if (!this.doRender) return false;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      //this.vreffect.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.render();
    }
  }, {
    key: 'playAudio',
    value: function playAudio(file, options, touch) {
      options = options || {};
      if (this.music && this.music.playing) this.music.stop();
      console.log("ios info", touch, this.music);
      if (touch && this.music) {
        this.music.play();
        return true;
      }
      if (file) return this.music = new IMAudio(file, options, this.camera.listener);

      return false;
    }
  }, {
    key: 'toggleMute',
    value: function toggleMute() {

      if (!this.music) return;
      this.music.pause();
    }
  }]);

  return IMViewer;
})();

/*

myScene = new Scene
myScene.addAvatar
myScene.addNewModel


make Scene
add models to Scene
load scene
*/

/** This is specifically used to load ItsMe models */

ITSME.IMAvatar = (function (_ITSME$IMModel) {
  _inherits(IMAvatar, _ITSME$IMModel);

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

  function IMAvatar(model, avatarObj, texture, animation, material, name, scale) {
    _classCallCheck(this, IMAvatar);

    if (!ITSME.params.email || !ITSME.params.key) {
      alert("Error: No model key provided.");
      return;
    }

    if (arguments.length > 1) _get(Object.getPrototypeOf(IMAvatar.prototype), 'constructor', this).call(this, model, avatarObj, 'json', 'avatar.jpg', animation, material, name, scale);else {
      _get(Object.getPrototypeOf(IMAvatar.prototype), 'constructor', this).call(this, ITSME.config.avatars[model]);
    }
  }

  _createClass(IMAvatar, [{
    key: 'onLoadCompleted',
    value: function onLoadCompleted(obj) {
      _get(Object.getPrototypeOf(IMAvatar.prototype), 'onLoadCompleted', this).call(this, obj);
      if (this.currentAnimation) this.playCurrentAnimation();

      //else
      //  this.playAnimation("breakdancing")
    }

    /*load(objPath, texPath) {
      THREE.ImageUtils.crossOrigin = 'anonymous'
      this.texture = THREE.ImageUtils.loadTexture(texPath)
       var loader = new THREE.JSONLoader
      loader.load(objPath, this.onLoadCompleted.bind(this), this.onLoadProgress, this.onLoadFailed)
    }*/

  }]);

  return IMAvatar;
})(ITSME.IMModel);