
	
//----------фильтрация--------------	
	//filter state
	var FilterState=[];
	FilterState['event_date1'] = '';
	FilterState['event_date2'] = '';
	FilterState['state'] = '0';
	FilterState['event_type'] = '0';
	FilterState['city'] = '0';
	FilterState['supplier'] = '0';
	
	
	function SetFilterState(fltr_id, selected_value){
		FilterState[fltr_id] = selected_value;
	}	
	
	function FilterEvents(EventList){
		var result=[];
	    for (var i = 0; i < EventList.length; i++) {//iterating events
		
			var f = true;
			
			if(FilterState['state']!='0' && //если выбрано 'все статусы', проверку не делаем
			FilterState['state'] != EventList[i].state) {f = false; continue;}
			
			if(FilterState['event_type']!='0' && 
			FilterState['event_type'] != EventList[i].event_type) {f = false; continue;}
			
			if(FilterState['city']!='0' && 
			FilterState['city'] != EventList[i].city) {f = false; continue;}
			
			if(FilterState['supplier']!='0' && 
			EventList[i].supplier.indexOf(FilterState['supplier']) == -1){//в списке не содержится такой поставщик
				{f = false; continue;}
			}
			//фильтрация по датам: привести оба значения к Date и сравнить
			var date_of_event = ParseDate(EventList[i].event_date);
			var date1 = ParseDate(FilterState['event_date1']);
			var date2 = ParseDate(FilterState['event_date2']);
			if(date1 > date_of_event || date2 < date_of_event){
				f = false; continue;
			}
			
			//если для всех значений фильтра true, то добавляем элемент в список отфильтрованных событий
			result.push(EventList[i]);
		}
		return result;
	}
	
	
	function ParseDate(date_str){
		//yyyy-mm-dd
		var result = new Date(date_str.substr(6, 4) + '-' + date_str.substr(3, 2) + '-' + date_str.substr(0, 2));
		//проверить result
		return result;
	}
//-------------------------------
	
	
	
	function ValidateDate(value){
		//здесь должна быть проверка введенного знчения
		return value;
	}
	
	
	//collect destinct values from event list to filter events
	function GetDestinctSuppliers(EventList){
		var result=[];
	    for (var i = 0; i < EventList.length; i++) {//iterating events
			for(var j = 0; j < EventList[i].supplier.length; j++) {//iterating sppliers
				if(result.indexOf(EventList[i].supplier[j]) == -1){
					result.push(EventList[i].supplier[j]);
				}
			}
		}				
		return result;
	}

	
	function GetDestinctStatuses(EventList){
		var result=[];
	    for (var i = 0; i < EventList.length; i++) {
			if(result.indexOf(EventList[i].state) == -1){
				result.push(EventList[i].state);
			}
		}		
		return result;
	}
	
	function GetDestinctTypes(EventList){
		var result=[];
	    for (var i = 0; i < EventList.length; i++) {
			if(result.indexOf(EventList[i].event_type) == -1){
				result.push(EventList[i].event_type);
			}
		}		
		return result;
	}
	
	function GetDestinctCities(EventList){
		var result=[];
	    for (var i = 0; i < EventList.length; i++) {
			if(result.indexOf(EventList[i].city) == -1){
				result.push(EventList[i].city);
			}
		}		
		return result;
	}
	
	
		/*
	//allregions, all topics. there is no such information in the example
	function GetDestinctTopics(EventList){
		var result=[];
		
		return result;
	}
		
	function GetDestinctRegions(EventList){
		var result=[];
		return result;
	}
	*/
	
	
	//---функции и переменные----
	var url_self = "https://www.mont.com/";