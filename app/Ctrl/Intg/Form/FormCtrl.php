<?php

namespace Ndpi\Ctrl\Intg\Form;

use Ndpi\Ctrl\Intg\Form\Type\ContactFrom7;
use Ndpi\Ctrl\Intg\Form\Type\FormList;

class FormCtrl
{ 
	public function __construct()
	{ 
		new FormList();
		new ContactFrom7();
	}
}
