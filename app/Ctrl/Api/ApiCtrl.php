<?php 
namespace Ndpv\Ctrl\Api;

use Ndpv\Ctrl\Api\Type\Action;
use Ndpv\Ctrl\Api\Type\Business;
use Ndpv\Ctrl\Api\Type\Client;
use Ndpv\Ctrl\Api\Type\Contact;
use Ndpv\Ctrl\Api\Type\Person;
use Ndpv\Ctrl\Api\Type\Dashbaord;
use Ndpv\Ctrl\Api\Type\Deal;
use Ndpv\Ctrl\Api\Type\Email;
use Ndpv\Ctrl\Api\Type\File;
use Ndpv\Ctrl\Api\Type\Form;
use Ndpv\Ctrl\Api\Type\Invoice;
use Ndpv\Ctrl\Api\Type\Lead;
use Ndpv\Ctrl\Api\Type\Media;
use Ndpv\Ctrl\Api\Type\Note;
use Ndpv\Ctrl\Api\Type\Org;
use Ndpv\Ctrl\Api\Type\Payment;
use Ndpv\Ctrl\Api\Type\PaymentProcess;
use Ndpv\Ctrl\Api\Type\Project; 
use Ndpv\Ctrl\Api\Type\Setting;
use Ndpv\Ctrl\Api\Type\Task;
use Ndpv\Ctrl\Api\Type\Taxonomy;
use Ndpv\Ctrl\Api\Type\Webhook;

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
		new Invoice();
		new Business();
		new Email();
		new Media();
		new Payment();
		new PaymentProcess();
		new Dashbaord();
		new Action();
		new Taxonomy();
		new Form();
		new Webhook();
		new Setting();
	}
}
