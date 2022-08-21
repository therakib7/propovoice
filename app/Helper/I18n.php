<?php

namespace Ndpi\Helper;

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
            'accept' => esc_html__('Accepted', 'propovoice'),
            'dec' => esc_html__('Declined', 'propovoice'),
            'paid' => esc_html__('Paid', 'propovoice'),
            'unpaid' => esc_html__('Unpaid', 'propovoice'),
            'overdue' => esc_html__('Overdue', 'propovoice'), 
            'rem' => esc_html__('Reminder', 'propovoice'), 
            'recur' => esc_html__('Recurring', 'propovoice'), 
            'after' => esc_html__('After', 'propovoice'), 
            'before' => esc_html__('Before', 'propovoice'), 
            'aSign' => esc_html__('Authorized Signature', 'propovoice'),
            'Sign' => esc_html__('Signature', 'propovoice'),
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
            'contact ' => esc_html__('Contact ', 'propovoice'),
            //common
            'home' => esc_html__('Home', 'propovoice'),
            'total' => esc_html__('Total', 'propovoice'),
            'prv' => esc_html__('Preview', 'propovoice'), 
            //table
            'status' => esc_html__('Status', 'propovoice'),
            'date' => esc_html__('Date', 'propovoice'),
            'action' => esc_html__('Action', 'propovoice'),
            'show' => esc_html__('Show', 'propovoice'), 
            'alw' => esc_html__('Always', 'propovoice'), 
            'search' => esc_html__('Search', 'propovoice'),
            'select' => esc_html__('Select', 'propovoice'),
            'type' => esc_html__('Type', 'propovoice'),
            'loc' => esc_html__('Location', 'propovoice'),
            'rate' => esc_html__('Rate', 'propovoice'),
            'dup' => esc_html__('Duplicate', 'propovoice'),
            'dft' => esc_html__('Draft', 'propovoice'),
            'req' => esc_html__('Request', 'propovoice'),
            //form
            'create' => esc_html__('Create', 'propovoice'),
            'icon' => esc_html__('Icon', 'propovoice'),
            'text' => esc_html__('Text', 'propovoice'),
            'img' => esc_html__('Image', 'propovoice'),
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
            'account' => esc_html__('Account', 'propovoice'),
            'secret' => esc_html__('Secret', 'propovoice'),
            'id' => esc_html__('ID', 'propovoice'),
            'key' => esc_html__('Key', 'propovoice'),
            'info' => esc_html__('Info', 'propovoice'),
            'personal' => esc_html__('Personal', 'propovoice'),
            'profile' => esc_html__('Profile', 'propovoice'),
            'file' => esc_html__('File', 'propovoice'),
            'section' => esc_html__('Section', 'propovoice'),
            'dtl' => esc_html__('Details', 'propovoice'),
            //btn
            'logo' => esc_html__('Logo', 'propovoice'),
            'contin' => esc_html__('Continue', 'propovoice'),
            'save' => esc_html__('Save', 'propovoice'),
            'close' => esc_html__('Close', 'propovoice'),
            //settings
            'settings' => esc_html__('Settings', 'propovoice'),
            'general' => esc_html__('General', 'propovoice'),
            'business' => esc_html__('Business', 'propovoice'),
            'pay' => esc_html__('Pay', 'propovoice'),
            'payment' => esc_html__('Payment', 'propovoice'),
            'method' => esc_html__('Method', 'propovoice'),
            'social' => esc_html__('Social', 'propovoice'), 
            'var' => esc_html__('Variable', 'propovoice'), 
            'imp' => esc_html__('Import', 'propovoice'), 
            'license' => esc_html__('License', 'propovoice'), 
            'exp' => esc_html__('Expires', 'propovoice'), 
            'valid' => esc_html__('Valid', 'propovoice'), 
            'prior' => esc_html__('Priority', 'propovoice'), 
            'meeting' => esc_html__('Meeting Place or', 'propovoice'), 
            'meet' => esc_html__('meet', 'propovoice'), 
            //ext
            'pipeline' => esc_html__('Pipeline', 'propovoice'), 
            'back_t_db' => esc_html__('Back to WP Dashboard', 'propovoice'),  
            'mark' => esc_html__('Mark', 'propovoice'),  
            'done' => esc_html__('Done', 'propovoice'),  
            'paid' => esc_html__('Paid', 'propovoice'),  
            'comp' => esc_html__('completed', 'propovoice'),  
            'as' => esc_html__('as', 'propovoice'),  
            'suc' => esc_html__('successful', 'propovoice'),  
            'submit' => esc_html__('Submit', 'propovoice'),  
            'proposal' => esc_html__('Proposal', 'propovoice'),  
            'accounting' => esc_html__('Accounting', 'propovoice'),  
            'need' => esc_html__('Need Support', 'propovoice'),  
            'feedback' => esc_html__('Feedback', 'propovoice'),  
            'attachment' => esc_html__('Attachment', 'propovoice'),  
            'fee' => esc_html__('Fee', 'propovoice'),  
            'fields' => esc_html__('Fields', 'propovoice'),  
            'discount' => esc_html__('Discount', 'propovoice'),  
            'txn' => esc_html__('Transection', 'propovoice'),  
            'stripe' => esc_html__('Stripe', 'propovoice'),  
            'Pub' => esc_html__('Public', 'propovoice'),  
            'full' => esc_html__('Full', 'propovoice'),  
            'delivery' => esc_html__('delivery', 'propovoice'),  
            'option' => esc_html__('option', 'propovoice'),  
            'open' => esc_html__('Open', 'propovoice'),  
            'picker' => esc_html__('Picker', 'propovoice'),  
            'upload' => esc_html__('Upload', 'propovoice'),  
            'link' => esc_html__('link', 'propovoice'),  
            'first' => esc_html__('First', 'propovoice'),  
            'last' => esc_html__('Last', 'propovoice'),  
            'company' => esc_html__('Company', 'propovoice'),  
            'zoomconn' => esc_html__('Connect Zoom', 'propovoice'),  
            'unschedule' => esc_html__('Unschedule', 'propovoice'),  
            'addr' => esc_html__('Address', 'propovoice'),  
            'timeline' => esc_html__(' Timeline', 'propovoice'),  
            'act' => esc_html__('Active', 'propovoice'),  
            'mi' => esc_html__('Media', 'propovoice'),  
            'gallery' => esc_html__('Gallery', 'propovoice'),  
            'in' => esc_html__('Insert', 'propovoice'),  
            'other' => esc_html__('Others', 'propovoice'),  
            'bank' => esc_html__('Bank', 'propovoice'),  
            'skip' => esc_html__('Skip', 'propovoice'),  
            'label' => esc_html__('Label', 'propovoice'),   
            'block' => esc_html__('Block', 'propovoice'),  
            'move' => esc_html__('Move', 'propovoice'),  
            'go' => esc_html__('Go', 'propovoice'),  
            'or' => esc_html__('or', 'propovoice'),  
            'receipt' => esc_html__('Receipt', 'propovoice'),  
            'explore' => esc_html__('Explore', 'propovoice'),  
            'subtotal' => esc_html__('Subtotal', 'propovoice'),  
            'with' => esc_html__('With', 'propovoice'),  
            'parent' => esc_html__('Parent', 'propovoice'),  
            'widgets' => esc_html__('Widgets', 'propovoice'),  
            'to' => esc_html__('To', 'propovoice'),  
            'copy' => esc_html__('Copy', 'propovoice'),  
            'acti' => esc_html__('activity ', 'propovoice'),  
            'per' => esc_html__('Per ', 'propovoice'),  
        ];
    }
}
