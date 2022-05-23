<?php

namespace Ncpi\Controllers\Api;

use Ncpi\Controllers\Api\Types\Action;
use Ncpi\Controllers\Api\Types\Business;
use Ncpi\Controllers\Api\Types\Client;
use Ncpi\Controllers\Api\Types\Contact;
use Ncpi\Controllers\Api\Types\Dashbaord;
use Ncpi\Controllers\Api\Types\Deal;
use Ncpi\Controllers\Api\Types\Email;
use Ncpi\Controllers\Api\Types\Invoice;
use Ncpi\Controllers\Api\Types\Lead;
use Ncpi\Controllers\Api\Types\Media;
use Ncpi\Controllers\Api\Types\Payment;
use Ncpi\Controllers\Api\Types\PaymentProcess;
use Ncpi\Controllers\Api\Types\Project;
use Ncpi\Controllers\Api\Types\Proposal;
use Ncpi\Controllers\Api\Types\Setting;
use Ncpi\Controllers\Api\Types\Taxonomy;

class ApiController
{

	public function __construct()
	{
		new Lead();
		new Client();
		new Deal(); 
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
