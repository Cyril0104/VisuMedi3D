window.onload = function() {
/* ****************************** */
/*          Rendu 1 - X           */
/* ****************************** */
  r1 = new X.renderer2D();
  r1.container = 'r1';
  r1.orientation = 'X';
  r1.init();

/* ****************************** */
/*          Rendu 2 - Y           */
/* ****************************** */
  var r2 = new X.renderer2D();
  r2.container = 'r2';
  r2.orientation = 'Y';
  r2.init();

/* ****************************** */
/*          Rendu 3 - Z           */
/* ****************************** */
  var r3 = new X.renderer2D();
  r3.container = 'r3';
  r3.orientation = 'Z';
  r3.init();
  
/* ****************************** */
/*            Rendu 4             */
/* ****************************** */  
  var r4 = new X.renderer3D();
  r4.container = 'r4';
  r4.init();
  r4.camera.position = [0,100,0];
 
/* ****************************** */
/*          Volume NRRD           */
/* ****************************** */
  var volume = new X.volume();
  var volume3D = new X.volume();
/* --------- TEST OBJ -------------
  var surface = new X.mesh();
  surface.file = '../temp/alfa147.obj';
  surface.color = [1,0,0];
----------------------------------- */

  volume.file = '../temp/out.nrrd';
  volume3D.file ='../temp/out.nrrd';
  //volume.file = 'http://x.babymri.org/?vol.nrrd'; //test avec fichier nrrd de XTK
  //volume3D.file = 'http://x.babymri.org/?vol.nrrd'; //test avec fichier nrrd de XTK


  r1.add(volume);
  r1.render();
  
  r1.onShowtime = function() {
    r1.render();
    r2.add(volume);
    r2.render();
    r3.add(volume);
    r3.render();

/* ****************************** */
/*              GUI r1            */
/* ****************************** */
    var gui_r1 = new dat.GUI();
    
    var volumegui = gui_r1.addFolder('R1');


    var lowerThresholdController = volumegui.add(volume, 'lowerThreshold', volume.min, volume.max);
    var upperThresholdController = volumegui.add(volume, 'upperThreshold', volume.min, volume.max);
    var lowerWindowController = volumegui.add(volume, 'windowLow', volume.min, volume.max);
    var upperWindowController = volumegui.add(volume, 'windowHigh', volume.min, volume.max);

    var sliceXController = volumegui.add(volume, 'indexX', 0, volume.range[0] - 1);
                // Do some custom styles ...
    gui_r1.domElement.style.position = 'absolute';
    gui_r1.domElement.style.top = '0px';
    //gui_r1.domElement.style.left = '20px';
    gui_r1.domElement.style.height = '450px';
    document.getElementById('r1').appendChild( gui_r1.domElement );


    volumegui.open();



/* ****************************** */
/*              GUI r2            */
/* ****************************** */
    var gui_r2 = new dat.GUI();
    
    var volumegui = gui_r2.addFolder('R2');
    var sliceYController = volumegui.add(volume, 'indexY', 0, volume.range[1] - 1);
        // Do some custom styles ...
    gui_r2.domElement.style.position = 'absolute';
    gui_r2.domElement.style.top = '5.1%';
    gui_r2.domElement.style.left = '58%';
    gui_r2.domElement.style.height = '450px';
    document.getElementById('r2').appendChild( gui_r2.domElement );

    volumegui.open();

/* ****************************** */
/*              GUI r3            */
/* ****************************** */
    var gui_r3 = new dat.GUI();
    
    var volumegui = gui_r3.addFolder('R3');
    var sliceZController = volumegui.add(volume, 'indexZ', 0, volume.range[2] - 1);
            // Do some custom styles ...
    gui_r3.domElement.style.position = 'absolute';
    gui_r3.domElement.style.top = '56%';
    gui_r1.domElement.style.height = '100%';
    //gui_r3.domElement.style.left = '20px';
    document.getElementById('r3').appendChild( gui_r3.domElement );

    volumegui.open();



  };


  r4.add(volume3D);
  r4.render();
  
  r4.onShowtime = function() {
    r4.render();

    // les lignes si dessous font en sorte que le rendu soit volumique 
    volume3D.volumeRendering = true; //activation de la 3D
    volume3D.lowerThreshold = 460;
    volume3D.windowLower = 230;
    volume3D.windowHigh = 770;

    //les couleurs qui influent sur tous les canvas
   //volume.minColor = [0, 0.06666666666666667, 1]; 
    //volume.maxColor = [0.5843137254901961, 1, 0];
    volume3D.opacity = 0.2;
    
/* ****************************** */
/*              GUI               */
/* ****************************** */

    // now the real GUI
    var gui_3D = new dat.GUI();

    var volumegui = gui_3D.addFolder('Volume3D');
    
    var vrController = volumegui.add(volume3D, 'volumeRendering');

    var opacityController = volumegui.add(volume3D, 'opacity', 0, 1).name('Opacité');
  
    var lowerThresholdController = volumegui.add(volume3D, 'lowerThreshold', volume3D.min, volume3D.max);
    var upperThresholdController = volumegui.add(volume3D, 'upperThreshold', volume3D.min, volume3D.max);
    var lowerWindowController = volumegui.add(volume3D, 'windowLow', volume3D.min,  volume3D.max);
    var upperWindowController = volumegui.add(volume3D, 'windowHigh', volume3D.min, volume3D.max);
    
    // Do some custom styles ...
    gui_3D.domElement.style.position = 'absolute';
    gui_3D.domElement.style.top = '0px';
    gui_3D.domElement.style.height = '450px';
    //gui_3D.domElement.style.left = '20px';
    document.getElementById('r4').appendChild( gui_3D.domElement );


    volumegui.open();


  };
  
  

};


