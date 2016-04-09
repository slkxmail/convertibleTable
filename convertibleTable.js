ConvertibleTable = {
    settings: {
        container: '#convertibleTable'
        ,tableHeader: '.tableHead'
        ,tableBody: '.tableBody'
        ,rowTitleArr: []
        ,minWidth: 770
    }

    ,init: function (settingsList) {
        var currentObj = this;

        if (settingsList != undefined) {
            currentObj.settings = $.extend(currentObj.settings, settingsList);
        }
//                console.log(currentObj.settings);
        // Записать в массив все заголовки колонок
        $(currentObj.settings.container + ' ' + currentObj.settings.tableHeader).find('.colTitle').each(function(){
            currentObj.settings.rowTitleArr.push($(this).html());
        });

        if($(window).outerWidth(true) <= currentObj.settings.minWidth) {
            currentObj.makeNarrow();
        }

        $(window).on( "resize", function(){
            if($(window).outerWidth(true) <= currentObj.settings.minWidth) {
                currentObj.makeNarrow();
            } else {
                currentObj.makeNarrowCancel();
            }
        });
    }
    ,makeNarrow: function(){
        var currentObj = this;
        if(!$(currentObj.settings.container).hasClass('narrowTable')) {
            // Спрятать заголовок
            $(currentObj.settings.container + ' ' + currentObj.settings.tableHeader).hide();
            $(currentObj.settings.container).addClass('narrowTable');

            // Перебираем все строки таблицы
            $(currentObj.settings.container + ' ' + currentObj.settings.tableBody).find('.tr').each(function () {
                currentObj.makeNarrowRow(this);
            });
        }
    }
    ,makeNarrowRow: function(rowObj) {
        var currentObj = this;

        if($(currentObj.settings.container).hasClass('narrowTable')) {
            var i = 0;
            $(rowObj).children('.td').each(function(){
                // Заголовок строки сделать на новой строке
                var rowSubTitle = '<div class="td rowSubTitle">'+currentObj.settings.rowTitleArr[i]+'</div>'
                if($(this).hasClass('rowTitle')) {
                    // Сделать заголовок строки отдельной строкой
                    $(this).addClass('rowTitleNarrow');
                }else {
                    $(this).before(rowSubTitle);
                    $(this).addClass('narrowCell');
                    //                        $(this).css('width', '50%');
                    i++;
                }
            });

        }
    }

    ,makeNarrowCancel: function(){
        var currentObj = this;
        // Спрятать заголовок
        $(currentObj.settings.container + ' ' + currentObj.settings.tableHeader).show();
        $(currentObj.settings.container).removeClass('narrowTable');

        // Удалить класс rowTitleNarrow
        $(currentObj.settings.container + ' ' + currentObj.settings.tableBody).find('.rowTitleNarrow').each(function(){
            $(this).removeClass('rowTitleNarrow');
        });
        // Удалить класс narrowCell
        $(currentObj.settings.container + ' ' + currentObj.settings.tableBody).find('.narrowCell').each(function(){
            $(this).removeClass('narrowCell');
        });

        // Удалить подзаголовок с классом rowSubTitle
        $(currentObj.settings.container + ' ' + currentObj.settings.tableBody).find('.rowSubTitle').each(function(){
            $(this).remove();
        });

    }
};

