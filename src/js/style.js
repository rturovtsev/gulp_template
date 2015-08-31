$(document).ready(function() {
    addTooltip();
    addCustomScrollYX();
    addCustomScrollY();
    addCustomScrollX();
    addDatapicker();
    addDatapickerYear();
});







/* ======================FUNCTIONS======================== */


//= ../blocks/header/header.js



//включение подсказок
function addTooltip() {
    $('[data-toggle="tooltip"]').tooltip();
}


//Подключение стилизованного скролла
function addCustomScrollYX() {
    $('.custom-scroll_yx').mCustomScrollbar({
        axis:"yx",
        theme:"dark",
        scrollInertia:100,
        advanced:{
            updateOnContentResize: true
        }
    });
}
function addCustomScrollY() {
    $('.custom-scroll_y').mCustomScrollbar({
        axis:"y",
        theme:"dark",
        scrollInertia:100,
        advanced:{
            updateOnContentResize: true
        }
    });
}
function addCustomScrollX() {
    $('.custom-scroll_x').mCustomScrollbar({
        axis:"x",
        theme:"dark",
        scrollInertia:100,
        advanced:{
            updateOnContentResize: true
        }
    });
}


//стилизованный календарь обычный
function addDatapicker() {
    $('.datepicker').datepicker({
        format: 'mm.dd.yyyy',
        autoclose: true,
        language: "ru",
        todayHighlight: true
    });
}
//только год
function addDatapickerYear() {
    $('.datepicker-year').datepicker({
        format: 'yyyy',
        viewMode: "years",
        minViewMode: "years",
        autoclose: true,
        language: "ru"
    });
}