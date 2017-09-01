var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var multer  = require('multer'); 
var node_xlsx = require('node-xlsx');//解析excel模块 
 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
 
app.get('/file.html', function (req, res) {
   res.sendFile( __dirname + "/" + "file.html" );
});


//对excel文件进行解析，读取数据  
var ExcelParse=function(newPath){
   var obj=node_xlsx.parse(newPath);
   var excelObj=obj[0].data;
   var num=0;
   var stuArray=new Array(
	   	"className",
	   	"st1",
	   	"st2",
	    "st3",
	    "st4",
	    "st5",
	    "st6",
	    "st7",
	    "st8",
	    "st9",
	    "st10",
	    "st11",
	    "st12",
	    "st13",
	    "st14",
	    "base",
	    "studying",
	    "actualEnrollment",
	    "actualEnrollmentRate",
	    "expectEnrollment",
	    "expectEnrollmentRate",
	    "execptEnrollmentStutents",
	    "classType",
	    "teacher",
	    "supervisor",
	    "classRoom",
	    "classTime",
	    "totalHour",
	    "remianHour",
	    "progress",
	    "startTime",
	    "planEndTime",
	    "actualEndTime",
	    "exhibitionClass1",
	    "exhibitionClass2"
   	);
   var list=[];
   for(var i=1;i<excelObj.length;i++){
   	 var rdata=excelObj[i];
   	 var stu={};
   	 for(var j=0;j<rdata.length-1;j++){
   	 	if(stuArray[j]){
          stu[stuArray[j]]=rdata[j] ? rdata[j] : "";
   	 	}else{
   	 		continue;
   	 	}
   	 }
   	 list.push(stu);
   }
   fs.writeFileSync(__dirname+'/public/json/list.json', JSON.stringify(list,null,4));
   console.log("成功解析execl");
};

app.get('/file_parse', function (req, res) {
   ExcelParse(__dirname+'/public/execl/student.xlsx');
   fs.readFile(__dirname+'/public/json/list.json', 'utf8', function (err, data) {
       res.end( data );
   });
});

app.post('/file_upload', function (req, res) {
   console.log(req);  // 上传的文件信息
   console.log(req.files[0]);  // 上传的文件信息
   var des_file = __dirname +"/public/execl/"+req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
});

var server = app.listen(3000);