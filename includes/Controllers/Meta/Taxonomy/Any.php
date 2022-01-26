<?php

namespace Ncpi\Controllers\Meta\Taxonomy;

use Ncpi\Helpers\Functions;

class Any {

    public function __construct() {  
        // TODO: when delete term meta remvoe it        
        
        //default taxonomy is: category
        $taxonomies = ncpi()->get_options('ncpi_general_settings', ['taxonomy', ['category']]); 

        foreach( $taxonomies as $taxonomy ) {
            add_action( 'create_' . $taxonomy, [$this, 'meta_create_edited'] ); 
            add_action( 'edited_' . $taxonomy, [$this, 'meta_create_edited'] );   
            add_action( $taxonomy . '_add_form_fields', [$this, 'add_form_fields'] ); 
            add_action( $taxonomy . '_edit_form_fields', [$this, 'edit_form_fields'] ); 
        }
    }    

    public function meta_create_edited( $term_id ) {  
        // Update the meta field.
        if ( isset( $_POST['ncpi_css'] ) ) {
            update_term_meta( $term_id, 'ncpi_css', sanitize_text_field( $_POST['ncpi_css'] ) );
        }

        if ( isset( $_POST['ncpi_js'] ) ) {
            update_term_meta( $term_id, 'ncpi_js', sanitize_text_field( $_POST['ncpi_js'] ) );
        }

        if ( isset( $_POST['ncpi_js_pos'] ) ) {
            update_term_meta( $term_id, 'ncpi_js_pos', sanitize_text_field( $_POST['ncpi_js_pos'] ) );
        }

        if ( isset( $_POST['ncpi_html'] ) ) {
            update_term_meta( $term_id, 'ncpi_html', ( $_POST['ncpi_html'] ) ); //TODO: check it later
        }

        if ( isset( $_POST['ncpi_html_pos'] ) ) {
            update_term_meta( $term_id, 'ncpi_html_pos', sanitize_text_field( $_POST['ncpi_html_pos'] ) );
        }
    }

    public function add_form_fields() {   
        ?>

        <?php if ( Functions::is_enable('css') ) { ?>
            <div class="form-field term-ncpi-css-wrap">
                <label for="ncpi-css"><?php esc_html_e( 'Custom CSS', 'propovoice' ); ?></label>
                <textarea name="ncpi_css" id="ncpi-css" rows="5" cols="40"></textarea>
                <p>
                    <?php  
                        printf(
                            '%s %s %s',
                            esc_html__( 'You don\'t need', 'propovoice' ),
                            '&lt;style&gt;&lt;/style&gt;',
                            esc_html__( 'tag here', 'propovoice' )
                        );
                    ?>
                </p>
            </div>
        <?php } ?>

        <?php if ( Functions::is_enable('js') ) { ?>
            <div class="form-field term-ncpi-js-wrap">
                <label for="ncpi-js"><?php esc_html_e( 'Custom JS', 'propovoice' ); ?></label>
                <textarea name="ncpi_js" id="ncpi-js" rows="5" cols="40"></textarea>
                <p>
                    <?php  
                        printf(
                            '%s %s %s',
                            esc_html__( 'You don\'t need', 'propovoice' ),
                            '&lt;script&gt;&lt;/script&gt;',
                            esc_html__( 'tag here', 'propovoice' )
                        );
                    ?>
                </p>
            </div>

            <div class="form-field term-ncpi-js-pos-wrap">
                <label for="ncpi-js-pos"><?php esc_html_e( 'Custom JS Position', 'propovoice' ); ?></label>
                    <select name="ncpi_js_pos" id="ncpi-js-pos" class="postform"> 
                    <?php foreach( Functions::js_pos_args() as $key => $value ) { ?>
                    <option value="<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $value ); ?></option> 
                    <?php } ?>
                </select>
                <p><?php esc_html_e( 'In which position you want to load your JS', 'propovoice' ); ?></p>
            </div>
        <?php } ?>

        <?php if ( Functions::is_enable('html') ) { ?>
            <div class="form-field term-ncpi-html-wrap">
                <label for="ncpi-html"><?php esc_html_e( 'Custom HTML', 'propovoice' ); ?></label>
                <textarea name="ncpi_html" id="ncpi-html" rows="5" cols="40"></textarea> 
            </div>

            <div class="form-field term-ncpi-html-pos-wrap">
                <label for="ncpi-html-pos"><?php esc_html_e( 'Custom HTML Position', 'propovoice' ); ?></label>
                    <select name="ncpi_html_pos" id="ncpi-html-pos" class="postform"> 
                    <?php foreach( Functions::html_pos_args() as $key => $value ) { ?>
                    <option value="<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $value ); ?></option> 
                    <?php } ?>
                </select>
                <p><?php esc_html_e( 'In which position you want to load your HTML', 'propovoice' ); ?></p>
            </div>
        <?php } ?>

        <?php        
    } 

    public function edit_form_fields( $term ) { ?>

        <?php if ( Functions::is_enable('css') ) { ?>
            <tr class="form-field term-ncpi-css-wrap">
                <th scope="row"><label for="ncpi-css"><?php esc_html_e( 'Custom CSS', 'propovoice' ); ?></label></th>
                <td><textarea name="ncpi_css" id="ncpi-css" rows="5" cols="50" class="large-text"><?php echo sanitize_text_field( get_term_meta( $term->term_id, 'ncpi_css', true ) ); ?></textarea>
                    <p class="ncpi-css">
                        <?php  
                            printf(
                                '%s %s %s',
                                esc_html__( 'You don\'t need', 'propovoice' ),
                                '&lt;style&gt;&lt;/style&gt;',
                                esc_html__( 'tag here', 'propovoice' )
                            );
                        ?>
                    </p>
                </td>
            </tr>
        <?php } ?>
        
        <?php if ( Functions::is_enable('js') ) { ?>
            <tr class="form-field term-ncpi-js-wrap">
                <th scope="row"><label for="ncpi-js"><?php esc_html_e( 'Custom JS', 'propovoice' ); ?></label></th>
                <td><textarea name="ncpi_js" id="ncpi-js" rows="5" cols="50" class="large-text"><?php echo sanitize_text_field( get_term_meta( $term->term_id, 'ncpi_js', true ) ); ?></textarea>
                    <p class="ncpi-js">
                        <?php  
                            printf(
                                '%s %s %s',
                                esc_html__( 'You don\'t need', 'propovoice' ),
                                '&lt;script&gt;&lt;/script&gt;',
                                esc_html__( 'tag here', 'propovoice' )
                            );
                        ?>
                    </p>
                </td>
            </tr>

            <tr class="form-field term-ncpi-js-pos-wrap">
                <th scope="row"><label for="ncpi-js-pos"><?php esc_html_e( 'Custom JS Position', 'propovoice' ); ?></label></th>
                <td>
                    <select name="ncpi_js_pos" id="ncpi-js-pos" class="postform">
                        <?php foreach( Functions::js_pos_args() as $key => $value ) { 
                            $js_pos_selected = ( get_term_meta( $term->term_id, 'ncpi_js_pos', true ) == $key ) ? 'selected': '';
                            ?>
                            <option <?php echo esc_attr( $js_pos_selected ); ?> value="<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $value ); ?></option> 
                        <?php } ?>
                    </select> 
                    <p class="ncpi-js-pos"><?php esc_html_e( 'In which position you want to load your JS', 'propovoice' ); ?></p>
                </td>
            </tr>
        <?php } ?>

        <?php if ( Functions::is_enable('html') ) { ?>
            <tr class="form-field term-ncpi-html-wrap">
                <th scope="row"><label for="ncpi-html"><?php esc_html_e( 'Custom HTML', 'propovoice' ); ?></label></th>
                <td><textarea name="ncpi_html" id="ncpi-html" rows="5" cols="50" class="large-text"><?php echo get_term_meta( $term->term_id, 'ncpi_html', true ); ?></textarea> 
                </td>
            </tr>

            <tr class="form-field term-ncpi-html-pos-wrap">
                <th scope="row"><label for="ncpi-html-pos"><?php esc_html_e( 'Custom HTML Position', 'propovoice' ); ?></label></th>
                <td>
                    <select name="ncpi_html_pos" id="ncpi-html-pos" class="postform">
                        <?php foreach( Functions::html_pos_args() as $key => $value ) { 
                            $html_pos_selected = ( get_term_meta( $term->term_id, 'ncpi_html_pos', true ) == $key ) ? 'selected': '';
                            ?>
                            <option <?php echo esc_attr( $html_pos_selected ); ?> value="<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $value ); ?></option> 
                        <?php } ?>
                    </select> 
                    <p class="ncpi-html-pos"><?php esc_html_e( 'In which position you want to load your HTML', 'propovoice' ); ?></p>
                </td>
            </tr>
        <?php } ?>

        <?php  
    } 
}
