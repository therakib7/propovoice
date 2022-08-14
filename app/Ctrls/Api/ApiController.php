<?php

namespace Ncpi\Ctrls\Api;

use Ncpi\Ctrls\Api\Type\Action;
use Ncpi\Ctrls\Api\Type\Business;
use Ncpi\Ctrls\Api\Type\Client;
use Ncpi\Ctrls\Api\Type\Contact;
use Ncpi\Ctrls\Api\Type\Person;
use Ncpi\Ctrls\Api\Type\Dashbaord;
use Ncpi\Ctrls\Api\Type\Deal;
use Ncpi\Ctrls\Api\Type\Email;
use Ncpi\Ctrls\Api\Type\File;
use Ncpi\Ctrls\Api\Type\Invoice;
use Ncpi\Ctrls\Api\Type\Lead;
use Ncpi\Ctrls\Api\Type\Media;
use Ncpi\Ctrls\Api\Type\Note;
use Ncpi\Ctrls\Api\Type\Org;
use Ncpi\Ctrls\Api\Type\Payment;
use Ncpi\Ctrls\Api\Type\PaymentProcess;
use Ncpi\Ctrls\Api\Type\Project;
use Ncpi\Ctrls\Api\Type\Proposal;
use Ncpi\Ctrls\Api\Type\Setting;
use Ncpi\Ctrls\Api\Type\Task;
use Ncpi\Ctrls\Api\Type\Taxonomy;

class ApiController
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
