//---функции и переменные----
	var url_self = "https://www.mont.com/";
	
	function ValidateDate(value){
		//здсь должна быть проверка введенного знчения
		return value;
	}
	
	
	//collect destinct values from event list to filter events
	function GetDestinctSuppliers(EventList){
		var result=[];		
		return result;
	}
	
	function GetDestinctTopics(EventList){
		var result=[];
		return result;
	}
	
	function GetDestinctStatuses(EventList){
		var result=[];
	    for (var i = 0; i < EventList.length; i++) {
			if(result.indexOf(EventList.state) == -1){
				result.push(EventList.state);
			}
		}		
		return result;
	}
	
	function GetDestinctTypes(EventList){
		var result=[];
		return result;
	}
	
	function GetDestinctRegions(EventList){
		var result=[];
		return result;
	}
	
	function GetDestinctCities(EventList){
		var result=[];
		return result;
	}