<?php
namespace Ncpi\Models;
 
use WP_Query; 

class Invoice {

    public function calcItemsTotal( $items ) {   
        $total = 0;
        foreach ( $items as $value ) {
            $total += ( $value['qty'] * $value['price'] );
        }
        return $total;
    }
    
    public function calcExtraTotal( $total, $type, $value ) {  
        if ( $type == 'percent' ) {
            return $total * ( $value / 100);
        } else {
            return $value;
        }
    }  
    
    public function getTotalAmount( $invoice )
    {
        $items = $invoice['items'];
        $extra_field = $invoice['extra_field']; 
        $item_total = $this->calcItemsTotal( $items );  
        $total = $item_total;
        
        if ( isset( $extra_field['tax'] ) ) {
            $total += $this->calcExtraTotal($item_total, $extra_field['tax'], $invoice['tax']); 
        }
    
        if ( isset( $extra_field['discount'] ) ) {
            $total -= $this->calcExtraTotal($item_total, $extra_field['discount'], $invoice['discount']); 
        } 
    
        if ( isset( $extra_field['late_fee'] ) ) {
            $total += $this->calcExtraTotal($item_total, $extra_field['late_fee'], $invoice['late_fee']);
        }  
    
        return $total; 
    }

    public function project_invoice( $id )
    {
        $data = [
            'total' => 0,
            'paid' => 0,
            'due' => 0,
            'number' => 0
        ];  

        $args = array(
            'post_type' => 'ncpi_estvoice',
            'post_status' => 'publish',
            'posts_per_page' => -1 
        ); 

        $args['meta_query'] = array(
            'relation' => 'AND'
        );  

        $args['meta_query'][] = array(
            array(
                'key'   => 'module_id',
                'value' => $id 
            )
        );

        $query = new WP_Query($args);  
        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();  

            $query_data['total'] = get_post_meta($id, 'total', true);
            if ( $query_data['total'] ) {
                $data['total'] += $query_data['total'];
            }

            $query_data['status'] = get_post_meta($id, 'status', true);
            if ($query_data['status'] == 'paid') {
                $data['paid'] += $query_data['total'];
            } else {
                $data['due'] += $query_data['total'];
            }

            /* $query_data['due'] = get_post_meta($id, 'due', true);
            if ( $query_data['due'] ) { 
                $data['due'] += $query_data['due'];
            } */

            $data['number']++;

        }
        wp_reset_postdata(); 

        return $data;
    }
 
}