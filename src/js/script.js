// 来个闭包，免得污染全局变量。
(function(require) {

// 初始化边栏展开收起功能。
function initAsideToggle($) {
    const layout = $('.a-Layout');

    $('#aside-toggler').on('click', function() {
        const $i = $('>i', this); 
        const isFolded = $i.hasClass('fa-indent');

        if (isFolded) {
            layout.removeClass('a-Layout--folded');
            $i.removeClass('fa-indent').addClass('fa-dedent');
        } else {
            layout.addClass('a-Layout--folded');
            $i.removeClass('fa-dedent').addClass('fa-indent');
        }
    });
}

// 初始化导航展开效果。
function initNav($) {
    $('.a-AsideNav-itemArrow').click(function() {
        const $item = $(this).closest('.a-AsideNav-item');
        const isOpen = $item.hasClass('is-open');

        if (isOpen) {
            $item.removeClass('is-open');
        } else {
            $item.addClass('is-open');
        }
        return false;
    });
}

// 也可以通过其他方式加载 jQuery
require(["jquery"], function($) {
    initAsideToggle($);
    initNav($);
});


})(amisRequire);