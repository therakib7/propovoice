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
use Ndpv\Ctrl\Api\Type\EstInv;
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
use Ndpv\Ctrl\Api\Type\Team;
use Ndpv\Ctrl\Api\Type\Webhook;
use Ndpv\Ctrl\Api\Type\SaveForNext;

class ApiCtrl
{

	public function __construct()
	{
		add_action("rest_api_init", function() {
			$lead = new Lead();
			$lead->register_routes();

			$task = new Task();
			$task->register_routes();

			$note = new Note();
			$note->register_routes();

			$file = new File();
			$file->register_routes();

			$client = new Client();
			$client->register_routes();

			$deal = new Deal();
			$deal->register_routes();

			$person = new Person();
			$person->register_routes();

			$org = new Org();
			$org->register_routes();

			$contact = new Contact();
			$contact->register_routes();

			$project = new Project();
			$project->register_routes();

			$invoice = new EstInv();
			$invoice->register_routes();

			$business = new Business();
			$business->register_routes();

			$email = new Email();
			$email->register_routes();

			$media = new Media();
			$media->register_routes();

			$payment = new Payment();
			$payment->register_routes();

			$payment_process = new PaymentProcess();
			$payment_process->register_routes();

			$dashboard = new Dashbaord();
			$dashboard->register_routes();

			$action = new Action();
			$action->register_routes();

			$taxonomy = new Taxonomy();
			$taxonomy->register_routes();

			$form = new Form();
			$form->register_routes();

			$webhook = new Webhook();
			$webhook->register_routes();

			$setting = new Setting();
			$setting->register_routes();

			$team = new Team();
			$team->register_routes();

			$save_for_next = new SaveForNext();
			$save_for_next->register_routes();
		});

		//for plain permalink api support
		add_filter('rest_request_before_callbacks', [$this, 'rest_request_filter'], 10, 3);
	}

	public function rest_request_filter($response, $handler, $request) {
		$permalink_structure = get_option('permalink_structure');
        if ( $permalink_structure === '' ) {
			$params = $request->get_params();
			if ( isset($params['rest_route']) ) {
				$query_string = parse_url($params['rest_route'], PHP_URL_QUERY);
				// Parse the query string into an array of parameters
				parse_str($query_string, $param_form_args);
				foreach( $param_form_args as $key => $val) {
					$request->set_param( $key, $val);
				}
			}
		}
		return $request;
	}
}
