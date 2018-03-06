ymaps.ready(init);

function init() {

    // Создание экземпляра карты.
    var myMap = new ymaps.Map('map', {
            center: [50.443705, 30.530946],
            zoom: 14,
            controls: ['zoomControl']
        }, {
            searchControlProvider: 'yandex#search'
        }),
        // Контейнер для меню.
        menu = $('#map');
        
    for (var i = 0, l = groups.length; i < l; i++) {
        createMenuGroup(groups[i]);
    }

    function createMenuGroup (group) {
        // Пункт меню.
        var menuItem = $('<div class="map__menu"></div>'),
        // Коллекция для геообъектов группы.
            collection = new ymaps.GeoObjectCollection(null, { preset: group.style }),
        // Контейнер для подменю.
            submenu = $('<ul class="submenu"/>');

        // Добавляем коллекцию на карту.
        myMap.geoObjects.add(collection);
        // Добавляем подменю.
        menuItem
            .append(submenu)
            // Добавляем пункт в меню.
            .appendTo(menu)
            // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
            // .find('a')
            // .bind('click', function () {
            //     if (collection.getParent()) {
            //         myMap.geoObjects.remove(collection);
            //         submenu.hide();
            //     } else {
            //         myMap.geoObjects.add(collection);
            //         submenu.show();
            //     }
            // });
        for (var j = 0, m = group.items.length; j < m; j++) {
            createSubMenu(group.items[j], collection, submenu);
        }
    }

    function createSubMenu (item, collection, submenu) {
        // Пункт подменю.
        var submenuItem = $('<li><a href="#">' + '<span class="map__menu-metro">' + item.metro + '</span>' + '</a></li>'),
        // Создаем метку.
            placemark = new ymaps.Placemark(item.center, { balloonContent:  '<div class="ymap_content">' + 
                    '<div class="ymap_header">' + item.ytype + ' ' + item.name + '</div>' + 
                    '<div class="ymap_adr">' + 'Адрес: ' + '<b>' + item.content + '</b></div>' + 
                    '<div class="ymap_deliv">' + 'Срок доставки: ' + '<b>' + item.deliv + '</b></div>' +
                    '<div class="ymap_rejim">' + 'Режим работы: ' + '<b>' + item.time + '</b></div>' +
                    '<div class="ymap_price">' + 'Цена: ' + '<b>' + item.price + '</b></div>' +
                '</div>'});

        // Добавляем метку в коллекцию.
        collection.add(placemark);
        // Добавляем пункт в подменю.
        submenuItem
            .appendTo(submenu)
            // При клике по пункту подменю открываем/закрываем баллун у метки.
            .find('a')
            .bind('click', function () {
                if (!placemark.balloon.isOpen()) {
                    placemark.balloon.open();
                } else {
                    placemark.balloon.close();
                }
                return false;
            });

            // При открытии метки добавляем активный класс к соотвествующему пункту меню и убираем лишние классы, если
            // это необходимо, делаем зум карты и центрируем её
            placemark.events.add('balloonopen', function(e){
                console.log('blah class added');
                myMap.panTo(placemark.geometry.getCoordinates(),{
                    delay:0
                });
                myMap.setCenter(placemark.geometry.getCoordinates());
                myMap.setZoom(15);
                submenuItem
                    .addClass('active')
                    .siblings('.active')
                    .removeClass('active');
            });

            // При закрытии баллуна отдаляем карту и убираем активные классы у всего
            placemark.events.add('balloonclose', function(e){
                myMap.setZoom(10);
                myMap.setBounds(myMap.geoObjects.getBounds());
                submenuItem
                    .removeClass('active');
            });
    }

    // Добавляем меню в тэг BODY.
    menu.appendTo($('.wrapp-map'));
    // Выставляем масштаб карты чтобы были видны все группы.
    myMap.setBounds(myMap.geoObjects.getBounds());
}