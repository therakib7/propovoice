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
 
}