<?php

namespace Ndpv\Ctrl\Hook\Type;

use Ndpv\Ctrl\Hook\Type\Router\Routes;

class Action
{
    public function __construct()
    {
        new Routes();
    }
}
