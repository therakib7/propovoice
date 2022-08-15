<?php

namespace Ncpi\Helpers;

class I18n
{
    static function dashboard()
    {
        return [
            //modules
            'db' => esc_html__('Dashboard', 'propovoice'),
            'lead' => esc_html__('Lead', 'propovoice'),
            'deal' => esc_html__('Deal', 'propovoice'),
            'est' => esc_html__('Estimate', 'propovoice'),
            'inv' => esc_html__('Invoice', 'propovoice'),
            'client' => esc_html__('Client', 'propovoice'),
            'project' => esc_html__('Project', 'propovoice'),
            'task' => __('Task & Activity', 'propovoice'),
            'contact' => esc_html__('Contact', 'propovoice'),
            //dashboard
            'ov' => esc_html__('Overview', 'propovoice'),
            'latest' => esc_html__('Latest', 'propovoice'),
            'funnel' => esc_html__('Funnel', 'propovoice'),
            'tracking' => esc_html__('Tracking', 'propovoice'),
            //lead
            'level' => esc_html__('Level', 'propovoice'),
            'source' => esc_html__('Source', 'propovoice'),
            //deal
            'stage' => esc_html__('Stage', 'propovoice'),
            'won' => esc_html__('Won', 'propovoice'),
            'lost' => esc_html__('Lost', 'propovoice'),
            'proba' => esc_html__('Probability', 'propovoice'), 
            //estinv
            'nd' => __('&', 'propovoice'),
            'tmpl' => esc_html__('Template', 'propovoice'),
            'con' => esc_html__('Content', 'propovoice'),
            'num' => esc_html__('Number', 'propovoice'),
            'sender' => esc_html__('Sender', 'propovoice'),
            'rec' => esc_html__('Receiver', 'propovoice'),
            'item' => esc_html__('Item', 'propovoice'), 
            'qty' => esc_html__('Quantity', 'propovoice'),
            'rate' => esc_html__('Quantity', 'propovoice'),
            'amount' => esc_html__('Amount', 'propovoice'),
            'subT' => esc_html__('Sub Total', 'propovoice'),
            'down' => esc_html__('Download', 'propovoice'),
            'print' => esc_html__('Print', 'propovoice'),
            'share' => esc_html__('Share', 'propovoice'),
            'send' => esc_html__('Send', 'propovoice'),
            'sent' => esc_html__('Sent', 'propovoice'),
            'viewed' => esc_html__('Viewed', 'propovoice'),
            'accepted' => esc_html__('Accepted', 'propovoice'),
            'declined' => esc_html__('Declined', 'propovoice'),
            'paid' => esc_html__('Paid', 'propovoice'),
            'overdue' => esc_html__('Overdue', 'propovoice'), 
            'rem' => esc_html__('Reminder', 'propovoice'), 
            'recur' => esc_html__('Recurring', 'propovoice'), 
            'after' => esc_html__('After', 'propovoice'), 
            'before' => esc_html__('Before', 'propovoice'), 
            'aSign' => esc_html__('Authorized Signature', 'propovoice'),
            'style' => esc_html__('Style', 'propovoice'),
            'addi' => esc_html__('Additional', 'propovoice'), 
            //project
            'currency' => esc_html__('Currency', 'propovoice'),
            'budget' => esc_html__('Budget', 'propovoice'),
            //contact
            'book' => esc_html__('Book', 'propovoice'),
            'person' => esc_html__('Person', 'propovoice'),
            'org' => esc_html__('Organization', 'propovoice'),
            'name' => esc_html__('Name', 'propovoice'),
            'email' => esc_html__('Email', 'propovoice'),
            'mob' => esc_html__('Mobile', 'propovoice'),
            'web' => esc_html__('Website', 'propovoice'),
            'zip' => esc_html__('Zip Code', 'propovoice'),
            'address' => esc_html__('Address', 'propovoice'),
            'country' => esc_html__('Country', 'propovoice'),
            'region' => esc_html__('Region', 'propovoice'),
            //common
            'home' => esc_html__('Home', 'propovoice'),
            'total' => esc_html__('Total', 'propovoice'),
            'preview' => esc_html__('Preview', 'propovoice'), 
            //table
            'status' => esc_html__('Status', 'propovoice'),
            'date' => esc_html__('Date', 'propovoice'),
            'action' => esc_html__('Action', 'propovoice'),
            'show' => esc_html__('Show', 'propovoice'), 
            'search' => esc_html__('Search', 'propovoice'),
            'select' => esc_html__('Select', 'propovoice'),
            'type' => esc_html__('Type', 'propovoice'),
            'loc' => esc_html__('Location', 'propovoice'),
            //form
            'create' => esc_html__('Create', 'propovoice'),
            'add' => esc_html__('Add', 'propovoice'),
            'new' => esc_html__('New', 'propovoice'), 
            'edit' => esc_html__('Edit', 'propovoice'),
            'upd' => esc_html__('Update', 'propovoice'), 
            'del' => esc_html__('Delete', 'propovoice'), 
            'new' => esc_html__('New', 'propovoice'),
            'from' => esc_html__('From', 'propovoice'),
            'here' => esc_html__('here', 'propovoice'),
            'tag' => esc_html__('Tag', 'propovoice'),
            'bg' => esc_html__('Background', 'propovoice'),
            'txt' => esc_html__('Text', 'propovoice'),
            'color' => esc_html__('Color', 'propovoice'),
            'desc' => esc_html__('Description', 'propovoice'),
            'note' => esc_html__('Note', 'propovoice'),
            'title' => esc_html__('Title', 'propovoice'), 
            'start' => esc_html__('Start', 'propovoice'), 
            'due' => esc_html__('Due', 'propovoice'), 
            'sub' => esc_html__('Subject', 'propovoice'), 
            'msg' => esc_html__('Message', 'propovoice'), 
            'clear' => esc_html__('Clear', 'propovoice'),
            //btn
            'logo' => esc_html__('Logo', 'propovoice'),
            'contin' => esc_html__('Continue', 'propovoice'),
            'save' => esc_html__('Save', 'propovoice'),
            //settings
            'settings' => esc_html__('Settings', 'propovoice'),
            'general' => esc_html__('General', 'propovoice'),
            'business' => esc_html__('Business', 'propovoice'),
            'payment' => esc_html__('Payment', 'propovoice'),
            'method' => esc_html__('Method', 'propovoice'),
            'social' => esc_html__('Social', 'propovoice'),
            //ext
            'pipeline' => esc_html__('Pipeline', 'propovoice'), 
            'back_t_db' => esc_html__('Back to WP Dashboard', 'propovoice'),  
            'markdone' => esc_html__('Mark as Done', 'propovoice'),  
        ];
    }
}
