<?php

namespace Ndpi\Ctrl\Api;

use Ndpi\Ctrl\Api\Type\Action;
use Ndpi\Ctrl\Api\Type\Business;
use Ndpi\Ctrl\Api\Type\Client;
use Ndpi\Ctrl\Api\Type\Contact;
use Ndpi\Ctrl\Api\Type\Person;
use Ndpi\Ctrl\Api\Type\Dashbaord;
use Ndpi\Ctrl\Api\Type\Deal;
use Ndpi\Ctrl\Api\Type\Email;
use Ndpi\Ctrl\Api\Type\File;
use Ndpi\Ctrl\Api\Type\Invoice;
use Ndpi\Ctrl\Api\Type\Lead;
use Ndpi\Ctrl\Api\Type\Media;
use Ndpi\Ctrl\Api\Type\Note;
use Ndpi\Ctrl\Api\Type\Org;
use Ndpi\Ctrl\Api\Type\Payment;
use Ndpi\Ctrl\Api\Type\PaymentProcess;
use Ndpi\Ctrl\Api\Type\Project;
use Ndpi\Ctrl\Api\Type\Proposal;
use Ndpi\Ctrl\Api\Type\Setting;
use Ndpi\Ctrl\Api\Type\Task;
use Ndpi\Ctrl\Api\Type\Taxonomy;

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
