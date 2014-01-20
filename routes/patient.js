
/*
 * GET patient viewer.
 */


 
exports.viewer = function(req, res){
    
    var libxmljs = require("libxmljs");//npm install libxmljs
    var fs = require("fs");//pour lire un fichier


    var xml = fs.readFileSync("public/temp/tempxml/0.xml", "utf-8");

    var xmlDoc = libxmljs.parseXmlString(xml);

    // xpath queries : first node with tag 'element' and attribute 'name' as 'PatientName'
    var p_name = xmlDoc.get("//element[@name='PatientName']").text();
    var p_name_split = p_name.split("^");
    var p_id = xmlDoc.get("//element[@name='PatientID']").text();
    var p_sex = xmlDoc.get("//element[@name='PatientSex']").text();
    var p_columns = xmlDoc.get("//element[@name='Columns']").text();
    var p_rows = xmlDoc.get("//element[@name='Rows']").text();
    var p_pixelspacing=xmlDoc.get("//element[@name='PixelSpacing']").text();
    var p_slicelocation=xmlDoc.get("//element[@name='SliceLocation']").text();
	
    // Only for debugging

    /*console.log(JSON.stringify({
        patient_firstname: p_name_split[0],
        patient_lastname: p_name_split[1],
        patient_id: p_id,
        patient_sex: p_sex
    }));*/
    
    //Récupération des contours
    var xmlRS = fs.readFileSync("public/temp/RS.xml", "utf-8");

    var xmlDocRS = libxmljs.parseXmlString(xmlRS);
    
    var item3=xmlDocRS.get("//sequence[@name='ROIContourSequence']").childNodes();
    var tabGeneral = [];
    for (var i = 1; i < item3.length; i+=2) {
    	var number = libxmljs.parseXmlString(item3[i]);
    	number = number.get("//element[@name='ReferencedROINumber']");
    	number= number.text();
    	var numbers = item3[i].find(".//sequence[@name='ContourSequence']");
    	numbers = libxmljs.parseXmlString(numbers);
    	numbers = numbers.root().childNodes();
    	var tabContours = [];
    	var l = 1
    	for (var n = 1; n<numbers.length; n+=2) {
    		var contour = libxmljs.parseXmlString(numbers[i]);
    		contour = contour.get("//element[@name='ContourData']").text();
    		var p_contour = contour.split("\\");
    		var tabContour = [];
    		var k = 1;
    		for(var j=0; j<p_contour.length; j+=3){
    			tabContour[k] = p_contour[j]+","+p_contour[j+1]+","+p_contour[j+2];
    			k++;
    		}
    		tabContours[l] = tabContour;
    		l++;
    	}
    	var item5=xmlDocRS.get("//sequence[@name='StructureSetROISequence']").childNodes();
    	var tabNumbers = [];
    	for (var o = 1; o < item5.length; o+=2) {
    		var Infos = libxmljs.parseXmlString(item5[o]);
	    	var Refnumber = Infos.get("//element[@name='ROINumber']");
	    	Refnumber= Refnumber.text();
	    	
	    	var name = Infos.get("//element[@name='ROIName']");
	    	name= name.text();
	    	
	    	tabNumbers[Refnumber] = name;
    	}
    	
    	tabGeneral[number] = tabContours;
    }

    res.render('viewer', { 
        title: 'Viewer', 
        name: p_name, 
        pid:p_id, 
        sex:p_sex, 
        columns:p_columns, 
        rows:p_rows, 
        pixelspacing:p_pixelspacing, 
        slicelocation:p_slicelocation
    });
};


/*
 * POST patient files.
 */


exports.upload = function(req, res){

    var file = req.files.file;
    var sys = require('sys')
    var exec = require('child_process').exec;
    var fs = require("fs");
 
    //console.log('Temp file path: ' +  file.path);
    //console.log('Original file name: ' + file.name);
    
    var str = file.name.split(".");

    if (str[(str.length)-1]=='dcm'){
        function puts(error, stdout, stderr) { sys.puts(stdout)}
        exec("dcm2xml "+ file.path +" public/temp/test.xml", puts);

        // RAW file in "try" folder to using binary data
        exec("dcmdump "+ file.path +" +W public/temp",puts);
        res.redirect('viewer');
        }


    else if (str[(str.length)-1]=='zip'){
        // For no collision erasing previous contents 
        exec("rm public/temp/test.nrrd ", function (error, stdout, stderr) {
            exec("rm -rf public/temp/CT/* ", function (error, stdout, stderr) {
                exec("rm -rf public/temp/tempxml/* ", function (error, stdout, stderr) {
                    exec("rm -rf public/temp/tempraw/* ", function (error, stdout, stderr) {
                        
                        // Unzip it
                        exec("unzip " +file.path+ " -d public/temp", function (error, stdout, stderr) {
                        
                            files = fs.readdirSync("public/temp/CT");
                            //console.log(files);

                            function puts(error, stdout, stderr) { sys.puts(stdout)}
                            
                            // Collect of XML & RAW data from DCM files
                            for (var i=2; i<files.length; ++i){
                                exec("dcm2xml public/temp/CT/"+ files[i] +" public/temp/tempxml/"+(i-2)+".xml",puts); 
                            }


                            // Creating XML with RS //

                            exec("dcm2xml public/temp/test.RS public/temp/RS.xml", function (error, stdout, stderr) {
                                exec("bash public/scripts/dcm2nrrd.sh", function (error, stdout, stderr) {
                                    exec('rm public/temp/' +file.path+'.zip');
                                    res.redirect('viewer');   
                                });
                            });
                        });
                    });
                });
            });
        });
    }

};


/////////////////////////
// SOCKET IO test but we're going to use WS (check e-mail)

exports.send_pixel_data = function(socket){
    var array = new Uint16Array(10);
    for (var i=0; i<array.length; ++i)
        array[i] = i * 10000.0 / 1.23658;

    socket.emit('data', {
        name: 'Charlie',
        pixel_data: array
    });
};

