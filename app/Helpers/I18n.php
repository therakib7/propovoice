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
            'task' => esc_html__('Task & Activity', 'propovoice'),
            'contact' => esc_html__('Contact', 'propovoice'),
            //dashboard
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
            'tmpl' => esc_html__('Template', 'propovoice'),
            'sent' => esc_html__('Sent', 'propovoice'),
            'viewed' => esc_html__('Viewed', 'propovoice'),
            'accepted' => esc_html__('Accepted', 'propovoice'),
            'declined' => esc_html__('Declined', 'propovoice'),
            'paid' => esc_html__('Paid', 'propovoice'),
            'overdue' => esc_html__('Overdue', 'propovoice'), 
            //project
            'currency' => esc_html__('Currency', 'propovoice'),
            'budget' => esc_html__('Budget', 'propovoice'),
            //contact
            'book' => esc_html__('Book', 'propovoice'),
            'person' => esc_html__('Person', 'propovoice'),
            'org' => esc_html__('organization', 'propovoice'),
            'name' => esc_html__('Name', 'propovoice'),
            'email' => esc_html__('Email', 'propovoice'),
            'mbl' => esc_html__('Mobile', 'propovoice'),
            'web' => esc_html__('Website', 'propovoice'),
            'zip' => esc_html__('Zip Code', 'propovoice'),
            'address' => esc_html__('Address', 'propovoice'),
            //common
            'home' => esc_html__('Home', 'propovoice'),
            'total' => esc_html__('Total', 'propovoice'),
            //settings
            'settings' => esc_html__('Settings', 'propovoice'),
            'general' => esc_html__('General', 'propovoice'),
            'business' => esc_html__('Business', 'propovoice'),
            //table
            'status' => esc_html__('Status', 'propovoice'),
            'date' => esc_html__('Date', 'propovoice'),
            'action' => esc_html__('Action', 'propovoice'),
            //form
            'add' => esc_html__('Add', 'propovoice'),
            'new' => esc_html__('New', 'propovoice'),
            'edit' => esc_html__('Edit', 'propovoice'),
            'del' => esc_html__('Delete', 'propovoice'),
            'search' => esc_html__('Search', 'propovoice'),
            'select' => esc_html__('Select', 'propovoice'),
            'new' => esc_html__('New', 'propovoice'),
            'from' => esc_html__('From', 'propovoice'),
            'tag' => esc_html__('Tag', 'propovoice'),
            'bg' => esc_html__('Background', 'propovoice'),
            'txt' => esc_html__('Text', 'propovoice'),
            'color' => esc_html__('Color', 'propovoice'),
            'desc' => esc_html__('Description', 'propovoice'),
            'note' => esc_html__('Note', 'propovoice'),
            //btn
            'logo' => esc_html__('Logo', 'propovoice'),
            'continue' => esc_html__('Continue', 'propovoice'),
            'save' => esc_html__('Save', 'propovoice'),
            //ext
            'pipeline' => esc_html__('Pipeline', 'propovoice'),
        ];
    }
}
