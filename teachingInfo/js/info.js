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
   	  $("#dialog").dialog("open").dialog("setTitle", "编辑班级");
      $("#dialogForm").form("clear");
      $("#dialogForm").form("load",row);
   }else{
   	  alert("请先选择一个班级！");
   }
	
}
//删除班级
function deleteClass(){

	
}




$(function(){
	$('#teachingInformationList').datagrid({
	  url:'json/listOne.json',
	  method:'GET',
	  toolbar:"#myToolbar",
	  striped:true,
	  singleSelect:true,
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
