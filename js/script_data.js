//data for page-event
		var logo_url = 'https://www.mont.com/';
		var logo_img_src = 'img/logo1.png';
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
		
		
		
		//status - icon
		var statusIcon = {};
		statusIcon['Регистрация открыта'] = 'open.svg';
		statusIcon['Я иду'] = 'go.svg';
		statusIcon['На рассмотрении'] = 'wait.svg';
		statusIcon['Отклонена'] = 'no.svg';
		
		var statusStyle = {};
		statusStyle['Регистрация открыта'] = 'style-green';
		statusStyle['Я иду'] = 'style-green';
		statusStyle['На рассмотрении'] = 'style-gray';
		statusStyle['Отклонена'] = 'style-red';
		
				
		var EventList=[
		{
			event_date: '24.07.2016', 
			subj: 'APM мониторинг приложений', 
			descripion: 'Решения по управлению производительностью приложений HP Application Performance Management (APM) позволяют в режиме реального времени устранять любые проблемы, связанные с локальными, облачными и мобильными приложениями. Решения HP APM доступны в различных вариантах – вы можете выбрать модель, которая оптимально подходит для ваших целей. ', 
			state: 'Регистрация открыта', 
			event_type: 'Конференция', 
			city: 'Москва', 
			supplier: ['Microsoft', 'Лаборатоия Касперского', 'Autodesc'],
			banner: 'adobe.png'
		},		
		{
			event_date: '28.07.2016', 
			subj: 'Семинар BE - защита виртуальной инфраструктуры', 
			descripion: 'Решения по управлению производительностью приложений HP Application Performance Management (APM) позволяют в режиме реального времени устранять любые проблемы, связанные с локальными, облачными и мобильными приложениями.', 
			state: 'Я иду', 
			event_type: 'Конференция', 
			city: 'Санкт-Петербург', 
			supplier: ['Смарт лайн инк', 'Autodesc'],
			banner: 'mics.png'			
		},
		{
			event_date: '19.08.2016', 
			subj: 'Будильник для Android в FireMonkey', 
			descripion: 'Компания Embarcadero проводит в июне-июле 2016 года бесплатные вебинары. Приглашаем всех интересующихся разработкой настольных, корпоративных систем и приложений для мобильных устройств. Чтобы принять участие нужно зарегистрироваться.', 
			state: 'На рассмотрении', 
			event_type: 'Вебинар', 
			city: 'Комсомольск-на-Амуре', 
			supplier: ['Microsoft'], 
			banner: 'eset.png'
		},
		{
			event_date: '19.09.2016', 
			subj: 'Будильник для Android в FireMonkey', 
			descripion: 'Компания Embarcadero проводит в июне-июле 2016 года бесплатные вебинары. Приглашаем всех интересующихся разработкой настольных, корпоративных систем и приложений для мобильных устройств. Чтобы принять участие нужно зарегистрироваться.', 
			state: 'Отклонена', 
			event_type: 'Вебинар', 
			city: 'Москва', 
			supplier: ['Microsoft'], 
			banner: 'eset.png'
		},
		];
		