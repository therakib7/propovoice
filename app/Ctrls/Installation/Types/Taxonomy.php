<?php

namespace Ncpi\Ctrls\Installation\Types; 

class Taxonomy {

    public function __construct() {  
        $this->create_custom_taxonomy();
    }   

    function create_custom_taxonomy() {  
        //when install set workplace for all previous data
        
        //Workplace pro 
        $data = array(
            'post_type'     => 'ndpi_workplace',
            'post_title'    => 'Workplace',
            'post_content'  => '',
            'post_status'   => 'publish', //TODO: is it public or private for workplace
            'post_author'   => get_current_user_id()
        );
        $post_id = wp_insert_post($data);

        if ( ! is_wp_error( $post_id ) ) {
            update_option( 'ndpi_workplace_default', $post_id );
        }

        //lead
        $lead_level = [
            'Hot',
            'Warm',
            'Cold'
        ];  
        foreach( $lead_level as $level ) {
            wp_insert_term(
                $level,   // the term 
                'ndpi_lead_level', // the taxonomy 
            );
        } 

        //deal 
        $temp_pipeline = [
            'Sales Pipeline' 
        ];  
        foreach( $temp_pipeline as $pipeline ) {
            $add_pipeline = wp_insert_term(
                $pipeline,   // the term 
                'ndpi_deal_pipeline', // the taxonomy 
            );

            $temp_stage = [
                'Opportunity',
                'Contracting',
                'Engaging',
                'Proposing',
                'Deal Closing',
            ];  
            foreach( $temp_stage as $stage ) {
                $stage = wp_insert_term(
                    $stage,   // the term 
                    'ndpi_deal_stage', // the taxonomy 
                ); 
    
                if ( ! is_wp_error( $stage ) || ! is_wp_error( $add_pipeline ) ) { 
                    $pipeline_id = isset( $add_pipeline['term_id'] ) ? $add_pipeline['term_id'] : 0;
                    $stage_id = isset( $stage['term_id'] ) ? $stage['term_id'] : 0;
                    
                    add_term_meta( $stage_id, 'deal_pipeline_id' , $pipeline_id );
                } 
                
            }
        } 
        

        $temp_tag = [
            'Design',
            'Development',
            'Marketing',
        ];  
        foreach( $temp_tag as $tag ) {
            wp_insert_term(
                $tag,   // the term 
                'ndpi_tag', // the taxonomy 
            );
        } 

        //task
        $task_type = [
            'Email',
            'Call',
            'Meeting'
        ];  
        foreach( $task_type as $type ) {
            wp_insert_term(
                $type,   // the term 
                'ndpi_task_type', // the taxonomy 
            );
        } 
    } 
}
