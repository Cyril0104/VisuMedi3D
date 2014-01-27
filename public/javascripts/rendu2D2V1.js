
/*
window.onload = function() {


  r1 = new X.renderer2D();
  r1.container = 'r1';
  r1.orientation = 'X';
  r1.init();
  // .. for Y
  var r2 = new X.renderer2D();
  r2.container = 'r2';
  r2.orientation = 'Y';
  r2.init();
  // .. and for Z
  var r3 = new X.renderer2D();
  r3.container = 'r3';
  r3.orientation = 'Z';
  r3.init();


  var r4 = new X.renderer3D();

  r4.container = 'r4';
  //r4.orientation = 'X';
  r4.init();
  r4.camera.position = [0,100,0];




  volume = new X.volume();

  volume.file = '../temp/exemple1.nrrd';
  //volume.file = 'http://x.babymri.org/?vol.nrrd'; //test avec fichier nrrd de XTK
  //volume.file = 'test.dcm';


  r1.add(volume);
  r1.render();
  
  r1.onShowtime = function() {

    r1.render();
    r2.add(volume);
    r2.render();
    r3.add(volume);
    r3.render();


    //rendu 3D
    r4.add(volume);
    r4.render();

// les lignes si dessous font en sorte que le rendu soit volumique 
    volume.volumeRendering = true; //activation de la 3D
    volume.lowerThreshold = 80;
    volume.windowLower = 115;
    volume.windowHigh = 360;

    //les couleurs qui influent sur tous les canvas
    volume.minColor = [0, 0.06666666666666667, 1]; 
    volume.maxColor = [0.5843137254901961, 1, 0];

    //opacité
    volume.opacity = 0.2;


  };
  
};
*/

//====================================================================
//
//      ANCIENNE VERSION A CONSERVER AU CAS OU !!!!
//


window.onload = function() {

  r1 = new X.renderer2D();
  r1.container = 'r1';
  r1.orientation = 'X';
  r1.init();
  // .. for Y
  var r2 = new X.renderer2D();
  r2.container = 'r2';
  r2.orientation = 'Y';
  r2.init();
  // .. and for Z
  var r3 = new X.renderer2D();
  r3.container = 'r3';
  r3.orientation = 'Z';
  r3.init();
  
  var r4 = new X.renderer3D();

  r4.container = 'r4';
  //r4.orientation = 'X';
  r4.init();
  r4.camera.position = [0,100,0];

  volume = new X.volume();



  volume.file = '../temp/out.nrrd';
  //volume.file = 'http://x.babymri.org/?vol.nrrd'; //test avec fichier nrrd de XTK

  //volume.file = 'test.dcm';


  r1.add(volume);
  r1.render();
  
  r1.onShowtime = function() {



    r1.render();
 r2.add(volume);
    r2.render();
    r3.add(volume);
    r3.render();

    //rendu 3D
    r4.add(volume);
    r4.render();

    // les lignes si dessous font en sorte que le rendu soit volumique 
  //  volume.volumeRendering = true; //activation de la 3D
  //  volume.lowerThreshold = 80;
  //  volume.windowLower = 115;
  //  volume.windowHigh = 360;

    //les couleurs qui influent sur tous les canvas
   //volume.minColor = [0, 0.06666666666666667, 1]; 
    //volume.maxColor = [0.5843137254901961, 1, 0];

    //opacité
  //  volume.opacity = 0.2;

/* /////////////////////////////////////////////////////// */
/*                                                         */
/*                          GUI                            */
/*                                                         */
/* /////////////////////////////////////////////////////// */

    // now the real GUI
    var gui = new dat.GUI();
    
    // the following configures the gui for interacting with the X.volume
    var volumegui = gui.addFolder('Volume');
    // now we can configure controllers which..
    // .. switch between slicing and volume rendering
    var vrController = volumegui.add(volume, 'volumeRendering');
    // .. configure the volume rendering opacity
    var opacityController = volumegui.add(volume, 'opacity', 0, 1);
    // .. and the threshold in the min..max range
    var lowerThresholdController = volumegui.add(volume, 'lowerThreshold',
        volume.min, volume.max);
    var upperThresholdController = volumegui.add(volume, 'upperThreshold',
        volume.min, volume.max);
    var lowerWindowController = volumegui.add(volume, 'windowLow', volume.min,
        volume.max);
    var upperWindowController = volumegui.add(volume, 'windowHigh', volume.min,
        volume.max);
    // the indexX,Y,Z are the currently displayed slice indices in the range
    // 0..dimensions-1
    var sliceXController = volumegui.add(volume, 'indexX', 0,
        volume.range[0] - 1);
    var sliceYController = volumegui.add(volume, 'indexY', 0,
        volume.range[1] - 1);
    var sliceZController = volumegui.add(volume, 'indexZ', 0,
        volume.range[2] - 1);
    volumegui.open();


  };
  

};


