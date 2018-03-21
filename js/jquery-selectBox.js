$(function () {
    $(".icon-single-add").on("click",function () {
        $(".mask-layer").show();
        var inputId = $(this).prev().attr("id");
        $("#selectBox_single_" + inputId).css("display","inline-block");
    });

    $(".icon-double-add").on("click",function () {
        $(".mask-layer").show();
        var inputId = $(this).prev().attr("id");
        $("#selectBox_double_" + inputId).css("display","inline-block");
    });
});

/*
 *实例化单框选择器
 * 参数：inputId --> 输入框id
 * 		 data --> 数据项
 */
function selectBoxSingle(inputId,data){
    var selectBoxId = "#selectBox_single_"+inputId;
	var selectInputId = "#" + inputId;
	var total_num = "共" +data.length+ "项";

	var currentTimeStr = (new Date()).getTime() + parseInt(10000*Math.random());
    var listSearchId = "#listSearch_" + currentTimeStr;//搜索框id
    var selectBoxSingleListUl = ".selectBox-single-list-ul-" + currentTimeStr;
    var selectBoxSingleListLi = ".selectBox-single-list-li-" + currentTimeStr;
    var checkboxItem = ".checkbox-item-" + currentTimeStr;
    var departmentName = ".checkbox-name-" + currentTimeStr;

    var selectAllId = "#selectAll_" + currentTimeStr;//全选id
    var btnCloseId = "#iconClose_" + currentTimeStr;//关闭按钮id
    var btnSave = "#btnSave_" + currentTimeStr;//保存按钮id
    var btnCancelId = "#btnCancel_" + currentTimeStr;//取消按钮id

	//生成列表
    initSelectBoxSingle(inputId,currentTimeStr,data,total_num);

	//模糊匹配
	$(listSearchId).keyup(function(){
		$(selectBoxId).find(selectBoxSingleListUl).css('display', 'block');//只要输入就显示列表框
  
        if ($(listSearchId).val() == "") {//如果什么都没填,保持全部显示状态
            $(selectBoxId).find(selectBoxSingleListLi).css('display', 'block');
			return;
        }
		
		//如果填了,先将所有的选项隐藏 
		$(selectBoxId).find(selectBoxSingleListLi).css('display', 'none');
  
        for (var i = 0; i < $(selectBoxId).find(selectBoxSingleListLi).length; i++) {
            //模糊匹配，将所有匹配项显示  
            if ($(selectBoxId).find(selectBoxSingleListLi).eq(i).text().substr(0, $(listSearchId).val().length) == $(listSearchId).val()) {
                $(selectBoxId).find(selectBoxSingleListLi).eq(i).css('display', 'block');
            }  
        }
	});
	
	//全选
	$(selectAllId).on("click",function(){
		if($(this).is(':checked')){
			$(selectBoxId).find(checkboxItem).each(function(){
                //此处如果用attr，会出现第三次失效的情况  
                $(this).prop("checked",true);  
            });  
		}else{
			$(selectBoxId).find(checkboxItem).each(function(){
                $(this).prop("checked",false);
             });  
		}
	});

	//保存
	$(btnSave).on("click",function () {
        $(".mask-layer").hide();
        $(selectBoxId).hide();
        var inputVal = "";
        for(var i=0 ; i< $(selectBoxId).find(checkboxItem).length; i++){
			if($(selectBoxId).find(checkboxItem).eq(i).is(':checked')){
				var val = $(selectBoxId).find(departmentName).eq(i).text();
                inputVal = inputVal + val + ",";
			}
		}
        inputVal = inputVal.substring(0,inputVal.length-1)
        $(selectInputId).val(inputVal);
        $("#" + inputId).focus();
    });

	//关闭
	$(btnCloseId).on("click",function(){
        $(".mask-layer").hide();
        $(selectBoxId).hide();
        if($(selectInputId).val() == ""){
            $(checkboxItem).each(function () {
                $(this).prop("checked",false);
            });
        }
	});

	//取消
    $(btnCancelId).on("click",function () {
        $(".mask-layer").hide();
        $(selectBoxId).hide();
        if($(selectInputId).val() == ""){
            $(checkboxItem).each(function () {
                $(this).prop("checked",false);
            });
        }
    });
}

/*
 *列表html拼装
 */
function generateSingleList(currentTimeStr,data){
	var listHtmlStr = "";
	for(var i=0; i<data.length; i++){
		listHtmlStr = listHtmlStr + '<li class="selectBox-single-list-li selectBox-single-list-li-'+currentTimeStr+'"><div class="checkbox-group"><input type="checkbox" class="checkbox-normal checkbox-item-'+currentTimeStr+'" id="checkbox_'+ i +'_'+currentTimeStr+'"><label class="checkbox-name-'+currentTimeStr+'" for="checkbox_'+ i +'_'+currentTimeStr+'">'+ data[i].departmentName +'</label></div></li>'
	}
	return listHtmlStr;
}

/*
 *封装页面
 */
function generateSinglePage(inputId,currentTimeStr){
    var htmlStr = '<div class="selectBox">'
        + '<div class="mask-layer"></div>'
        + '<div class="selectBox-single" id="selectBox_single_'+ inputId +'">'
        + 	'<div class="selectBox-single-header">'
        +		'<div class="selectBox-single-title">部门选择</div>'
        +		'<div class="selectBox-single-close"><i class="iconfont icon-close" id="iconClose_'+currentTimeStr+'"></i></div>'
        +	'</div>'
        +	'<div class="selectBox-single-content">'
        +		'<div class="selectBox-single-list">'
        +			'<div class="selectBox-single-list-hearder">'
        +				'<div class="selectBox-single-list-search">'
        +					'<input class="selectBox-single-list-search-input" type="text" id="listSearch_'+currentTimeStr+'" placeholder="部门名称" value="" />'
        +				'</div>'
        +			'</div>'
        +			'<div class="selectBox-single-list-content">'
        +				'<div class="selectBox-single-list-main">'
        +					'<ul class="selectBox-single-list-ul selectBox-single-list-ul-'+currentTimeStr+'">'
        +					'</ul>'
        +				'</div>'
        +			'</div>'
        +			'<div class="selectBox-single-list-footer">'
        +				'<div class="checkbox-group">'
        +					'<input type="checkbox" class="checkbox-normal" id="selectAll_'+currentTimeStr+'"><label for="selectAll_'+currentTimeStr+'" class="total_num_'+currentTimeStr+'"></label>'
        +				'</div>'
        +			'</div>'
        +		'</div>'
        +	'</div>'
        +	'<div class="selectBox-single-footer">'
        +		'<div class="btn-save-input" id="btnSave_'+currentTimeStr+'">保存</div>'
        +		'<div class="btn-cancel" id="btnCancel_'+currentTimeStr+'">取消</div>'
        +	'</div>'
        + '</div>'
        + '</div>';
    return htmlStr;
}

/*
 *封装页面
 */
function initSelectBoxSingle(inputId,currentTimeStr,data,total_num){
    var selectBoxId = "#selectBox_single_"+inputId;

    $("body").append(generateSinglePage(inputId,currentTimeStr));

    //生成列表
    $(selectBoxId).find(".selectBox-single-list-ul-"+currentTimeStr).empty();
    $(selectBoxId).find(".selectBox-single-list-ul-"+currentTimeStr).append(generateSingleList(currentTimeStr,data));
    $(selectBoxId).find(".total_num_"+currentTimeStr).empty();
    $(selectBoxId).find(".total_num_"+currentTimeStr).append(total_num);
}

/*
 *实例化双框选择器
 * 参数：inputId --> 输入框id
 * 		 data --> 数据项
 */
function selectBoxdouble(inputId,data){
    var selectBoxId = "#selectBox_double_"+inputId;
    var selectInputId = "#" + inputId;

    var total_num = data.departmentData.length;
    var total_num_str = "共" +data.departmentData.length+ "项";
    var total_group_num = getGroupDepartmentNum(data.groupData);
    var total_group_num_str = "共" + total_group_num + "项";

    var new_total_num = 0;
    var new_group_total_num = 0;

    var searchSettingRight = false;

    var currentTimeStr = (new Date()).getTime() + parseInt(10000*Math.random());;
    var tabItemName = ".tab-item-name-"+currentTimeStr;//标签页
    var selectBoxDoubleList = ".selectBox-double-list-"+currentTimeStr;//标签页内容

    var listSearchId = "#listSearch_" + currentTimeStr;//左侧搜索框id
    var selectedListSearch = "#selectedListSearch_"+currentTimeStr;//右侧搜索框id

    var tabContentFirst = ".tab-content-first-"+currentTimeStr;//左侧部门内容
    var selectBoxDoubleListUl = ".selectBox-double-list-ul-"+currentTimeStr;//左侧部门列表ul
    var selectBoxDoubleListLi = ".selectBox-double-list-li-"+currentTimeStr;//左侧部门列表li
    var checkboxItem = ".checkbox-item-"+currentTimeStr;
    var checkboxName = ".checkbox-name-"+currentTimeStr;
    var totalNum = ".total_num_"+currentTimeStr;
    var selectAllId = "#selectAll_" + currentTimeStr;//全选id

    var selectBoxDoubleGroupListUl = ".selectBox-double-group-list-ul-"+currentTimeStr;//左侧群组列表ul
    var selectBoxDoubleGroupListLi = ".selectBox-double-group-list-li-"+currentTimeStr;//左侧群组列表li
    var groupSelectAll = ".group-select-all-"+currentTimeStr;//左侧群组列表群组全选
    var groupName = ".group-name-"+currentTimeStr;//左侧群组列表群组名称
    var selectBoxDoubleGroupListLiUl = ".selectBox-double-group-list-li-ul-"+currentTimeStr;//左侧不同群组ul
    var selectBoxDoubleGroupListLiUlLi = ".selectBox-double-group-list-li-ul-li-"+currentTimeStr;//左侧不同群组li
    var groupCheckboxItem = ".group-checkbox-item-"+currentTimeStr;//左侧不同群组选项
    var groupCheckboxName = ".group-checkbox-name-"+currentTimeStr;//左侧不同群组选项名称
    var groupTotalNum = ".group_total_num_"+currentTimeStr;
    var groupsSelectAll = "#groupsSelectAll_"+currentTimeStr;

    var selectBoxDoubleSelectedListUl = ".selectBox-double-selected-list-ul-"+currentTimeStr;//右侧列表ul
    var selectBoxDoubleSelectedListLi = ".selectBox-double-selected-list-li-"+currentTimeStr;//右侧列表li
    var checkboxSelectedItem = ".checkbox-selected-item-"+currentTimeStr;//右侧列表选中项
    var checkboxSelectedName = ".checkbox-selected-name-"+currentTimeStr;//右侧列表选中项名称
    var printNum = ".print-num-"+currentTimeStr;//右侧列表选中项打印次数

    var addSelected = "#add_selected_"+ currentTimeStr;//往右添加按钮
    var deleteSelected = "#delete_selected_"+ currentTimeStr;//往右添加按钮

    var btnSettingId = "#btnSetting_"+ currentTimeStr;//设置按钮id
    var unifiedPrintNum = "#unifiedPrintNum_"+currentTimeStr;//统一打印次数

    var btnCloseId = "#iconClose_" + currentTimeStr;//关闭按钮id
    var btnSaveId = "#btnSave_" + currentTimeStr;//保存按钮id
    var btnCancelId = "#btnCancel_" + currentTimeStr;//取消按钮id

    initSelectBoxDouble(inputId,currentTimeStr,data,selectBoxDoubleListUl,totalNum,total_num_str,selectBoxDoubleGroupListUl,groupTotalNum,total_group_num_str);

    //点击标签页切换
    $(selectBoxId).find(tabItemName).on("click",function(){
        $(selectAllId).prop("checked",false);
        if(!$(this).is(".tab-active")){
            $(this).addClass("tab-active").siblings().removeClass("tab-active");
            $(selectBoxDoubleList).eq($(selectBoxId).find(tabItemName).index(this)).addClass("tab-content-active").siblings().removeClass("tab-content-active");
            $(selectBoxId).find(".checkbox-normal").each(function(){
                $(this).prop("checked",false);
            });
            $(addSelected).removeClass("btn-arrow-active");
            $(selectBoxId).find(selectBoxDoubleSelectedListUl).empty();

            if($(selectBoxId).find(tabContentFirst).css("display") != "none") {//部门
                $(selectBoxId).find(selectBoxDoubleListLi).each(function () {
                    $(this).css('display', 'block');
                });
                $(selectBoxId).find(checkboxItem).each(function () {
                    $(this).prop("checked", false);
                });
                $(selectBoxId).find(totalNum).empty();
                $(selectBoxId).find(totalNum).append("共" + $(selectBoxId).find(selectBoxDoubleListLi).length + "项");
            }else{
                $(selectBoxId).find(selectBoxDoubleGroupListLiUlLi).each(function () {
                    $(this).css('display', 'block');
                });
                $(selectBoxId).find(groupCheckboxItem).each(function () {
                    $(this).prop("checked",false);
                });
                $(selectBoxId).find(groupTotalNum).empty();
                $(selectBoxId).find(groupTotalNum).append("共" + $(selectBoxId).find(selectBoxDoubleGroupListLiUlLi).length + "项");
			}
        }
    });

    //左侧模糊查询
    $(listSearchId).keyup(function(){
        $(selectBoxId).find(selectBoxDoubleListUl).css('display', 'block');//只要输入就显示列表框

        if ($(listSearchId).val() == "") {//如果什么都没填,保持全部显示状态
            for(var i=0 ; i< $(selectBoxId).find(checkboxItem).length; i++){
                if(!$(selectBoxId).find(checkboxItem).eq(i).is(':checked')){
                    $(selectBoxId).find(selectBoxDoubleListLi).eq(i).css('display', 'block');
                }
            }
            return;
        }

        //如果填了,先将所有的选项隐藏
        $(selectBoxId).find(selectBoxDoubleListLi).css('display', 'none');

        for (var j = 0; j < $(selectBoxId).find(selectBoxDoubleListLi).length; j++) {
            //模糊匹配，将所有匹配项显示
            if (!$(selectBoxId).find(checkboxItem).eq(j).is(':checked') && $(selectBoxId).find(selectBoxDoubleListLi).eq(j).text().substr(0, $(listSearchId).val().length) == $(listSearchId).val()) {
                $(selectBoxId).find(selectBoxDoubleListLi).eq(j).css('display', 'block');
            }
        }
    });

    //右侧模糊查询
    $(selectedListSearch).keyup(function(){
        $(selectBoxId).find(selectBoxDoubleSelectedListUl).css('display', 'block');//只要输入就显示列表框

        if ($(selectedListSearch).val() == "") {//如果什么都没填,保持全部显示状态
            $(selectBoxId).find(selectBoxDoubleSelectedListLi).css('display', 'block');
            searchSettingRight = false;
            return;
        }

        //如果填了,先将所有的选项隐藏
        searchSettingRight = true;
        $(selectBoxId).find(selectBoxDoubleSelectedListLi).css('display', 'none');

        for (var i = 0; i < $(selectBoxId).find(selectBoxDoubleSelectedListLi).length; i++) {
            //模糊匹配，将所有匹配项显示
            if ($(selectBoxId).find(selectBoxDoubleSelectedListLi).eq(i).text().substr(0, $(selectedListSearch).val().length) == $(selectedListSearch).val()) {
                $(selectBoxId).find(selectBoxDoubleSelectedListLi).eq(i).css('display', 'block');
            }
        }
    });

    //监听左侧部门checkBox是否被选中
    $(selectBoxId).on("click",checkboxItem,function(){
        var selected_num = 0;
        for(var i=0 ; i< $(selectBoxId).find(checkboxItem).length; i++){
            if($(selectBoxId).find(selectBoxDoubleListLi).eq(i).css('display') != "none" && $(selectBoxId).find(checkboxItem).eq(i).is(':checked')){
                selected_num++;
            }
        }
        if(selected_num > 0){
            $(addSelected).addClass("btn-arrow-active");
        }else{
            $(addSelected).removeClass("btn-arrow-active");
        }
    });
    //监听右侧部门checkBox是否被选中
    $(selectBoxId).on("click",checkboxSelectedItem,function(){
        var deleted_num = 0;
        for(var i=0 ; i< $(selectBoxId).find(checkboxSelectedItem).length; i++){
            if($(selectBoxId).find(checkboxSelectedItem).eq(i).is(':checked')){
                deleted_num++;
            }
        }
        if(deleted_num > 0){
            $(deleteSelected).addClass("btn-arrow-active");
        }else{
            $(deleteSelected).removeClass("btn-arrow-active");
        }
    });
    //监听左侧群组checkBox是否被选中
    $(selectBoxId).on("click",groupCheckboxItem,function(){
        var selected_num = 0;
        for(var i=0 ; i< $(selectBoxId).find(groupCheckboxItem).length; i++){
            if($(selectBoxId).find(selectBoxDoubleGroupListLiUlLi).eq(i).css('display') != "none" && $(selectBoxId).find(groupCheckboxItem).eq(i).is(':checked')){
                selected_num++;
            }
        }
        if(selected_num > 0){
            $(addSelected).addClass("btn-arrow-active");
        }else{
            $(addSelected).removeClass("btn-arrow-active");
        }
    });

    //全选（部门）
    $(selectAllId).on("click",function(){
        if($(this).is(':checked')){
            for(var i=0 ; i< $(selectBoxId).find(checkboxItem).length; i++){
                if($(selectBoxId).find(selectBoxDoubleListLi).eq(i).css('display') != "none" && !$(selectBoxId).find(checkboxItem).eq(i).is(':checked')){
                    //此处如果用attr，会出现第三次失效的情况
                    $(selectBoxId).find(checkboxItem).eq(i).prop("checked",true);
                }
            }
            $(addSelected).addClass("btn-arrow-active");
        }else{
            for(var i=0 ; i< $(selectBoxId).find(checkboxItem).length; i++){
                if($(selectBoxId).find(selectBoxDoubleListLi).eq(i).css('display') != "none" && $(selectBoxId).find(checkboxItem).eq(i).is(':checked')){
                    $(selectBoxId).find(checkboxItem).eq(i).prop("checked",false);
                }
            }
            $(addSelected).removeClass("btn-arrow-active");
        }
    });
    //全选（群组）
    $(groupsSelectAll).on("click",function(){
        if($(this).is(':checked')){
            for(var i=0 ; i< $(selectBoxId).find(groupCheckboxItem).length; i++){
                if($(selectBoxId).find(selectBoxDoubleGroupListLiUlLi).eq(i).css('display') != "none" && !$(selectBoxId).find(groupCheckboxItem).eq(i).is(':checked')){
                    //此处如果用attr，会出现第三次失效的情况
                    $(selectBoxId).find(groupCheckboxItem).eq(i).prop("checked",true);
                }
                if(!$(selectBoxId).find(groupSelectAll).eq(i).is(':checked')){
                    $(selectBoxId).find(groupSelectAll).eq(i).prop("checked",true);
                }
            }
            $(addSelected).addClass("btn-arrow-active");
        }else{
            for(var i=0 ; i< $(selectBoxId).find(".checkbox-item").length; i++){
                if($(selectBoxId).find(selectBoxDoubleGroupListLiUlLi).eq(i).css('display') != "none" && $(selectBoxId).find(groupCheckboxItem).eq(i).is(':checked')){
                    $(selectBoxId).find(groupCheckboxItem).eq(i).prop("checked",false);
                }
                if($(selectBoxId).find(groupSelectAll).eq(i).is(':checked')){
                    $(selectBoxId).find(groupSelectAll).eq(i).prop("checked",false);
                }
            }
            $(addSelected).removeClass("btn-arrow-active");
        }
    });


    //将选中的添加至右侧
    $(addSelected).on("click",function(){
        var listHtmlStr = "";
        var selectedItemNum = 0;
        if($(selectBoxId).find(tabContentFirst).css("display") != "none"){//部门
            for(var i=0 ; i< $(selectBoxId).find(checkboxItem).length; i++){
                if($(selectBoxId).find(checkboxItem).eq(i).is(':checked')){
                    var checkboxItemId = $(selectBoxId).find(checkboxItem).eq(i).attr("id");
                    var idIndex = checkboxItemId.split("_")[1];
                    var val = $(selectBoxId).find(checkboxName).eq(i).text();
                    $(selectBoxId).find(selectBoxDoubleListLi).eq(i).css('display', 'none');
                    listHtmlStr = listHtmlStr + '<li class="selectBox-double-selected-list-li  selectBox-double-selected-list-li-'+currentTimeStr+' .clearfix"><div class="checkbox-group"><input type="checkbox" class="checkbox-normal checkbox-selected-item-'+currentTimeStr+'" id="selectedCheckbox_'+ idIndex +'_'+currentTimeStr+'"><label class="checkbox-selected-name-'+currentTimeStr+'" for="selectedCheckbox_'+ idIndex +'_'+currentTimeStr+'">'+ val +'</label></div><input type="text" class="input-normal print-num-'+currentTimeStr+'" id="printNum_'+ idIndex +'_'+currentTimeStr+'" /></li>';
                    selectedItemNum = selectedItemNum + 1;
                }
            }
            $(selectBoxId).find(totalNum).empty();
            new_total_num = total_num - selectedItemNum;
            var new_total_num_str = "共" + new_total_num + "项";
            $(selectBoxId).find(totalNum).append(new_total_num_str);
            if(new_total_num == 0){
                $(selectAllId).prop("checked",true);
                $(selectAllId).prop("disabled","disabled");
            }
        }else{//群组
            for(var i=0 ; i< $(selectBoxId).find(groupCheckboxItem).length; i++){
                if($(selectBoxId).find(groupCheckboxItem).eq(i).is(':checked')){
                    var checkboxItemId = $(selectBoxId).find(groupCheckboxItem).eq(i).attr("id");
                    var checkboxItemArray = checkboxItemId.split("_");
                    var groupIdIndex = checkboxItemArray[1];
                    var idIndex = checkboxItemArray[3];
                    var val = $(selectBoxId).find(groupCheckboxName).eq(i).text();
                    $(selectBoxId).find(selectBoxDoubleGroupListLiUlLi).eq(i).css('display', 'none');
                    listHtmlStr = listHtmlStr + '<li class="selectBox-double-selected-list-li selectBox-double-selected-list-li-'+currentTimeStr+' .clearfix"><div class="checkbox-group"><input type="checkbox" class="checkbox-normal checkbox-selected-item-'+currentTimeStr+'" id="group_'+ groupIdIndex +'_selectedCheckbox_'+ idIndex +'_'+currentTimeStr+'"><label class="checkbox-selected-name-'+currentTimeStr+'" for="group_'+ groupIdIndex +'_selectedCheckbox_'+ idIndex +'_'+currentTimeStr+'">'+ val +'</label></div><input type="text" class="input-normal print-num-'+currentTimeStr+'" id="group_'+ groupIdIndex +'_printNum_'+ idIndex +'_'+currentTimeStr+'" /></li>'
                    selectedItemNum = selectedItemNum + 1;
                }
            }
            for(var j=0;j<$(selectBoxId).find(groupSelectAll).length;j++){
                if($(selectBoxId).find(groupSelectAll).eq(j).is(":checked")){
                    $(selectBoxId).find(groupSelectAll).eq(j).prop("disabled","disabled");
                }
            }
            $(selectBoxId).find(groupTotalNum).empty();
            new_group_total_num = total_num - selectedItemNum;
            var new_total_num_str = "共" + new_group_total_num + "项";
            $(selectBoxId).find(groupTotalNum).append(new_total_num_str);
            if(new_group_total_num == 0){
                $(groupsSelectAll).prop("checked",true);
                $(groupsSelectAll).prop("disabled","disabled");
            }
        }
        $(addSelected).removeClass("btn-arrow-active");
        $(selectBoxId).find(selectBoxDoubleSelectedListUl).empty();
        $(selectBoxId).find(selectBoxDoubleSelectedListUl).append(listHtmlStr);
    });

    //删除选中的至左侧
    $(deleteSelected).on("click",function(){
        var deleteItemNum = 0;
        if($(selectBoxId).find(tabContentFirst).css("display") != "none"){//部门
            for(var i=0 ; i< $(selectBoxId).find(checkboxSelectedItem).length;){
                if($(selectBoxId).find(checkboxSelectedItem).eq(i).is(':checked')){
                    var checkboxSelectedItemId = $(selectBoxId).find(checkboxSelectedItem).eq(i).attr("id");
                    var idIndex = checkboxSelectedItemId.split("_")[1];
                    var val = $(selectBoxId).find(checkboxSelectedName).eq(i).text();
                    $(selectBoxId).find(selectBoxDoubleSelectedListLi).eq(i).remove();
                    $(selectBoxId).find(checkboxItem).eq(idIndex).prop("checked",false);
                    $(selectBoxId).find(selectBoxDoubleListLi).eq(idIndex).css('display', 'block');
                    deleteItemNum = deleteItemNum + 1;
                }else{
                    i++;
                }
            }
            $(selectBoxId).find(totalNum).empty();
            new_total_num = new_total_num + deleteItemNum;
            var new_total_num_str = "共" + new_total_num + "项";
            $(selectBoxId).find(totalNum).append(new_total_num_str);
            if($(selectAllId).is(':checked')){
                $(selectAllId).prop("checked",false);
                $(selectAllId).removeAttr("disabled");
            }
        }else{//群组
            for(var i=0 ; i< $(selectBoxId).find(checkboxSelectedItem).length;){
                if($(selectBoxId).find(checkboxSelectedItem).eq(i).is(':checked')){
                    var checkboxSelectedItemId = $(selectBoxId).find(checkboxSelectedItem).eq(i).attr("id");
                    var groupItemIdArray = checkboxSelectedItemId.split("_")
                    var groupId = groupItemIdArray[1];
                    var idIndex = groupItemIdArray[3];
                    var val = $(selectBoxId).find(checkboxSelectedName).eq(i).text();
                    $(selectBoxId).find(selectBoxDoubleSelectedListLi).eq(i).remove();
                    $(selectBoxId).find("#group_"+groupId+"_"+currentTimeStr).prop("checked",false);
                    $(selectBoxId).find("#group_"+groupId+"_"+currentTimeStr).removeAttr("disabled");
                    $(selectBoxId).find("#group_"+groupId+"_checkbox_"+idIndex+"_"+currentTimeStr).prop("checked",false);
                    $(selectBoxId).find("#group_"+groupId+"_checkbox_"+idIndex+"_"+currentTimeStr).parent().parent().css('display', 'block');
                    deleteItemNum = deleteItemNum + 1;
                }else{
                    i++;
                }
            }
            $(selectBoxId).find(groupTotalNum).empty();
            new_group_total_num = new_group_total_num + deleteItemNum;
            var new_total_num_str = "共" + new_group_total_num + "项";
            $(selectBoxId).find(groupTotalNum).append(new_total_num_str);
            if($(groupsSelectAll).is(':checked')){
                $(groupsSelectAll).prop("checked",false);
                $(groupsSelectAll).removeAttr("disabled");
            }
        }
        $(deleteSelected).removeClass("btn-arrow-active");
    });

    //选中或者反选群组中的所有部门
    $(groupSelectAll).on("click",function(){
        var groupIndex = ($(this).attr("id")).split("_")[1];
        if($(this).is(':checked')){
            $(addSelected).addClass("btn-arrow-active");
            for(var i=0 ; i< $(selectBoxId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).length; i++){
                if(!$(selectBoxId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(i).is(':checked') && $(selectBoxId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(i).parent().parent().css("display") != "none"){
                    //此处如果用attr，会出现第三次失效的情况
                    $(selectBoxId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(i).prop("checked",true);
                }
            }
            var groupCheckedNum = 0;
            $(selectBoxId).find(groupSelectAll).each(function () {
                if($(this).is(":checked")){groupCheckedNum = groupCheckedNum + 1;}
            });
            if(groupCheckedNum == $(selectBoxId).find(groupSelectAll).length){
                $(groupsSelectAll).prop("checked",true);
            }
        }else{
            for(var j=0 ; j< $(selectBoxId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).length; j++){
                if($(selectBoxId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(j).is(':checked') && $(selectBoxId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(i).parent().parent().css("display") != "none"){
                    $(selectBoxId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(j).prop("checked",false);
                }
            }
            var groupCheckedNum = 0;
            $(selectBoxId).find(groupSelectAll).each(function () {
                if($(this).is(":checked")){groupCheckedNum = groupCheckedNum + 1;}
            });
            if(groupCheckedNum != $(selectBoxId).find(groupSelectAll).length){
                $(groupsSelectAll).prop("checked",false);
            }
            if(groupCheckedNum == 0){
                $(addSelected).removeClass("btn-arrow-active");
            }
        }
    });


    //保存
    $(btnSaveId).on("click",function () {
        $(".mask-layer").hide();
        $(selectBoxId).hide();
        var inputVal = "";
        for(var i=0 ; i< $(selectBoxId).find(checkboxSelectedItem).length; i++){
            if($(selectBoxId).find(checkboxSelectedItem).eq(i).is(':checked')){
                var val = $(selectBoxId).find(checkboxSelectedName).eq(i).text();
                var printNumVal = $(selectBoxId).find(printNum).eq(i).val();
                inputVal = inputVal + val +"["+printNumVal+"]"+ ",";
            }
        }
        inputVal = inputVal.substring(0,inputVal.length-1);
        $(selectInputId).val(inputVal);
        $("#" + inputId).focus();
    });

    //关闭
    $(btnCloseId).on("click",function(){
        $(".mask-layer").hide();
        $(selectBoxId).hide();
        if($(selectInputId).val() == ""){
            $(checkboxItem).each(function () {
                $(this).prop("checked",false);
            });
        }
        $(addSelected).removeClass("btn-arrow-active");
    });

    //取消
    $(btnCancelId).on("click",function () {
        $(".mask-layer").hide();
        $(selectBoxId).hide();
        if($(selectInputId).val() == ""){
            $(checkboxItem).each(function () {
                $(this).prop("checked",false);
            });
        }
        $(addSelected).removeClass("btn-arrow-active");
    });

    //统一设置打印次数
    $(btnSettingId).on("click",function(){
        var undefinedNumVal = $(unifiedPrintNum).val();
        if(!searchSettingRight){
            for(var i=0 ; i< $(selectBoxId).find(printNum).length; i++){
                $(selectBoxId).find(printNum).eq(i).val(undefinedNumVal);
            }
        }else{
            for(var j=0 ; j< $(selectBoxId).find(printNum).length; j++){
                if($(selectBoxId).find(printNum).eq(j).parent().css('display') != "none"){
                    $(selectBoxId).find(printNum).eq(j).val(undefinedNumVal);
                }
            }
        }
    });
}

/*
 *左侧部门列表html拼装
 */
function generateLeftDepartmentList(currentTimeStr,data){
    var listHtmlStr = "";
    for(var i=0; i<data.length; i++){
        listHtmlStr = listHtmlStr + '<li class="selectBox-double-list-li selectBox-double-list-li-'+currentTimeStr+'"><div class="checkbox-group"><input type="checkbox" class="checkbox-normal checkbox-item-'+currentTimeStr+'" id="departmentCheckbox_'+ i +'_'+currentTimeStr+'"><label class="checkbox-name-'+currentTimeStr+'" for="departmentCheckbox_'+ i +'_'+currentTimeStr+'">'+ data[i].departmentName +'</label></div></li>'
    }
    return listHtmlStr;
}

/*
 *左侧群组列表html拼装
 */
function generateLeftGroupList(currentTimeStr,data){
    var listHtmlStr = "";
    for(var i=0; i<data.length; i++){
        listHtmlStr = listHtmlStr + '<li class="selectBox-double-group-list-li selectBox-double-group-list-li-'+currentTimeStr+'">'
            + '<div class="checkbox-group"><input type="checkbox" class="checkbox-normal group-select-all-'+currentTimeStr+'" id="group_'+ i +'_'+currentTimeStr+'"><label for="group_'+ i +'_'+currentTimeStr+'" class="group-name-'+currentTimeStr+'">'+ data[i].groupName +'</label></div>';
        if(data[i].groupData.length > 0){
            listHtmlStr = listHtmlStr + '<ul class="selectBox-double-group-list-li-ul selectBox-double-group-list-li-ul-'+currentTimeStr+'">'
            for(var j=0; j<data[i].groupData.length; j++){
                listHtmlStr = listHtmlStr + '<li class="selectBox-double-group-list-li-ul-li selectBox-double-group-list-li-ul-li-'+currentTimeStr+'"><div class="checkbox-group"><input type="checkbox" class="checkbox-normal group-checkbox-item-'+currentTimeStr+' belongs-group-'+ i +'-'+currentTimeStr+'" id="group_'+ i +'_checkbox_'+ j +'_'+currentTimeStr+'"><label for="group_'+ i +'_checkbox_'+ j +'_'+currentTimeStr+'" class="group-checkbox-name-'+currentTimeStr+'">'+ data[i].groupData[j].departmentName +'</label></div></li>';
            }
            listHtmlStr = listHtmlStr + '</ul>'
        }else{
            listHtmlStr = listHtmlStr +'</li>';
        }
        listHtmlStr = listHtmlStr + '</li>';
    }
    return listHtmlStr;
}

/*
 *获取群组中所有部门数量
 */
function getGroupDepartmentNum(data){
    var total_group_department_num = 0;
    for(var i=0; i<data.length; i++){
        var groupData = data[i].groupData;
        if(groupData.length > 0){
            total_group_department_num = total_group_department_num + groupData.length;
        }
    }
    return total_group_department_num;
}

/*
 *封装整个页面
 */
function generatePage(inputId,currentTimeStr){
    var htmlStr = '<div class="selectBox">'
        +		'<div class="mask-layer"></div>'
        +		'<div class="selectBox-double" id="selectBox_double_'+inputId+'">'
        +			'<div class="selectBox-double-header">'
        +				'<div class="selectBox-double-title">部门选择</div>'
        +				'<div class="selectBox-double-close"><i class="iconfont icon-close" id="iconClose_'+currentTimeStr+'"></i></div>'
        +			'</div>'
        +			'<div class="selectBox-double-content clearfix">'
        +				'<div class="selectBox-double-content-left">'
        +					'<div class="selectBox-double-content-tabs">'
        +						'<div class="tab-item-name tab-item-name-'+currentTimeStr+' tab-active">部门</div>'
        +						'<div class="tab-item-name tab-item-name-'+currentTimeStr+'">群组</div>'
        +					'</div>'
        +					'<div class="selectBox-double-list selectBox-double-list-'+currentTimeStr+' tab-content-first-'+currentTimeStr+' tab-content-active">'
        +						'<div class="selectBox-double-list-hearder">'
        +							'<div class="selectBox-double-list-search">'
        +								'<input class="selectBox-double-list-search-input" type="text" id="listSearch_'+currentTimeStr+'" placeholder="部门名称" value="" />'
        +							'</div>'
        +						'</div>'
        +						'<div class="selectBox-double-list-content">'
        +							'<div class="selectBox-double-list-main">'
        +								'<ul class="selectBox-double-list-ul selectBox-double-list-ul-'+currentTimeStr+'">'
        +								'</ul>'
        +							'</div>'
        +						'</div>'
        +						'<div class="selectBox-double-list-footer">'
        +							'<div class="checkbox-group">'
        +								'<input type="checkbox" class="checkbox-normal" id="selectAll_'+currentTimeStr+'"><label for="selectAll_'+currentTimeStr+'" class="total_num_'+currentTimeStr+'"></label>'
        +							'</div>'
        +						'</div>'
        +					'</div>'
        +					'<div class="selectBox-double-list selectBox-double-list-'+currentTimeStr+'">'
        +						'<div class="selectBox-double-list-hearder">'
        +							'<div class="selectBox-double-list-search">'
        +								'<input class="selectBox-double-list-search-input" type="text" id="listSearch_'+currentTimeStr+'" placeholder="部门名称" value="" />'
        +							'</div>'
        +						'</div>'
        +						'<div class="selectBox-double-list-content">'
        +							'<div class="selectBox-double-list-main">'
        +								'<ul class="selectBox-double-group-list-ul selectBox-double-group-list-ul-'+currentTimeStr+'">'
        +								'</ul>'
        +							'</div>'
        +						'</div>'
        +						'<div class="selectBox-double-list-footer">'
        +							'<div class="checkbox-group">'
        +								'<input type="checkbox" class="checkbox-normal" id="groupsSelectAll_'+currentTimeStr+'"><label for="groupsSelectAll_'+currentTimeStr+'" class="group_total_num_'+currentTimeStr+'"></label>'
        +							'</div>'
        +						'</div>'
        +					'</div>'
        +				'</div>'
        +				'<div class="selectBox-double-content-middle">'
        +					'<div class="btn-select-arrow" id="add_selected_'+currentTimeStr+'"><i class="iconfont icon-forward"></i></div>'
        +					'<div class="btn-select-arrow" id="delete_selected_'+currentTimeStr+'"><i class="iconfont icon-back"></i></div>'
        +				'</div>'
        +				'<div class="selectBox-double-content-right">'
        +					'<div class="selectBox-double-content-param">'
        +						'<div class="param-item">部门</div>'
        +						'<span class="vertical-separation-line">|</span>'
        +						'<div class="param-item">打印次数</div>'
        +					'</div>'
        +					'<div class="selectBox-double-selected-list">'
        +						'<div class="selectBox-double-selected-list-hearder">'
        +							'<div class="selectBox-double-selected-list-search">'
        +								'<input class="selectBox-double-selected-list-search-input" type="text" id="selectedListSearch_'+currentTimeStr+'" placeholder="部门名称" value="" />'
        +							'</div>'
        +						'</div>'
        +						'<div class="selectBox-double-selected-list-content">'
        +							'<div class="selectBox-double-selected-list-main">'
        +								'<ul class="selectBox-double-selected-list-ul selectBox-double-selected-list-ul-'+currentTimeStr+'">'
        +								'</ul>'
        +							'</div>'
        +						'</div>'
        +						'<div class="selectBox-double-list-footer">'
        +							'<span>所有部门</span>'
        +							'<input type="text" class="input-normal" id="unifiedPrintNum_'+currentTimeStr+'" />'
        +							'<div class="btn-setting" id="btnSetting_'+currentTimeStr+'">设置</div>'
        +						'</div>'
        +					'</div>'
        +				'</div>'
        +			'</div>'
        +			'<div class="selectBox-double-footer">'
        +				'<div class="btn-save-input" id="btnSave_'+currentTimeStr+'">保存</div>'
        +				'<div class="btn-cancel" id="btnCancel_'+currentTimeStr+'">取消</div>'
        +			'</div>'
        +		'</div>'
        +	'</div>';
    return htmlStr;
}

//初始化
function initSelectBoxDouble(inputId,currentTimeStr,data,selectBoxDoubleListUl,totalNum,total_num_str,selectBoxDoubleGroupListUl,groupTotalNum,total_group_num_str){
    var selectBoxId = "#selectBox_double_"+inputId;
    $("body").append(generatePage(inputId,currentTimeStr));

    //生成列表
    $(selectBoxId).find(selectBoxDoubleListUl).empty();
    $(selectBoxId).find(selectBoxDoubleListUl).append(generateLeftDepartmentList(currentTimeStr,data.departmentData));
    $(selectBoxId).find(totalNum).empty();
    $(selectBoxId).find(totalNum).append(total_num_str);

    $(selectBoxId).find(selectBoxDoubleGroupListUl).empty();
    $(selectBoxId).find(selectBoxDoubleGroupListUl).append(generateLeftGroupList(currentTimeStr,data.groupData));
    $(selectBoxId).find(groupTotalNum).empty();
    $(selectBoxId).find(groupTotalNum).append(total_group_num_str);
}