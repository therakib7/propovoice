<?php 
namespace Ndpv\Helper;

class Data
{
    public function default()
    {
        return [
            'email_template' => [
                'estimate' => [
                    'default' => [
                        'subject' => '{org_name} sent you a Estimate #{id}',
                        'msg' => 'Hi <b>{client_name}</b>,
Please find attached Estimate #{id}. Due Date is {due_date}.

Estimate No: #{id}
Estimate Date: {date}
Due Date: {due_date}
Amount: {amount}

Thank you for your business.

Regards
{org_name}'
                    ],
                    'reminder' => [
                        'subject' => '{org_name} sent you a reminder of Estimate #{id}',
                        'msg' => 'Hi <b>{client_name}</b>,
Please find attached Estimate #{id}. Due Date was {due_date}.

Estimate No: #{id}
Estimate Date: {date}
Due Date: {due_date}
Amount: {amount}

Thank you for your business.

Regards
{org_name}'
                    ]
                ],
                'invoice' => [
                    'default' => [
                        'subject' => '{org_name} sent you a Invoice #{id}',
                        'msg' => 'Hi <b>{client_name}</b>,
Please find attached Invoice #{id}. Due Date is {due_date}.

Invoice No: #{id}
Invoice Date: {date}
Due Date: {due_date}
Due Amount: {amount}

Thank you for your business.

Regards
{org_name}'
                    ],
                    'reminder' => [
                        'subject' => '{org_name} sent you a reminder of Invoice #{id}',
                        'msg' => 'Hi <b>{client_name}</b>,
Please find attached Invoice #{id}. Due Date was {due_date}.

Invoice No: #{id}
Invoice Date: {date}
Due Date: {due_date}
Due Amount: {amount}

Thank you for your business.

Regards
{org_name}'
                    ],
                    'recurring' => [
                        'subject' => '{org_name} sent you a recurring of Invoice #{id}',
                        'msg' => 'Hi <b>{client_name}</b>,
Please find attached Invoice #{id}. Due Date was {due_date}.

Invoice No: #{id}
Invoice Date: {date}
Due Date: {due_date}
Due Amount: {amount}

Thank you for your business.

Regards
{org_name}'
                    ]
                ],   
                'client_portal' => [    
                    'password' => [
                        'subject' => '{org_name} client portal credential',
                        'msg' => 'Hi <b>{client_name}</b>,
{org_name} give you access in their client portal. 
You can login with the credential

Login URL: {login_url}
Email: {email}
Password: {password} 

Thank you for staying with us.

Regards
{org_name}'
                    ]
                ],    
            ]
        ];
    }
}
