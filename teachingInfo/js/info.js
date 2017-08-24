var listData=[];//表格所有数据

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
//搜索
function doSearch(value, name){
	alert("检索"+name+"条目下的"+value);
}
//添加班级
function addClass(){
   $("#dialog").dialog("open").dialog("setTitle", "添加新的班级");
   $("#dialogForm").form("clear");
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
   }else{
   	  alert("请先选择一个班级！");
   }
}
//删除班级
function deleteClass(){
	var row=$("#teachingInformationList").datagrid("getSelected");
    if(row){
   	  // 获取选中行的Index的值  
	   var rowIndex=$("#teachingInformationList").datagrid('getRowIndex', row);
	   listData.splice(rowIndex, 1);
	   //重新加载本地数据
	   $('#teachingInformationList').datagrid("loadData", listData);
   }else{
   	  alert("请先选择一个班级！");
   }
}
//重做
function redo(){

}
//取消
function undo(){
	
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
