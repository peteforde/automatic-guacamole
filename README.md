# itsmejs
itsme javascript framework

sudo as needed by your system

###initial setup
    npm install
    bower install

###development
- Libraries are downloaded into /bower_components, and required files are copied from there into /lib
- ITSME.js development files are in /src
- compiled source file is built into /lib
- development build compiles /src and /lib into one gzip file in /dist
- can use any server for development, but dist builds require a server which has gzip enabled(or turn off gzip in gulpfile)

when modifying source files

    gulp watch
when making dist build

    gulp default

###sample params
debug=true&email=raitch@gmail.com&key=w8TLzSx5-7E&scene=skybox_rio_beach    
