<?php
namespace Ndpv\Model; 

class Invoice {

    public function calcItemsTotal( $items, $item_tax ) {   
        $total = 0;
        foreach ( $items as $value ) {
            $tax_total = 0; 
            if ($item_tax && $value['tax']) {
				if ($value['tax_type'] == 'percent') {
					$tax_total += $value['price'] * ($value['tax'] / 100);
				} else {
					$tax_total += (float) $value['tax'];
				} 
			}
            $total += ( $value['qty'] * $value['price'] ) + $tax_total;
        }
        return $total;
    }   
    
    public function getTotalAmount( $invoice )
    {
        $items = $invoice['items'];
        $item_tax = isset( $invoice['item_tax'] ) ? $invoice['item_tax'] : false;
        $extra_field = $invoice['extra_field']; 
        $item_total = $this->calcItemsTotal( $items, $item_tax );  
        $total = $item_total; 
        
        foreach ( $extra_field as $val ) { 
            if ($val['val_type'] == 'percent') {
                if ($val['type'] == 'tax' || $val['type'] == 'fee') {
                    $total += $item_total * ($val['val'] / 100);
                } else {
                    $total -= $item_total * ($val['val'] / 100);
                }
            } else {
                if ($val['type'] == 'tax' || $val['type'] == 'fee') {
                    $total += (float) $val['val'];
                } else {
                    $total -= (float) $val['val'];
                }
            }
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
            'post_type' => 'ndpv_estinv',
            'post_status' => 'publish',
            'posts_per_page' => -1 
        ); 

        $args['meta_query'] = array(
            'relation' => 'AND'
        );  

        $args['meta_query'][] = array(
            array(
                'key'   => 'path',
                'value' => 'invoice'
            )
        );

        $args['meta_query'][] = array(
            array(
                'key'   => 'module_id',
                'value' => $id 
            )
        );

        $query = new \WP_Query($args);  
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

            $data['number']++;

        }
        wp_reset_postdata(); 

        return $data;
    }
 
}