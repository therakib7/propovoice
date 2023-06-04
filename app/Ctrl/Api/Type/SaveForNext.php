<?php

namespace Ndpv\Ctrl\Api\Type;

class SaveForNext
{
    private $option_name = 'save_for_next_data';

    public function __construct()
    {
        add_action("rest_api_init", [$this, "rest_routes"]);
    }

    public function rest_routes()
    {
        register_rest_route("ndpv/v1", "/savefornext", [

            [
                "methods" => "POST",
                "callback" => [$this, "create"],
                "permission_callback" => function () {
                    return true;
                },
            ],

            [
                "methods" => "GET",
                "callback" => [$this, "get_data"],
                "permission_callback" => function () {
                    return true;
                },
            ],
        ]);

        register_rest_route("ndpv/v1", "/savefornext/(?P<index>[a-zA-Z0-9\-]+)", [
            "methods" => "DELETE",
            "callback" => [$this, "delete_data"],
            "permission_callback" => function () {
                return true;
            }
        ]);

        register_rest_route("ndpv/v1", "/savefornext/(?P<index>[a-zA-Z0-9\-]+)", [
            "methods" => "PUT",
            "callback" => [$this, "update_data"],
            "permission_callback" => function () {
                return true;
            }

        ]);
    }

    public function create($req)
    {
        $param = $req->get_params();
        $data = array(
            'index'     => $param['index'],
            'title'     => $param['title'],
            'desc'      => $param['desc'],
            'qty'       => $param['qty'],
            'qty_type'  => $param['qty_type'],
            'price'     => $param['price'],
            'tax'       => $param['tax'],
            'tax_type'  => $param['tax_type'],
        );

        // Get existing data from the option.
        $existing_data = get_option($this->option_name, array());

        // Add the new data to the existing data.
        $existing_data[] = $data;

        // Save the updated data to the option.
        update_option($this->option_name, $existing_data);
    }

    public function get_data()
    {
        // Get existing data from the option.
        $existing_data = get_option($this->option_name, array());

        // Return the data.
        return $existing_data;
    }

    public function delete_data($req)
    {
        error_log('delte called');
        $param = $req->get_params();
        $index = $param['index'];
        // Get existing data from the option.
        $existing_data = get_option($this->option_name, array());

        // Find the data to delete based on the index.
        $key = array_search($index, array_column($existing_data, 'index'));
        if ($key !== false) {
            // Remove the data from the array.
            unset($existing_data[$key]);

            // Save the updated data to the option.
            update_option($this->option_name, array_values($existing_data));
        }
    }

    public function update_data($request)
    {
        error_log('update data');
        // Get the index of the item to update.
        $index = $request->get_param('index');

        error_log($index);
        // Get the request data.
        $data = $request->get_json_params();

        // Get the existing item data.
        $existing_data = get_option($this->option_name, array());

        // Find the item to update based on the index.
        $key = array_search($index, array_column($existing_data, 'index'));
        if ($key !== false) {
            // Update the item with the new data.
            $existing_data[$key] = array_merge($existing_data[$key], $data);

            // Update the item data option.
            $updated = update_option($this->option_name, $existing_data);

            if ($updated) {
                // Return success response.
                return new \WP_REST_Response(array(
                    'status'  => 'success',
                    'message' => 'item data item updated successfully.',
                ), 200);
            }
        }

        // Return error response if the item could not be found or updated.
        return new \WP_REST_Response(array(
            'status'  => 'error',
            'message' => 'Failed to update item data item.',
        ), 500);
    }
}