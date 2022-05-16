<?php

namespace Ncpi\Helpers;

class Data
{
    public function default()
    {
        return [
            'email_template' => [
                'estimate' => [
                    'default' => [
                        'subject' => '{company_name} sent you a Estimate #{id}',
                        'msg' => 'Hi <b>{client_name}</b>,
Please find attached Estimate #{id}. Due Date was {due_date}.

Estimate No: #{id}
Estimate Date: {date}
Due Date: {due_date}
Amount: {amount}

Thank you for your business.

Regards
{company_name}'
                    ],
                ],
                'invoice' => [
                    'default' => [
                        'subject' => '{company_name} sent you a Invoice #{id}',
                        'msg' => 'Hi <b>{client_name}</b>,
Please find attached Invoice #{id}. Due Date was {due_date}.

Invoice No: #{id}
Invoice Date: {date}
Due Date: {due_date}
Due Amount: {amount}

Thank you for your business.

Regards
{company_name}'
                    ]
                ],    
            ]
        ];
    }
}
