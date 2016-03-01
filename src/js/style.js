$(document).ready(function() {
    addTooltip();
    addCustomScroll.init();
    addDatapicker.init();
});





/* ======================FUNCTIONS======================== */




//включение подсказок
function addTooltip() {
    typeof $.fn.tooltip == 'function' && $('[data-toggle="tooltip"]').tooltip();
}


//Подключение стилизованного скролла
var addCustomScroll = {
    addCustomScrollYX: function() {
        $('.custom-scroll_yx').mCustomScrollbar({
            axis:"yx",
            theme:"dark",
            scrollInertia:100,
            advanced:{
                updateOnContentResize: true
            }
        });
    },
    addCustomScrollY: function() {
        $('.custom-scroll_y').mCustomScrollbar({
            axis:"y",
            theme:"dark",
            scrollInertia:100,
            advanced:{
                updateOnContentResize: true
            }
        });
    },
    addCustomScrollX: function() {
        $('.custom-scroll_x').mCustomScrollbar({
            axis:"x",
            theme:"dark",
            scrollInertia:100,
            advanced:{
                updateOnContentResize: true
            }
        });
    },
    init: function() {
        if ( typeof $.fn.mCustomScrollbar == 'function' ) {
            this.addCustomScrollYX();
            this.addCustomScrollX();
            this.addCustomScrollY();
        }
    }
};



//Подключение стилизованного календаря
var addDatapicker = {
    addDatapickerDefault: function() { //обычный
        $('.datepicker').datepicker({
            format: 'mm.dd.yyyy',
            autoclose: true,
            language: "ru",
            todayHighlight: true
        });
    },
    addDatapickerYear: function() { //только год
        $('.datepicker-year').datepicker({
            format: 'yyyy',
            viewMode: "years",
            minViewMode: "years",
            autoclose: true,
            language: "ru"
        });
    },
    init: function() {
        if ( typeof $.fn.datepicker == 'function' ) {
            this.addDatapickerDefault();
            this.addDatapickerYear();
        }
    }
};