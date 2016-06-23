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
        var scrollPoint = $(curLink.attr('href')).position().top;
        $('body,html').animate({
            scrollTop: scrollPoint
        }, 500);
    });

    //Resize Header on scrolling
    $(window).scroll(function () {
        //Method 2: Using toggleClass
        $(".navbar-default").toggleClass("navbar-shrink", $(this).scrollTop() > 50)
    });

    // Highlight the top nav as scrolling occurs
    $("body").scrollspy({
        target: ".navbar-fixed-top"
    });

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
});



