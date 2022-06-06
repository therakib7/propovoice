<?php

namespace Ncpi\Ctrls\Api;

use Ncpi\Ctrls\Api\Types\Action;
use Ncpi\Ctrls\Api\Types\Business;
use Ncpi\Ctrls\Api\Types\Client;
use Ncpi\Ctrls\Api\Types\Person;
use Ncpi\Ctrls\Api\Types\Dashbaord;
use Ncpi\Ctrls\Api\Types\Deal;
use Ncpi\Ctrls\Api\Types\Email;
use Ncpi\Ctrls\Api\Types\File;
use Ncpi\Ctrls\Api\Types\Invoice;
use Ncpi\Ctrls\Api\Types\Lead;
use Ncpi\Ctrls\Api\Types\Media;
use Ncpi\Ctrls\Api\Types\Note;
use Ncpi\Ctrls\Api\Types\Org;
use Ncpi\Ctrls\Api\Types\Payment;
use Ncpi\Ctrls\Api\Types\PaymentProcess;
use Ncpi\Ctrls\Api\Types\Project;
use Ncpi\Ctrls\Api\Types\Proposal;
use Ncpi\Ctrls\Api\Types\Setting;
use Ncpi\Ctrls\Api\Types\Task;
use Ncpi\Ctrls\Api\Types\Taxonomy;

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
