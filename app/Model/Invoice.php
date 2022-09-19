<?php

namespace Ndpv\Model;

class Invoice
{
    private $invoice = null; 
    
    public function itemsTotal()
    {
        $total = 0;
        $items = $this->invoice['items']; 
        foreach ($items as $item) {
            $total += ($item['qty'] * $item['price']);
        }
        return $total;
    }

    private function itemsTaxTotal()
    {
        $total = 0;
        $items = $this->invoice['items'];
        $item_tax = $this->invoice['item_tax'];

        foreach ($items as $item) {
            $tax_total = 0;
            if ($item_tax && $item['tax']) {
                if ($item['tax_type'] == 'percent') {
                    $tax_total += $item['price'] * ($item['tax'] / 100);
                } else {
                    $tax_total += (float) $item['tax'];
                }
            }
            $total += $tax_total;
        }
        return $total;
    }

    private function calcTax()
    {
        $total = 0;
        $item_total = $this->itemsTotal();
        $extra_field = $this->invoice['extra_field']; 
        foreach ($extra_field as $item) {
            if ($item['type'] == 'tax') {
                if ($item['val_type'] == 'percent') {
                    $tax_cal = $item['tax_cal'] ?? '';
                    if (!$tax_cal) {
                        $item_total += $this->itemsTaxTotal();
                    }
                    $total = $item_total * ($item['val'] / 100);
                } else {
                    $total = (float) $item['val'];
                }
            }
        }

        return $total;
    }

    private function calcFee()
    {
        $total = 0;
        $item_total = $this->itemsTotal();
        $extra_field = $this->invoice['extra_field']; 
        foreach ($extra_field as $item) {
            if ($item['type'] == 'fee') {
                if ($item['val_type'] == 'percent') {
                    $tax_cal = $item['tax_cal'] ?? '';
                    if (!$tax_cal) {
                        $item_total += $this->calcTax();
                    }
                    $total = $item_total * ($item['val'] / 100);
                } else {
                    $total = (float) $item['val'];
                }
            }
        }

        return $total;
    }

    private function calcDisc()
    {
        $total = 0;
        $item_total = $this->itemsTotal();
        $extra_field = $this->invoice['extra_field']; 
        foreach ($extra_field as $item) {
            if ($item['type'] == 'discount') {
                if ($item['val_type'] == 'percent') {
                    $tax_cal = $item['tax_cal'] ?? '';
                    if (!$tax_cal) {
                        $item_total += $this->calcTax();
                    }

                    $fee_cal = $item['fee_cal'] ?? '';
                    if (!$fee_cal) {
                        $item_total += $this->calcFee();
                    }

                    $total = $item_total * ($item['val'] / 100);
                } else {
                    $total = (float) $item['val'];
                }
            }
        }

        return $total;
    } 

    public function getTotalAmount($invoice)
    {
        $this->invoice = $invoice;

        $total = $this->itemsTotal(); 
        $item_tax = $this->invoice['item_tax'];
        if ($item_tax) {
            $total += $this->itemsTaxTotal();
        }
        $total += $this->calcTax();
        $total += $this->calcFee();
        $total -= $this->calcDisc();
        return $total; 
    }

    public function project_invoice($id)
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
            if ($query_data['total']) {
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
