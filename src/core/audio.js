ITSME.IMAudio = class IMAudio{

  constructor(file, options={}, listener=ITSME.camera.listener){
    if (options.volume)
      options.volume = Math.min(1.0, options.volume);
      
    if (options.useAudioElement){
      this.audioEngine = "HTML5";
    } else {
      this.audioEngine = "THREE";
    }

    this.loadAudio(file, options, listener);

    this.volume = options.volume || 0.25;
    this.isPaused = false;
  }


  loadAudio(file, options, listener){

    switch (this.audioEngine) {
      case "HTML5":
        this.audioElementSrc = `${root_url}assets/sound/${file}`;
        this.audioElementCb = options.ended;

        if (this.audio)
          this.audio.src = this.audioElementSrc;
        else
          this.audio = new Audio(this.audioElementSrc);

        if (Cookies.get('mute')) this.audio.autoplay = false;
        else this.audio.autoplay = options.autoplay && true;

        if (this.audio.autoplay)
          this.play();
          
        if (this.audioElementCb) {
          this.audio.onended = this.audioElementCb.bind(this.audio)
        }

        this.audioElementSrc = null;
      break;
      default:
        this.audio = new THREE.Audio(listener);

        var audioLoader = new THREE.AudioLoader(ITSME.loadManager);


        audioLoader.load(root_url + '/assets/sound/' + file, function(audioBuffer){
          this.audio.setBuffer(audioBuffer);

          if (Cookies.get('mute')) this.audio.autoplay = false;
          else this.audio.autoplay = options.autoplay && true;

          if (this.audio.autoplay)
            this.play();

          this.audio.startTime = options.start || 0;

        }.bind(this))

        //if callback function is defined, then
        //copy default callback, call custom callback,
        //THEN run default callback
        if (options.ended) {
          var origOnEnded = audio.source.onended
          audio.source.onended = function() {
            options.ended.call(audio)
            origOnEnded()
          }
        }
      break;
    }
   
        
  }


  changeAudio(file, options={autoplay:false}, listener=ITSME.camera.listener){
        
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

  play(){
    if (!this.playing)
    switch (this.audioEngine) {
      case "HTML5":
        this.audio.play();
        break;
      default:
        this.audio.play();
        break;
    }
  }

  get playing(){
    switch (this.audioEngine) {
      case "HTML5":
        return !this.audio.paused
        break;
      default:
        return this.audio.isPlaying
        break;
    }
  }

  set volume(vol){
    switch (this.audioEngine) {
      case "HTML5":
          this.audio.volume = vol;
      break;
      default:
        this.audio.setVolume(vol);
      break;
    }    
  }

  pause(){
    if (!this.isPaused){
      Cookies.set("mute", 1, { expires: 10000 });
      this._pause();
    } else {
      this.play();
      Cookies.remove("mute");
    }
  }

  _pause(){
    switch (this.audioEngine) {
      case "HTML5":
        this.audio.pause();
        break;
      default:
        this.audio.pause();
        break;
    }
  }

  stop(){
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



}
