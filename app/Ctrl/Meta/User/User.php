<?php

namespace Ndpi\Ctrl\Meta\User;

class User
{

    public function __construct()
    {
        add_action('show_user_profile', [$this, 'user_profile_fields']);
        add_action('edit_user_profile', [$this, 'user_profile_fields']);

        add_action('personal_options_update', [$this, 'profile_update_action']);
        add_action('edit_user_profile_update', [$this, 'profile_update_action']);
    }

    function user_profile_fields($user) {  
        ?>
        <h2><?php esc_html_e( 'Propovoice', 'propovoice' ); ?></h2> 
        <table class="form-table" role="presentation">
            <tbody> 
                <tr class="">
                    <th scope="row"><?php esc_html_e( 'Propovoice Member?', 'propovoice' ); ?></th>
                    <td>
                        <label for="ncpi_member">
                            <input name="ncpi_member" type="checkbox" id="ncpi_member" value="1" <?php echo ( isset($user->ncpi_member) && $user->ncpi_member ) ? ' checked="checked"' : ''; ?>>
                             <?php esc_html_e( 'Show member in Propovoice', 'propovoice' ); ?></label><br>
                    </td>
                </tr> 
            </tbody>
        </table>
    <?php  }

    function profile_update_action($user_id)
    {
        $ncpi_member = isset( $_POST['ncpi_member'] ) ? filter_var($_POST['ncpi_member'], FILTER_SANITIZE_NUMBER_INT) : false;
        update_user_meta($user_id, 'ncpi_member', $ncpi_member );
    }
}
