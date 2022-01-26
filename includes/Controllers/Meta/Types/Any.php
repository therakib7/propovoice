<?php

namespace Ncpi\Controllers\Meta\Types;

use Ncpi\Helpers\Functions;
 
class Any {
  
    /**
     * Hook into the appropriate actions when the class is constructed.
     */
    public function __construct() {
        // TODO: when delete post permanently remvoe it
        add_action( 'add_meta_boxes', array( $this, 'add_meta_box' ) );
        add_action( 'save_post',      array( $this, 'save' ) );
    }
  
    /**
     * Adds the meta box container.
     */
    public function add_meta_box( $post_type ) { 

        if ( Functions::is_edit_page() ) {
			// global $post;
			// $post_type = $post->post_type;
            
            $post_types = ncpi()->get_options('ncpi_general_settings', ['post_type', ['post', 'page']]);   
			if ( in_array( $post_type, $post_types) ) {
				add_meta_box(
                    'ncpi_meta_box',
                    esc_html__( 'Custom CSS and JS', 'propovoice' ),
                    array( $this, 'meta_box_content' ),
                    $post_type,
                    'normal',
                    'low'
                );
			}
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
        ?>

        <?php if ( Functions::is_enable('css') ) { ?>
            <p class="ncpi-form-field meta-ncpi-css-wrap">
                <label for="ncpi-css"><strong><?php esc_html_e( 'Custom CSS', 'propovoice' ); ?></strong></label> 
                <textarea id="ncpi-css" style="width:100%; min-height:150px;" type="textarea" class="form-control" name="ncpi_css"><?php echo sanitize_text_field( get_post_meta( $post->ID, 'ncpi_css', true ) ); ?></textarea> 
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
            <p class="ncpi-form-field meta-ncpi-js-wrap">
                <label for="ncpi-js"><strong><?php esc_html_e( 'Custom JS', 'propovoice' ); ?></strong></label> 
                <textarea id="ncpi-js" style="width:100%; min-height:150px;" type="textarea" class="form-control" name="ncpi_js"><?php echo sanitize_text_field( get_post_meta( $post->ID, 'ncpi_js', true ) ); ?></textarea> 
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

            <p class="ncpi-form-field meta-ncpi-js-pos-wrap">
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
            <p class="ncpi-form-field meta-ncpi-html-wrap">
                <label for="ncpi-html"><strong><?php esc_html_e( 'Custom HTML', 'propovoice' ); ?></strong></label> 
                <textarea id="ncpi-html" style="width:100%; min-height:150px;" type="textarea" class="form-control" name="ncpi_html"><?php echo get_post_meta( $post->ID, 'ncpi_html', true ); ?></textarea>  
            </p> 

            <p class="ncpi-form-field meta-ncpi-html-pos-wrap">
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
     * Save the meta when the post is saved.
     *
     * @param int $post_id The ID of the post being saved.
     */
    public function save( $post_id ) {
  
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
  
        /* OK, it's safe for us to save the data now. */

        // Update the meta field. 
        if ( isset( $_POST['ncpi_css'] ) ) {
            update_post_meta( $post_id, 'ncpi_css', sanitize_text_field( $_POST['ncpi_css'] ) );
        }

        if ( isset( $_POST['ncpi_js'] ) ) {
            update_post_meta( $post_id, 'ncpi_js', sanitize_text_field( $_POST['ncpi_js'] ) );
        }

        if ( isset( $_POST['ncpi_js_pos'] ) ) {
            update_post_meta( $post_id, 'ncpi_js_pos', sanitize_text_field( $_POST['ncpi_js_pos'] ) );
        }

        if ( isset( $_POST['ncpi_html'] ) ) {
            update_post_meta( $post_id, 'ncpi_html', ( $_POST['ncpi_html'] ) ); //TODO: check it later
        }

        if ( isset( $_POST['ncpi_html_pos'] ) ) {
            update_post_meta( $post_id, 'ncpi_html_pos', sanitize_text_field( $_POST['ncpi_html_pos'] ) );
        }
    }
}
