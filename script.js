	
	//------------------------������ �� ������--------------------------------
		var logo_url = 'https://www.mont.com/';
		var logo_img_src = 'https://www.mont.com/Content/img/logo.png';
		var signIn_url = 'https://www.mont.com/ru-ru/Account/Login?returnUrl=%2Fru-ru%2Fesd';
		
		var langs = [
			{ value: 'ru-ru', text: 'ru'},
			{ value: 'ru-by', text: 'by'},
		];
		var lang_selected='ru-ru';
		
		var menu_business = [
			{ value: 'https://www.mont.com/' + lang_selected + '/classic', text: '������������ �����������'},
			{ value: 'https://www.mont.com/' + lang_selected + '/esd', text: '����������� ������������'},
			{ value: 'https://www.mont.com/' + lang_selected + '/clouds', text: '�������� �������'},
			{ value: 'https://www.mont.com/' + lang_selected + '/solutions', text: '���������� �������'},
		];
		
		var menu_list = ['����������', '����� ���������', '��������', '� ��������', '��������'];
		
		var EventList=[
		{event_date: '', supplier: '', state: '', event_type: '' },
		{event_date: '', supplier: '', state: '', event_type: '' },
		{event_date: '', supplier: '', state: '', event_type: '' },
		];
		
	//-------------------------------------------------------------------------	
	
	//---������� � ����������----
	var url_self = "https://www.mont.com/";
	
	function ValidateDate(value){
		//���� ������ ���� �������� ���������� �������
		return value;
	}
	
	function GetDestinctSuppliers(EventList){
	//������� ���� ��������� ����������� �� ������ �������
		var result=[];
		return result;
	}
	
	
	
	//--------------���������� react---------------
	//��������� - �������
		var Logo = React.createClass({
		render: function() {
				return <a href={this.props.imageUrl}><img src={this.props.imageSrc}/></a>;
			}
		});
	
	//��������� - ���� ��� ��������	
		var SignIn = React.createClass({
		render: function() {
				return <a href={this.props.aUrl}>���� ��� ��������</a>;
			}
		});
		
	//��������� - ������������ ������	
		var LangSwitch = React.createClass({		
		
		//��������� ���� ����������� � ��������� lang_selected
			getInitialState: function(){
				return { selected: {lang_selected} };
			},

		//��� ����� ����� ����������� �� �� �������� � ������ ����������	
			handleChange: function(e){
				this.setState({selected:e.target.value});
				window.location = url_self + 'ru-by';
			},

			render: function(){//������ ������ ���������� � this.props.items
					return <select value={this.state.selected} onChange={this.handleChange}>
								{ 
									this.props.items.map(function(l){
										return <option value={l.value}>{l.text}</option>
									}) 
								}
						   </select>;
				}
		});
		
		
		//��������� ���� - ����� ����������� �������
		var Menu_BuisinessSelect = React.createClass({	
			getInitialState: function(){
				return { select_hidden: 1 };
			},
			handleChange: function(e){
			//
				window.location = e.target.value;
			},
			
			//��� ��������� ���� �� ����� ����, �������� ������
			handleMouseOver: function(){
				//����� setState �������������� ���������
				this.setState({select_hidden: 0});
			},
			//������ �������
			handleMouseOut: function(){
				this.setState({select_hidden: 1});
			},

			render: function(){//������ ���� � url ���������� � this.props.items
					var style='';
					if(this.state.select_hidden == 1){
						style='display_none';
					}
					return <li className='header_menu_li header_menu_item header_menu_li_width' onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} >����������� �������<br/>
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
		
		
		//��������� ����
		var MenuList = React.createClass({

		getInitialState: function(){
			return { focused: 0 };
		},

		clicked: function(index){

			// ���������� ����� ������� ���������
			// ������� ������ �� ��������������� ������� ����

			this.setState({focused: index});
		},

		render: function() {

			var self = this;

			// ����� map ��������� �� ������� ��������� ����,
			// � ��������� ������ � <li> ����������.

			return (
				<div>
					<ul className='header_menu_ul'>
						{/*������ ������� - Select �������*/}
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
	
	
//--------------��������� �����������-------------------------------

//����
		var Filter_Date1 = React.createClass({	
			getInitialState: function(){
				return { date_default: '08.06.2016' };
			},
			handleChange: function(e){
				var date1 = ValidateDate(e.target.value);
				this.setState({date_default: date1});
				//����������� ����������� ������� � ���� ����
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
				//����������� ����������� �� ���� ����
			},
			
			render: function(){
					return <input value={this.state.date_default} />;				
					
			}	
			
		});

//����� ����������		
		var Filter_supplier = React.createClass({	
			getInitialState: function(){
				return {selected_value: 0 };
			},
			handleChange: function(e){
				this.setState({ selected_value: e.target.value });
			//����������� ���������� �� ����������
				
			},
			render: function(){//������ ���������� �� ���� ��������� ����������� �� ������ �����������
					return <select value={this.state.selected_value} �lassName='filters_superSelect' onChange={this.handleChange}>
									<option value='0'>��� ����������</option>
									{ 
										this.props.items.map(function(l){
											return <option value={l.value}>{l.text}</option>
										}) 
									}
						   </select>;
						   
			}
		});
		
		/*
		//����� ��� �������� ��������� select	
		var SuperSelect = React.createClass({	
			getInitialState: function(){
				return {selected_value: 0 };
			},
			render: function(){
					return <select value={this.state.selected_value} �lassName='filters_superSelect' onChange={this.props.handleChange}>
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
				//����������� ���������� �� ����������
				
			},
					render: function(){
					return <SuperSelect selected_value= handleChange={handleSupChange} tout="��� ����������" items={GetDestinctSuppliers(EventList)}/>
						   
			}
		});
		*/
		
	
//--------------render �����������	--------------------------------
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
		