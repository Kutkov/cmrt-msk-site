$('.slimmenu').slimmenu(
{
    resizeWidth: '1140',
    collapserTitle: '<div class="search-input-m"><input type="submit" value><input type="text" placeholder="Поиск по сайту"></div>',
    animSpeed:'slow',
    indentChildren: true,
    childrenIndenter: '&raquo;',
    easingEffect: 'easeOutCirc'
});

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