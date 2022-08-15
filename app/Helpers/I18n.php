<?php

namespace Ncpi\Helpers;

class I18n
{
    static function dashboard()
    {
        return [
            'common' => [
                'search' => esc_html__('Search', 'propovoice')
            ],
            'lead' => [
                'label' => esc_html__('Lead', 'propovoice')
            ]
        ];
    }
}
