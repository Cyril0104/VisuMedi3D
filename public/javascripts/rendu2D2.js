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

  // Test of 3D rendering
  // the DICOM files
  //
  // this is a brain MR with dimensions 26x256x148 vx
  // some slices were removed to get the 'look-into-the-brain' effect

  var _dicom = ['image00000', 'image00001', 'image00002',
  'image00003','image00004','image00005',
  'image00006','image00007','image00008',
  'image00009','image00010','image00011',
  'image00012','image00013','image00014',
  'image00015','image00016','image00017',
  'image00018','image00019','image00020'];
  


  // create a new test_renderer
  var r4 = new X.renderer3D();
  r4.container = 'r4';
  r4.bgColor = [0.2, 0.25, 0.4];
  r4.init();
  r4.camera.position = [0, 300, 0];
  
  // we create the X.volume container and attach all DICOM files
  var v = new X.volume();
  // map the data url to each of the slices
  v.file = _dicom.map(function(v) {

    // we also add the 'fake' .DCM extension since else wise
    // XTK would think .org is the extension
    return '../temp/CT/CT.CT1_CT1_'+v+'.dcm';
    
  });
  
  volume = v; 
  volume = new X.volume();
  volume.file = 'http://x.babymri.org/?vol.nrrd';
  //volume.file = 'test.dcm';


  r1.add(volume);
  r1.render();
  
  r1.onShowtime = function() {

    r1.render();
    r2.add(volume);
    r2.render();
    r3.add(volume);
    r3.render();

  };

   // add the volume
  r4.add(v);
  
  // .. and render it
  r4.render();


  r4.onShowtime = function() {

    // activate volume rendering
    v.volumeRendering = true;
    v.lowerThreshold = 80;
    v.windowLower = 115;
    v.windowHigh = 360;
    v.minColor = [0, 0.06666666666666667, 1];
    v.maxColor = [0.5843137254901961, 1, 0];
    v.opacity = 0.2;
    
  };
  
 
};

