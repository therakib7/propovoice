<?php

namespace Ncpi\Ctrl\Api;

use Ncpi\Ctrl\Api\Type\Action;
use Ncpi\Ctrl\Api\Type\Business;
use Ncpi\Ctrl\Api\Type\Client;
use Ncpi\Ctrl\Api\Type\Contact;
use Ncpi\Ctrl\Api\Type\Person;
use Ncpi\Ctrl\Api\Type\Dashbaord;
use Ncpi\Ctrl\Api\Type\Deal;
use Ncpi\Ctrl\Api\Type\Email;
use Ncpi\Ctrl\Api\Type\File;
use Ncpi\Ctrl\Api\Type\Invoice;
use Ncpi\Ctrl\Api\Type\Lead;
use Ncpi\Ctrl\Api\Type\Media;
use Ncpi\Ctrl\Api\Type\Note;
use Ncpi\Ctrl\Api\Type\Org;
use Ncpi\Ctrl\Api\Type\Payment;
use Ncpi\Ctrl\Api\Type\PaymentProcess;
use Ncpi\Ctrl\Api\Type\Project;
use Ncpi\Ctrl\Api\Type\Proposal;
use Ncpi\Ctrl\Api\Type\Setting;
use Ncpi\Ctrl\Api\Type\Task;
use Ncpi\Ctrl\Api\Type\Taxonomy;

class ApiCtrl
{

	public function __construct()
	{
		new Lead();
		new Task();
		new Note();
		new File();
		new Client();
		new Deal(); 
		new Person();
		new Org();
		new Contact();
		new Project();
		new Proposal();
		new Invoice();
		new Business();
		new Email();
		new Media();
		new Payment();
		new PaymentProcess();
		new Dashbaord();
		new Action();
		new Taxonomy();
		new Setting();
	}
}
