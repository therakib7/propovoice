<?php

namespace Ndpi\Ctrl\Integrate;

use Ndpi\Ctrl\Integrate\Form\FormCtrl;
use Ndpi\Ctrl\Integrate\Smtp\SmtpCtrl;

class IntegrateCtrl
{
    public function __construct()
    {
        new FormCtrl();
        new SmtpCtrl();
    } 
}
