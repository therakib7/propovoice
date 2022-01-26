<?php

namespace Ncpi\Controllers\Meta\Types;

use Ncpi\Helpers\Functions; 

class Code {
  
    /**
     * Hook into the appropriate actions when the class is constructed.
     */
    public function __construct() {
        // TODO: when delete post permanently remvoe it
        add_action( 'add_meta_boxes', array( $this, 'add_meta_box' ) );
        add_action( 'save_post',      array( $this, 'save' ), 10, 2 );
    }
  
    /**
     * Adds the meta box container.
     */
    public function add_meta_box( $post_type ) {  

        if ( Functions::is_edit_page() ) {
			add_meta_box(
                'ncpi_meta_box',
                esc_html__( 'Custom CSS, JS and HTML', 'propovoice' ),
                array( $this, 'meta_box_content' ),
                'ncpi_code',
                'normal',
                'default'
            );

            add_meta_box(
                'ncpi_meta_box_options',
                esc_html__( 'Options', 'propovoice' ),
                array( $this, 'meta_box_options_content' ),
                'ncpi_code',
                'side',
                'default'
            );
		}
    } 
  
    /**
     * Render Meta Box content.
     *
     * @param WP_Post $post The post object.
     */
    public function meta_box_content( $post ) {
  
        // Add an nonce field so we can check for it later.
        wp_nonce_field( 'ncpi_meta_box', 'ncpi_nonce' );    
        
        $get_types = get_post_meta( $post->ID, 'ncpi_type', true );
        if ( ! $get_types ) {
            $get_types = ['css'];
        }
        ?> 

        <p class="ncpi-form-field meta-ncpi-type-wrap">
            <label for="ncpi-css"><strong><?php esc_html_e( 'Code Type', 'propovoice' ); ?></strong></label><br> 
            <?php 
                $types = []; 
                $enable_types = Functions::enable_type();

                if ( in_array('css', $enable_types) ) {
                    $types['css'] = esc_html__('Custom CSS', 'propovoice');
                }
                
                if ( in_array('js', $enable_types) ) {
                    $types['js'] = esc_html__('Custom JS', 'propovoice');
                }
                
                if ( in_array('html', $enable_types) ) {
                    $types['html'] = esc_html__('Custom HTML', 'propovoice');
                }

                foreach( $types as $key => $value ) {
                    $chceked = in_array($key, $get_types) ? 'checked': '';
                    printf(
                        '<label for="ncpi_type-%1$s" class="" style="margin-right: 5px;">
                            <input class="" type="checkbox" name="ncpi_type[]" id="ncpi_type-%1$s" value="%1$s" %3$s>
                            %2$s														                        
                        </label>',
                        $key,
                        $value,
                        $chceked
                    );
                }
            ?> 
        </p>

        <?php if ( Functions::is_enable('css') ) { ?>
            <p class="ncpi-form-field meta-ncpi-css-wrap"  style="<?php echo ! in_array('css', $get_types) ? 'display: none;': ''; ?>">
                <label for="ncpi-css"><strong><?php esc_html_e( 'Custom CSS', 'propovoice' ); ?></strong></label> 
                <textarea id="ncpi-css" style="width:100%; min-height:150px;" type="textarea" class="form-control" name="ncpi_css"><?php 
                    $css = get_post_meta( $post->ID, 'ncpi_css', true );
                    if ( $css ) {
                        echo sanitize_text_field( $css );
                    } else {
echo '
/* Add your CSS code here.

For example:
.example {
    color: red;
}

For brushing up on your CSS knowledge, check out http://www.w3schools.com/css/css_syntax.asp

End of comment */';
                    }
                ?>
                </textarea> 
                <span>
                    <?php  
                        printf(
                            '%s %s %s',
                            esc_html__( 'You don\'t need', 'propovoice' ),
                            '&lt;style&gt;&lt;/style&gt;',
                            esc_html__( 'tag here', 'propovoice' )
                        );
                    ?>
                </span>
            </p>  
        <?php } ?>
        
        <?php if ( Functions::is_enable('js') ) { ?>
            <p class="ncpi-form-field meta-ncpi-js-wrap" style="<?php echo ! in_array('js', $get_types) ? 'display: none;': ''; ?>">
                <label for="ncpi-js"><strong><?php esc_html_e( 'Custom JS', 'propovoice' ); ?></strong></label> 
                <textarea id="ncpi-js" style="width:100%; min-height:150px;" type="textarea" class="form-control" name="ncpi_js"><?php 
                    $js = get_post_meta( $post->ID, 'ncpi_js', true );
                    if ( $js ) {
                        echo sanitize_text_field( $js );
                    } else {
echo '
/* Add your JavaScript code here.

If you are using the jQuery library, then don\'t forget to wrap your code inside jQuery.ready() as follows:

jQuery(document).ready(function( $ ){
    // Your code in here
}); 

If you want to link a JavaScript file that resides on another server (similar to
<script src="https://example.com/js-file.js"></script>), then please use it
in "Custom HTML" field, as this is a HTML code that links a JavaScript file.

End of comment */ ';
                    }
                ?>
                </textarea> 
                <span>
                    <?php  
                        printf(
                            '%s %s %s',
                            esc_html__( 'You don\'t need', 'propovoice' ),
                            '&lt;script&gt;&lt;/script&gt;',
                            esc_html__( 'tag here', 'propovoice' )
                        );
                    ?>
                </span>
            </p> 

            <p class="ncpi-form-field meta-ncpi-js-pos-wrap" style="<?php echo ! in_array('js', $get_types) ? 'display: none;': ''; ?>">
                <label for="ncpi-js-pos"><strong><?php esc_html_e( 'Custom JS Position', 'propovoice' ); ?></strong></label><br> 
                <select name="ncpi_js_pos" id="ncpi-js-pos" class="postform">
                    <?php foreach( Functions::js_pos_args() as $key => $value ) { 
                        $js_pos_selected = ( get_post_meta( $post->ID, 'ncpi_js_pos', true ) == $key ) ? 'selected': '';
                        ?>
                        <option <?php echo esc_attr( $js_pos_selected ); ?> value="<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $value ); ?></option> 
                    <?php } ?>
                </select><br>
                <span><?php esc_html_e( 'In which position you want to load your JS', 'propovoice' ); ?></span>
            </p> 
        <?php } ?>

        <?php if ( Functions::is_enable('html') ) { ?>
            <p class="ncpi-form-field meta-ncpi-html-wrap" style="<?php echo ! in_array('html', $get_types) ? 'display: none;': ''; ?>">
                <label for="ncpi-html"><strong><?php esc_html_e( 'Custom HTML', 'propovoice' ); ?></strong></label> 
                <textarea id="ncpi-html" style="width:100%; min-height:150px;" type="textarea" class="form-control" name="ncpi_html"><?php 
                    $html = get_post_meta( $post->ID, 'ncpi_html', true );
                    if ( $html ) {
                        echo wp_kses_post( $html );
                    } else {
echo '
<!-- Add HTML code here

For example, you can use the following code for loading the jQuery library from Google CDN:
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

or the following one for loading the Bootstrap library from jsDelivr:
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

-- End of the comment -->';
                    }
                ?>
                </textarea>
            </p> 

            <p class="ncpi-form-field meta-ncpi-html-pos-wrap" style="<?php echo ! in_array('html', $get_types) ? 'display: none;': ''; ?>">
                <label for="ncpi-html-pos"><strong><?php esc_html_e( 'Custom HTML Position', 'propovoice' ); ?></strong></label><br> 
                <select name="ncpi_html_pos" id="ncpi-html-pos" class="postform">
                    <?php foreach( Functions::html_pos_args() as $key => $value ) { 
                        $html_pos_selected = ( get_post_meta( $post->ID, 'ncpi_html_pos', true ) == $key ) ? 'selected': '';
                        ?>
                        <option <?php echo esc_attr( $html_pos_selected ); ?> value="<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $value ); ?></option> 
                    <?php } ?>
                </select><br>
                <span><?php esc_html_e( 'In which position you want to load your HTML', 'propovoice' ); ?></span>
            </p> 
        <?php } ?>
        <?php
    }

    /**
     * Render Meta Box content.
     *
     * @param WP_Post $post The post object.
     */
    public function meta_box_options_content( $post ) {
  
        // Add an nonce field so we can check for it later.
        // wp_nonce_field( 'ncpi_meta_box', 'ncpi_nonce' );   
        $get_location = get_post_meta( $post->ID, 'ncpi_location', true );
        if ( ! $get_location ) {
            $get_location ='frontend';
        }
        ?>  
        <p class="ncpi-form-field meta-ncpi-location-wrap">
            <label for="ncpi-css"><strong><?php esc_html_e( 'Location', 'propovoice' ); ?></strong></label><br> 
            <?php
                $location = [
                    'frontend' => esc_html__('Frontend', 'propovoice'),
                    'admin' => esc_html__('Admin', 'propovoice')  
                ]; 
                foreach( $location as $key => $value ) {
                    $chceked = $key ==  $get_location ? 'checked': '';
                    printf(
                        '<label for="ncpi_location-%1$s" class="" style="margin-right: 5px;">
                            <input class="" type="radio" name="ncpi_location" id="ncpi_location-%1$s" value="%1$s" %3$s>
                            %2$s														                        
                        </label><br>',
                        $key,
                        $value,
                        $chceked
                    );
                }
            ?> 
        </p>

        <?php
            $get_page = get_post_meta( $post->ID, 'ncpi_page', true );
            if ( ! $get_page ) {
                $get_page = 'all';
            }
        ?>  
        <p class="ncpi-form-field meta-ncpi-page-wrap" style="<?php echo ( 'frontend' != $get_location ) ? 'display: none;': ''; ?>">
            <label for="ncpi-css"><strong><?php esc_html_e( 'Specific Page', 'propovoice' ); ?></strong></label><br> 
            <?php
                $pages = [
                    'all' => esc_html__('All Pages', 'propovoice'),
                    'home' => esc_html__('Home Page', 'propovoice'),  
                    'single' => esc_html__('Single Page', 'propovoice'),  
                    'archive' => esc_html__('Archive Page', 'propovoice'),  
                    '404' => esc_html__('404 Page', 'propovoice'),   
                ]; 
                echo '<select name="ncpi_page">';
                foreach( $pages as $key => $value ) {
                    $chceked = $key == $get_page ? 'selected': '';
                    printf(
                        '<option value="%1$s" %3$s>%2$s</option>',
                        $key,
                        $value,
                        $chceked
                    );
                }
                echo '</select>';
            ?> 
        </p> 
        <?php
        $get_post_type = get_post_meta( $post->ID, 'ncpi_post_type', true );
        if ( ! $get_post_type ) {
            $get_post_type = ['post'];
        }
        ?>  
        <p class="ncpi-form-field meta-ncpi-post_type-wrap" style="<?php echo ( 'frontend' != $get_location ) ? 'display: none;': 'display: none;'; ?>">
            <label for="ncpi-css"><strong><?php esc_html_e( 'Specific Post Type', 'propovoice' ); ?></strong></label><br> 
            <?php
                $post_type = Functions::getPostTypes(false, false); 
                foreach( $post_type as $key => $value ) {
                    $chceked = in_array($key, $get_post_type) ? 'checked': '';
                    printf(
                        '<label for="ncpi_post_type-%1$s" class="" style="margin-right: 5px;">
                            <input class="" type="checkbox" name="ncpi_post_type[]" id="ncpi_post_type-%1$s" value="%1$s" %3$s>
                            %2$s														                        
                        </label><br>',
                        $key,
                        $value,
                        $chceked
                    );
                }
            ?> 
        </p>

        <p class="ncpi-form-field meta-ncpi-all-post_type-wrap meta-ncpi-post_type_post" style="<?php echo ( 'frontend' != $get_location ) ? 'display: none;': 'display: none;'; ?>">
            <label for="ncpi-css"><strong><?php esc_html_e( 'Specific Posts', 'propovoice' ); ?></strong></label><br> 
            
        </p>

        <p class="ncpi-form-field meta-ncpi-priority-wrap">
            <label for="ncpi-priority"><strong><?php esc_html_e( 'Priority', 'propovoice' ); ?></strong></label><br> 
            <input id="ncpi-priority" type="number" class="form-control" name="menu_order" value="<?php echo absint( get_post_field( 'menu_order', $post->ID, true ) ); ?>"> 
        </p>
        <?php
    }

    /**
     * Save the meta when the post is saved.
     *
     * @param int $post_id The ID of the post being saved.
     */
    public function save( $post_id, $post ) {
  
        /*
         * We need to verify this came from the our screen and with proper authorization,
         * because save_post can be triggered at other times.
         */
  
        // Check if our nonce is set.
        if ( ! isset( $_POST['ncpi_nonce'] ) ) {
            return $post_id;
        }
  
        $nonce = sanitize_text_field( $_POST['ncpi_nonce'] );
  
        // Verify that the nonce is valid.
        if ( ! wp_verify_nonce( $nonce, 'ncpi_meta_box' ) ) {
            return $post_id;
        }
  
        /*
         * If this is an autosave, our form has not been submitted,
         * so we don't want to do anything.
         */
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return $post_id;
        }
  
        // Check the user's permissions.
        if ( 'page' == $_POST['post_type'] ) {
            if ( ! current_user_can( 'edit_page', $post_id ) ) {
                return $post_id;
            }
        } else {
            if ( ! current_user_can( 'edit_post', $post_id ) ) {
                return $post_id;
            }
        }

        if ('ncpi_code' != $post->post_type) {
			return $post_id;
		}
  
        /* OK, it's safe for us to save the data now. */

        // Update the meta field. 
        if ( isset( $_POST['ncpi_type'] ) ) {
            update_post_meta( $post_id, 'ncpi_type', array_map('sanitize_text_field', $_POST['ncpi_type'] ) );
        }

        $ncpi_type = isset( $_POST['ncpi_type'] ) ? $_POST['ncpi_type'] : [];

        if ( isset( $_POST['ncpi_css'] ) && in_array('css', $ncpi_type ) ) {
            update_post_meta( $post_id, 'ncpi_css', sanitize_text_field( $_POST['ncpi_css'] ) );
        } else {
            delete_post_meta( $post_id, 'ncpi_css' );
        }

        if ( isset( $_POST['ncpi_js'] ) && in_array('js', $ncpi_type ) ) {
            update_post_meta( $post_id, 'ncpi_js', sanitize_text_field( $_POST['ncpi_js'] ) );
        } else {
            delete_post_meta( $post_id, 'ncpi_js' );
        }

        if ( isset( $_POST['ncpi_js_pos'] ) && in_array('js', $ncpi_type ) ) {
            update_post_meta( $post_id, 'ncpi_js_pos', sanitize_text_field( $_POST['ncpi_js_pos'] ) );
        }

        if ( isset( $_POST['ncpi_html'] ) && in_array('html', $ncpi_type ) ) {
            update_post_meta( $post_id, 'ncpi_html', ( $_POST['ncpi_html'] ) ); 
        } else {
            delete_post_meta( $post_id, 'ncpi_html' );
        }

        if ( isset( $_POST['ncpi_html_pos'] ) && in_array('html', $ncpi_type ) ) {
            update_post_meta( $post_id, 'ncpi_html_pos', sanitize_text_field( $_POST['ncpi_html_pos'] ) );
        }

        //option meta 
        if ( isset( $_POST['ncpi_location'] ) ) {
            update_post_meta( $post_id, 'ncpi_location', sanitize_text_field( $_POST['ncpi_location'] ) );
        }

        if ( isset( $_POST['ncpi_page'] ) ) {
            update_post_meta( $post_id, 'ncpi_page', sanitize_text_field( $_POST['ncpi_page'] ) );
        }
        
        if ( isset( $_POST['ncpi_post_type'] ) ) {
            update_post_meta( $post_id, 'ncpi_post_type', array_map('sanitize_text_field', $_POST['ncpi_post_type'] ) );
        } 
    }
}
