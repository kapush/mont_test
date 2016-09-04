	
	//------------------------данные из модели--------------------------------
		var logo_url = 'https://www.mont.com/';
		var logo_img_src = 'https://www.mont.com/Content/img/logo.png';
		var signIn_url = 'https://www.mont.com/ru-ru/Account/Login?returnUrl=%2Fru-ru%2Fesd';
		
		var langs = [
			{ value: 'ru-ru', text: 'ru'},
			{ value: 'ru-by', text: 'by'},
		];
		var lang_selected='ru-ru';
		
		var menu_business = [
			{ value: 'https://www.mont.com/' + lang_selected + '/classic', text: 'Классическая дистрибуция'},
			{ value: 'https://www.mont.com/' + lang_selected + '/esd', text: 'Электронная дистррибуция'},
			{ value: 'https://www.mont.com/' + lang_selected + '/clouds', text: 'Облачные сервисы'},
			{ value: 'https://www.mont.com/' + lang_selected + '/solutions', text: 'Экспертные решения'},
		];
		
		var menu_list = ['Поставщики', 'Стать партнером', 'Вакансии', 'О компании', 'Контакты'];
		
		var EventList=[
		{event_date: '', supplier: '', state: '', event_type: '' },
		{event_date: '', supplier: '', state: '', event_type: '' },
		{event_date: '', supplier: '', state: '', event_type: '' },
		];
		
	//-------------------------------------------------------------------------	
	
	//---функции и переменные----
	var url_self = "https://www.mont.com/";
	
	function ValidateDate(value){
		//здсь должна быть проверка введенного знчения
		return value;
	}
	
	function GetDestinctSuppliers(EventList){
	//собрать всех различных поставщиков из списка событий
		var result=[];
		return result;
	}
	
	
	
	//--------------компоненты react---------------
	//компонент - логотип
		var Logo = React.createClass({
		render: function() {
				return <a href={this.props.imageUrl}><img src={this.props.imageSrc}/></a>;
			}
		});
	
	//компонент - вход для партнера	
		var SignIn = React.createClass({
		render: function() {
				return <a href={this.props.aUrl}>Вход для партнера</a>;
			}
		});
		
	//компонент - переключение языков	
		var LangSwitch = React.createClass({		
		
		//выбранный язык сохраняется в параметре lang_selected
			getInitialState: function(){
				return { selected: {lang_selected} };
			},

		//при смене языка загружается та же страница с другим параметром	
			handleChange: function(e){
				this.setState({selected:e.target.value});
				window.location = url_self + 'ru-by';
			},

			render: function(){//список языков передается в this.props.items
					return <select value={this.state.selected} onChange={this.handleChange}>
								{ 
									this.props.items.map(function(l){
										return <option value={l.value}>{l.text}</option>
									}) 
								}
						   </select>;
				}
		});
		
		
		//компонент меню - выбор направления бизнеса
		var Menu_BuisinessSelect = React.createClass({	
			getInitialState: function(){
				return { select_hidden: 1 };
			},
			handleChange: function(e){
			//
				window.location = e.target.value;
			},
			
			//при наведении мыши на пункт меню, выпадает список
			handleMouseOver: function(){
				//вызов setState перерисовывает компонент
				this.setState({select_hidden: 0});
			},
			//список спрятан
			handleMouseOut: function(){
				this.setState({select_hidden: 1});
			},

			render: function(){//список меню и url передается в this.props.items
					var style='';
					if(this.state.select_hidden == 1){
						style='display_none';
					}
					return <li className='header_menu_li header_menu_item header_menu_li_width' onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} >Направление бизнеса<br/>
							   <select multiple="multiple" className={'header_menu_item no-scroll ' + style} size={menu_business.length} onChange={this.handleChange}>
									{ 
										this.props.items.map(function(l){
											return <option value={l.value}>{l.text}</option>
										}) 
									}
							   </select>
						   </li>;
			}
		});		
		
		
		//компонент меню
		var MenuList = React.createClass({

		getInitialState: function(){
			return { focused: 0 };
		},

		clicked: function(index){

			// Обработчик клика обновит состояние
			// изменив индекс на сфокусированный элемент меню

			this.setState({focused: index});
		},

		render: function() {

			var self = this;

			// Метод map пройдется по массиву элементов меню,
			// и возвратит массив с <li> элементами.

			return (
				<div>
					<ul className='header_menu_ul'>
						{/*первый элемент - Select бизнеса*/}
						<Menu_BuisinessSelect items={menu_business}/>
						{ this.props.items.map(function(m, index){
				
							var style = '';
				
							if(self.state.focused == index){
								style = 'header_menu_focused';
							}
				
							return <li className={'header_menu_li header_menu_item ' + style} onClick={self.clicked.bind(self, index)}>{m}</li>;
				
						}) }
							
					</ul>
					
				</div>
			);

		}
	});		
	
	
//--------------фильтрция мероприятий-------------------------------

//даты
		var Filter_Date1 = React.createClass({	
			getInitialState: function(){
				return { date_default: '08.06.2016' };
			},
			handleChange: function(e){
				var date1 = ValidateDate(e.target.value);
				this.setState({date_default: date1});
				//фильтровать мероприятия начиная с этой даты
			},
			
			render: function(){
					return <input value={this.state.date_default} />;				
					
			}	
			
		});
		
		var Filter_Date2 = React.createClass({	
			getInitialState: function(){
				return { date_default: '31.12.2025' };
			},
			handleChange: function(e){
				var date2 = ValidateDate(e.target.value);
				this.setState({date_default: date2});
				//фильтровать мероприятия до этой даты
			},
			
			render: function(){
					return <input value={this.state.date_default} />;				
					
			}	
			
		});

//выбор поставщика		
		var Filter_supplier = React.createClass({	
			getInitialState: function(){
				return {selected_value: 0 };
			},
			handleChange: function(e){
				this.setState({ selected_value: e.target.value });
			//фильтровать меропрития по поставщику
				
			},
			render: function(){//список образуется из всех различных поставщиков из списка мероприятий
					return <select value={this.state.selected_value} сlassName='filters_superSelect' onChange={this.handleChange}>
									<option value='0'>Все поставщики</option>
									{ 
										this.props.items.map(function(l){
											return <option value={l.value}>{l.text}</option>
										}) 
									}
						   </select>;
						   
			}
		});
		
		/*
		//общий для фильтров компонент select	
		var SuperSelect = React.createClass({	
			getInitialState: function(){
				return {selected_value: 0 };
			},
			render: function(){
					return <select value={this.state.selected_value} сlassName='filters_superSelect' onChange={this.props.handleChange}>
									<option value='0'>{this.props.tout}</option>
									{ 
										this.props.items.map(function(l){
											return <option value={l.value}>{l.text}</option>
										}) 
									}
						   </select>;
						   
			}
		});
		
		var Filter_Suppliers = = React.createClass({
		
				handleSupChangefunction(e){
				this.setState({ selected_value: e.target.value });
				//фильтровать меропрития по поставщику
				
			},
					render: function(){
					return <SuperSelect selected_value= handleChange={handleSupChange} tout="Все поставщики" items={GetDestinctSuppliers(EventList)}/>
						   
			}
		});
		*/
		
	
//--------------render компонентов	--------------------------------
		ReactDOM.render(
		  <Logo imageSrc={logo_img_src} imageUrl={logo_url} />,
		  document.getElementById('h_logo')
		);	
		
		ReactDOM.render(
		  <SignIn aUrl={signIn_url} />,
		  document.getElementById('h_signin')
		);
		
		ReactDOM.render(
		  <LangSwitch items={langs} />,
		  document.getElementById('h_lang')
		);
		
		ReactDOM.render(
		  <MenuList items={menu_list} />,
		  document.getElementById('h_menu')
		);
		
		ReactDOM.render(
		  <Filter_Date1 />,
		  document.getElementById('fltr_date1')
		);
		
		ReactDOM.render(
		  <Filter_Date2 />,
		  document.getElementById('fltr_date2')
		);
		
		ReactDOM.render(
		  <Filter_supplier items={GetDestinctSuppliers(EventList)} />,
		  document.getElementById('fltr_suppliers')
		);
		