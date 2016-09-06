//-----------react components

//-------header
	//logo 
		var Logo = React.createClass({
		render: function() {
				return <a href={this.props.imageUrl}><img src={this.props.imageSrc}/></a>;
			}
		});
		
	
	//sign in
		var SignIn = React.createClass({
		render: function() {
				return <a href={this.props.aUrl}>Вход для партнера</a>;
			}
		});
		
	//language swicher	
		var LangSwitch = React.createClass({		
		
		//выбранный язык сохраняется в параметре lang_selected
			getInitialState: function(){
				return { selected: 'ru-ru' };
			},

		//при смене языка загружается та же страница с другим параметром	
			handleChange: function(e){
				this.setState({selected: e.target.value});
				//window.location = url_self + 'ru-by';
			},

			render: function(){//список языков передается в this.props.items
					return <select value={this.state.selected} onChange={this.handleChange}>
								{ 
									this.props.items.map(function(l, index){
										return <option key={index} value={l.value}>{l.text}</option>
									}) 
								}
						   </select>;
			}
		});
		

		
//--------menu 
	
	//--------business select
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
					return <li className='header_menu_li header_menu_item header_menu_li_width' 
								onMouseOver={this.handleMouseOver} 
								onMouseOut={this.handleMouseOut} >
								Направление бизнеса<br/>
							   <select multiple="multiple" className={'header_menu_item no-scroll ' + style} size={menu_business.length} onChange={this.handleChange}>
									{ 
										this.props.items.map(function(l, index){
											return <option key={index} value={l.value}>{l.text}</option>
										}) 
									}
							   </select>
						   </li>;
			}
		});		
		
		
		//menu component
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
				
							return <li key={index} className={'header_menu_li header_menu_item ' + style} onClick={self.clicked.bind(self, index)}>{m}</li>;
				
						}) }
							
					</ul>
					
				</div>
			);

		}
	});		
	
	
//------------event filters

//dates
		var Filter_Date1 = React.createClass({	
			getInitialState: function(){
				return { date_default: '25.07.2016' };
			},
			componentDidMount: function(){
				this.setState({fltr_id: this.props.fltr_id});
				SetFilterState(this.state.fltr_id, this.state.date_default);
			},
			handleChange: function(e){
				//var date1 = ValidateDate(e.target.value);
				this.setState({date_default: date1});
				//фильтровать мероприятия начиная с этой даты
				var Events_filtered = FilterEvents(EventList);
				ReactDOM.render(<Events items={Events_filtered} />,
								document.getElementById('e_list')
				);
			},
			
			render: function(){
					return <input className="event-filters_date-input" value={this.state.date_default} onChange={this.handleChange} maxLength="10"/>;				
					
			}	
			
		});
		
		var Filter_Date2 = React.createClass({	
			getInitialState: function(){
				return { date_default: '31.12.2025' };
			},
			
			componentDidMount: function(){
				this.setState({fltr_id: this.props.fltr_id});
				SetFilterState(this.state.fltr_id, this.state.date_default);
			},
			
			handleChange: function(e){
				//var date2 = ValidateDate(e.target.value);
				this.setState({date_default: date2});
				//фильтровать мероприятия до этой даты
				var Events_filtered = FilterEvents(EventList);
				ReactDOM.render(<Events items={Events_filtered} />,
								document.getElementById('e_list')
				);
			},
			
			render: function(){
					return <input className="event-filters_date-input" value={this.state.date_default} onChange={this.handleChange} maxLength="10"/>;				
					
			}	
			
		});

//select component for filter		
		var Filter_select = React.createClass({	
			getInitialState: function(){
				return {selected_value: 0 };
			},
			
			componentDidMount: function(){
				this.setState({fltr_id: this.props.fltr_id});
			},
			
			handleChange: function(e){
				this.setState({ selected_value: e.target.value });
				
				SetFilterState(this.state.fltr_id, e.target.value);
				
				//фильтровать меропрития по фильтру, добавить id фильтра в state и по нему понимать что за фильтр...
				var Events_filtered = FilterEvents(EventList);
				ReactDOM.render(<Events items={Events_filtered} />,
								document.getElementById('e_list')
				);
			},
			
			render: function(){//список образуется из всех различных значений фильтра из списка мероприятий
					return <select className="event-filters_elem" value={this.state.selected_value} onChange={this.handleChange}>
									<option value='0'>{this.props.tout}</option>
									{ 
										this.props.items.map(function(l, index){
											return <option key={index} value={l}>{l}</option>
										}) 
									}
						   </select>;
						   
			}
		});
		

		
//----------event list
	
	//suppliers list
	//component list of suppliers rendered from props transfered from component Event
	//компонент-список всех поставщиков, рендерится из props, переданных в компоненте Event
	var EventSuppliers	= React.createClass({	
			render: function(){
					return <div className="event__supplier-list">
									{ 
										this.props.items.map(function(l, index){
											return <span key={index} className="event__supplier">{l}</span>
										}) 
									}
						   </div>;
						   
			}
	});
	
	
	//Events component rendered from data array EventList
	var Events = React.createClass({
				render: function(){
					return	<div>{this.props.items.map(function(item, index){
									return <div key={index} className="event-list__event">
										<div className="event__info">
											<div className="event__line1 event_line">
												<span className="event_type event_container_pad">{item.event_type}</span>
												<span className="event_date event_container_pad">{item.event_date}</span>
												<span className="event_city event_container_pad">{item.city}</span>
												<span className={'event_state event_container_pad ' + statusStyle[item.state]}>
												<img src={'img/icons/' + statusIcon[item.state]} width="15px" />&nbsp;{item.state}</span>
											</div>									
											<div className="event__subj event_line">
												<h3>{item.subj}</h3>
											</div>
											<div className="event__description event_line">
												{item.descripion}
											</div>
											<div className="event__suppliers event_line">
												<EventSuppliers items={item.supplier} />
											</div>
										</div>
										<div className="event__banner">
											<img src={'img/' + item.banner} />
										</div>
									</div>
								})}
							</div>
						   
			}
	});
	
	
		
	
	
	
//--------------render components	--------------------------------
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
		/*
		ReactDOM.render(
		  <Filter_Date1 fltr_id="event_date1" />,
		  document.getElementById('fltr_date1')
		);
		
		ReactDOM.render(
		  <Filter_Date2 fltr_id="event_date2" />,
		  document.getElementById('fltr_date2')
		);*/
		
		ReactDOM.render(
		  <Filter_select fltr_id="supplier" items={GetDestinctSuppliers(EventList)} tout="Все поставщики" />,
		  document.getElementById('fltr_suppliers')
		);
		
		ReactDOM.render(
		  <Filter_select fltr_id="state" items={GetDestinctStatuses(EventList)} tout="Все статусы" />,
		  document.getElementById('fltrs_status')
		);
		
		ReactDOM.render(
		  <Filter_select fltr_id="event_type" items={GetDestinctTypes(EventList)} tout="Все типы" />,
		  document.getElementById('fltr_types')
		);
		
		ReactDOM.render(
		  <Filter_select fltr_id="city" items={GetDestinctCities(EventList)} tout="Все города" />,
		  document.getElementById('fltr_cities')
		);

		
	    var Events_filtered = FilterEvents(EventList);
		ReactDOM.render(
		  <Events items={EventList} />,
		  document.getElementById('e_list')
		);
		
		