/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

$(function () {
    //Smooth scrolling when click to nav
    $('.navbar-fixed-top li > a').click(function (e) {
        e.preventDefault();
        var curLink = $(this);
        var scrollPoint = $(curLink.attr('href')).position().top - 70;
        $('body,html').animate({
            scrollTop: scrollPoint
        }, 500);
    });

    //Resize Header on scrolling
    $(window).scroll(function () {
        //Navbar shrink when scroll down
        $(".navbar-default").toggleClass("navbar-shrink", $(this).scrollTop() > 50);

        //Get current scroll position
        var currentScrollPos = $(document).scrollTop();

        //Iterate through all node
        $('#top-nav > ul > li > a').each(function () {
            var curLink = $(this);
            var refElem = $(curLink.attr('href'));
            //Compare the value of current position and the every section position in each scroll
            if (refElem.position().top - 80 <= currentScrollPos && refElem.position().top + refElem.height() > currentScrollPos) {
                //Remove class active in all nav
                $('#top-nav > ul > li >').removeClass("active");
                //Add class active
                curLink.parent().addClass("active");
            }
            else {
                curLink.parent().removeClass("active");
            }
        });
    });

    // Highlight the top nav as scrolling occurs


    // Closes the Responsive Menu on Menu Item Click
    $(".navbar-collapse a").click(function () {
        $(".navbar-toggle:visible").click();
    });

    // Floating label headings for the contact form
    $("body").on("input propertychange", ".floating-label-form-group", function (e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function () {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function () {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

    //Button back to top handle
    backToTop();
});

function backToTop() {
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0,
        }, scroll_top_duration
		);
    });
};




