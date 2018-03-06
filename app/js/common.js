$(function(){
    // footer add width block
    $('#footerMenuFirst').css('width', parseInt($('#footerMenuFirst').css('width')) + 20 + 'px');
    $('#footerMenuSecond').css('width', parseInt($('#footerMenuSecond').css('width')) + 20 + 'px');
    // main-menu
    $('.slimmenu').slimmenu(
    {
        resizeWidth: '1140',
        collapserTitle: '<div class="search-input-m"><input type="submit" value><input type="text" placeholder="Поиск по сайту"></div>',
        animSpeed:'slow',
        indentChildren: true,
        childrenIndenter: '&raquo;',
        easingEffect: 'easeOutCirc'
    });
    // dominance section
    $('.owl-carousel').owlCarousel(
    {
        loop:true,
        margin:60,
        stagePadding: 60,
        nav:true,
        navText : ["<",">"],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            768:{
                items:3
            }
        }
    });
    
    // sidebar menu demo

    $('.sidebar__tpl-parent > a').after('<i class="fas fa-angle-double-down"></i>');

    $('.sidebar__tpl-parent > i').click(openMenu);

    function openMenu(){
        if($(this).next().css('display') == 'block'){
            $(this).next().css('display', 'none');
            $(this).removeClass("fa-angle-double-up");
            $(this).addClass("fa-angle-double-down");

        }else{
            $(this).next().css('display', 'block');
            $(this).removeClass("fa-angle-double-down");
            $(this).addClass("fa-angle-double-up");
        }
    }

});
