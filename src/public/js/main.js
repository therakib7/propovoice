(function ($) {
    "use strict";

    let ncpiApp = {

        /**
         * Alert box
         * @since 1.0.0
         * @return {mixed} 
         */
        alertBox: function () {

        },

        /**
         * Library support
         * @since 1.0.0
         * @return {mixed} 
         */
        libSupport: function () {

        },
        /**
         * Conditional meta field
         * @since 1.0.0
         * @return {mixed} 
         */
        conditionalField: function () {  
            
        }, 

        /**
         * Ajax functions
         * @since 1.0.0
         * @return {mixed} 
         */
        ajaxEvent: function () { 

            $('#ncpi-shortlist-load-mroe').on('click', function (e) {
                e.preventDefault(); 

                $.ajax({
                    url: ncpi.ajaxurl,
                    data: {
                        action: 'ncpi_shortlist_filter',
                        nonce: ncpi.nonce, 
                    },
                    type: 'POST',
                    dataType: "json",
                    beforeSend: function () { },
                    success: function (resp) {
                        if (resp.success) {
                            current_page++;
                            if (current_page >= max_page) {
                                $('#ncpi-shortlist-load-mroe').hide();
                            }
                            $('#ncpi-shortlist-load-mroe').attr('data-current-page', current_page);
                            $('#ncpi-category-project').append(resp.data);
                        }
                    }
                });
            });
        },

        /* ---------------------------------------------
         function initialize
         --------------------------------------------- */
        initialize: function () {
            ncpiApp.alertBox();
            ncpiApp.libSupport();
            ncpiApp.conditionalField();
            ncpiApp.ajaxEvent();
        }
    };
    /* ---------------------------------------------
     Document ready function
     --------------------------------------------- */
    $(function () {
        ncpiApp.initialize();
    });

    $(window).on('load', function () {

    });
})(jQuery);