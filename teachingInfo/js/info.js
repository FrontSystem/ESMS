var listData=[];//表格所有数据
var listDataHistory=[];//历史数据
var historyIndex=-1;
var saveCommand={type:""};//保存命令

function showcontent(language){
	// $('#content').html(language);
}

//实际升学率
function formatActualEnrollmentRate(val,row){
	if (val>=0.6){
		return '<span style="color:red;">'+val+'</span>';
	} else {
		return val;
	}
}
//上传文件
// function importExecl(){
	
// }
//搜索
function doSearch(value, name){
	alert("检索"+name+"条目下的"+value);
}
//添加班级
function addClass(){
   $("#dialog").dialog("open").dialog("setTitle", "添加新的班级");
   $("#dialogForm").form("clear");
   saveCommand={//保存命令
      	type:"add"
   };
   //url="";
}
//编辑班级
function editClass(){
   var row=$("#teachingInformationList").datagrid("getSelected");
   if(row){
   	  // 获取选中行的Index的值  
	  var rowIndex=$("#teachingInformationList").datagrid('getRowIndex', row);
	  // console.log("选中的行数", rowIndex);
   	  $("#dialog").dialog("open").dialog("setTitle", "编辑班级");
      $("#dialogForm").form("clear");
      $("#dialogForm").form("load",row);
      saveCommand={//保存命令
      	  type:"edit"
      };
   }else{
   	  alert("请先选择一个班级！");
   }
}
//删除班级
function deleteClass(){
	var row=$("#teachingInformationList").datagrid("getSelected");
    if(row){
        var arr=[];
		$.extend(true, arr, listData);
		listDataHistory.push(arr);
	    historyIndex=listDataHistory.length-1;
   	  // 获取选中行的Index的值  
	   var rowIndex=$("#teachingInformationList").datagrid('getRowIndex', row);
	   listData.splice(rowIndex, 1);
	   $('#teachingInformationList').datagrid("loadData", listData);//重新加载本地数据
   }else{
   	  alert("请先选择一个班级！");
   }
}
//重做
function redo(){
	// console.log("historyIndex",historyIndex,",listDataHistory.length",listDataHistory.length-1);
	// var listDataHistoryLength=listDataHistory.length-1;
	// if(historyIndex==-1&&listDataHistory.length==0){
 //       alert("没有了");
	// }else if(historyIndex==0){
 //       $('#teachingInformationList').datagrid("loadData", listDataHistory[historyIndex]);//重新加载本地数据
 //       historyIndex++;
	// }else if(historyIndex==listDataHistory.length-1){
 //       $('#teachingInformationList').datagrid("loadData", listDataHistory[historyIndex]);//重新加载本地数据
 //       historyIndex++;
	// }else if(historyIndex<listDataHistory.length-1){
 //       $('#teachingInformationList').datagrid("loadData", listDataHistory[historyIndex]);//重新加载本地数据  
 //       historyIndex++;
	// }else{
	// 	alert("没有了");
	// }
}
//取消
function undo(){
	var listDataHistoryLength=listDataHistory.length-1;
	console.log("historyIndex",historyIndex,",listDataHistoryLength",listDataHistoryLength);
	if(historyIndex==-1&&listDataHistory.length==0){
       alert("没有了");
	}else if(historyIndex>=0){
       $('#teachingInformationList').datagrid("loadData", listDataHistory[historyIndex]);//重新加载本地数据
       historyIndex--;
	}else{
		alert("没有了");
	}
}
function saveClass(){
	var arr=[];
	$.extend(true, arr, listData);
	listDataHistory.push(arr);
    historyIndex=listDataHistory.length-1;
	var array=$("#dialogForm").serializeArray();
	var obj={};
	for(var i=0;i<array.length;i++){
		obj[array[i]["name"]]=array[i]["value"];
    }
   var row=$("#teachingInformationList").datagrid("getSelected");
   if(row&&saveCommand.type=="edit"){
	  var rowIndex=$("#teachingInformationList").datagrid('getRowIndex', row);// 获取选中行的Index的值
	  listData[rowIndex]=obj;
   }if(row&&saveCommand.type=="add"){
	  var rowIndex=$("#teachingInformationList").datagrid('getRowIndex', row);// 获取选中行的Index的值
	  listData.splice(rowIndex+1,0,obj);
   }else{
      listData.splice(listData.length,0,obj);
   }
   $('#teachingInformationList').datagrid("loadData", listData);//重新加载本地数据
   $("#dialog").dialog("close");
}


function myformatter(date){
   var y=date.getFullYear();
   var m=date.getMonth()+1;
   var d=date.getDate();
   return y+'-'+(m<10 ? ('0'+m) : m)+'-'+(d<10 ? ('0'+d) : d);
}
function myparser(s){
	if (!s) return new Date();
	if(s.toString().indexOf("周")>-1){
		return new Date();
	}
	if(!isNaN(s)){//是数字
       return new Date(1900,0,Number(s));
	}
	if(s.toString().indexOf("-")==-1){
		return new Date();
	}
	var ss = (s.split('-'));
	var y = parseInt(ss[0],10);
	var m = parseInt(ss[1],10);
	var d = parseInt(ss[2],10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
		return new Date(y,m-1,d);
	} else {
		return new Date();
	}
}


$(function(){
	$('#teachingInformationList').datagrid({
	  url:'json/listOne.json',
	  method:'GET',
	  toolbar:"#myToolbar",
	  striped:true,
	  singleSelect:true,
	  //加载成功之后，选定并获取首行数据       
      onLoadSuccess:function(data){
            listData=data.rows;//表格所有数据
            // var rows=$('test').datagrid("getRows");
            // if (rows.length > 0) {
            //     $('test').datagrid('selectRow',0);//grid加载完成后自动选中第一行
            //     var row=$('test').datagrid("getSelections");//获取选中的数据
            // }else {
            //     alert("没有数据");
            // }
      },  
	  onHeaderContextMenu: function(e, field){
		e.preventDefault();
		if (!cmenu){
			createColumnMenu();
		}
		cmenu.menu('show', {
			left:e.pageX,
			top:e.pageY
		});
	  }
	});
	var cmenu;
	function createColumnMenu(){
		cmenu = $('<div/>').appendTo('body');
		cmenu.menu({
			onClick: function(item){
				if (item.iconCls == 'icon-ok'){
					$('#teachingInformationList').datagrid('hideColumn', item.name);
					cmenu.menu('setIcon', {
						target: item.target,
						iconCls: 'icon-empty'
					});
				} else {
					$('#teachingInformationList').datagrid('showColumn', item.name);
					cmenu.menu('setIcon', {
						target: item.target,
						iconCls: 'icon-ok'
					});
				}
			}
		});
		var fields = $('#teachingInformationList').datagrid('getColumnFields');
		for(var i=0; i<fields.length; i++){
			var field = fields[i];
			console.log(field);
			var ss=field.split("");// 在每个逗号(,)处进行分解。
			if(ss[0]=="s"&&ss[1]=="t"&&!isNaN(ss[2])){
				continue;
			}
			var col = $('#teachingInformationList').datagrid('getColumnOption', field);
			cmenu.menu('appendItem', {
				text: col.title,
				name: field,
				iconCls: 'icon-ok'
			});
		}
	}

});
