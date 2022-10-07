(function($) {
    $(function() {
        var modal = $( '.pv-feedback-modal' );
        var deactivateLink = '';

        // Open modal
        $('#the-list').on('click', 'a.ndpv-deactivate-link', function(e) {
            e.preventDefault(); 
            modal.addClass('pv-show');
            deactivateLink = $(this).attr('href'); 
        });

        // Close modal; Cancel
        modal.on('click', '.pv-close', function(e) {
            e.preventDefault();
            modal.removeClass('pv-show');
        }); 

        // Reason change
        modal.on('click', 'input[type="radio"]', function () {
            var parent = $(this).parents('.pv-field-radio');
            $('.ndpv-feedback-text, .ndpv-feedback-alert').hide();

            var val = $(this).val(); 
            parent.next().show(); 
        });

        // Submit response
        modal.on('click', 'button', function(e) {
            e.preventDefault();

            var button = $(this); 

            var submit = button.hasClass('pv-feedback-submit'); 
            
            if ( button.hasClass('disabled') ) {
                return;
            }

            var $radio = $( 'input[type="radio"]:checked', modal );

            var reason_key = ( 0 === $radio.length ) ? 'none' : $radio.val();
 
            var $input = $('.ndpv-feedback-text input[name="reason_'+reason_key+'"]', modal); 
 
            $.ajax({
                url: ndpv.ajaxurl,
                type: 'POST',
                data: {
                    action: 'ndpv_deactivate_feedback',
                    submit,
                    reason_key: reason_key,
                    reason: ( 0 !== $input.length ) ? $input.val().trim() : ''
                },
                beforeSend: function() {
                    button.addClass('disabled');
                    button.text('Processing...');
                },
                complete: function() {
                    // window.location.href = deactivateLink;
                },
                error: function() { // if error occured
                    // window.location.href = deactivateLink;
                },
            });
        });
    });
} (jQuery));