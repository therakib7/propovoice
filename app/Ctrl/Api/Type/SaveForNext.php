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
                "methods" => "DELETE",
                "callback" => [$this, "delete_data"],
                "permission_callback" => function () {
                    return true;
                },
            ],
            [
                "methods" => "GET",
                "callback" => [$this, "get_data"],

            ],
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
}
