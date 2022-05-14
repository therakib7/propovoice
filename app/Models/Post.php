<?php
namespace Ncpi\Models;
 
use WP_Query; 

class Post {

    public static function by_type( $type = '' ) {
        // TODO: when call it check carefully otherwise custom post data chagned
        $query = new WP_Query([
            'post_type' => [$type],
            'post_status' => 'publish',
            'posts_per_page' => -1, 
        ]);

        $data = [];
        while( $query->have_posts() ) {
            $query->the_post();
            $data[ get_the_ID() ] = get_the_title();

        }
        wp_reset_postdata(); 
        return $data;
    }
 
}