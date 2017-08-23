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
function doSearch(value, name){
	alert("检索"+name+"条目下的"+value);
}

$(function(){
	$('#teachingInformationList').datagrid({
	  url:'json/listOne.json',
	  method:'GET',
	  toolbar:"#myToolbar",
	  striped:true
	});
});
