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
                        'subject' => '{org_name} client portal credentials',
                        'msg' => 'Hi <b>{client_name}</b>,
{org_name} gives you access to their client portal. 
You can log in with the credentials

<b>Login URL:</b> {login_url}
<b>Email:</b> {email}
<b>Password:</b> {password} 

Thank you for staying with us.

Regards
{org_name}'
                    ]
                ],    
            ]
        ];
    }
}
