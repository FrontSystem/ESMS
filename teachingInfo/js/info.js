function showcontent(language){
	// $('#content').html(language);
}

function formatPrice(val,row){
	console.log("val",val);
	// if (val < 30){
	// 	return '<span style="color:red;">('+val+')</span>';
	// } else {
	// 	return val;
	// }
}
$(function(){
	$('#teachingInformationList').datagrid({
	  url:'json/listOne.json',
	  method:'GET'
	});
});
