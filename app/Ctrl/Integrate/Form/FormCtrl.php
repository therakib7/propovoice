<?php

namespace Ndpi\Ctrl\Integrate\Form;

use Ndpi\Ctrl\Integrate\Form\Type\ContactFrom7;
use Ndpi\Ctrl\Integrate\Form\Type\FormList;
use Ndpi\Ctrl\Integrate\Form\Type\Wpforms;

class FormCtrl
{ 
	public function __construct()
	{ 
		new FormList();
		new ContactFrom7();
		new Wpforms();
	}
}
