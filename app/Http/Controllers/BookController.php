<?php

namespace App\Http\Controllers;

use App\Models\book_store;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

            //else get all records
            $main_array = array();
            $records = book_store::orderBy('id', 'ASC')->limit(10)->get();
            if ($records->count() > 0) {
                //return $records;
                foreach ($records as $record) {
                    $arr = array("status_code"=> 200, "status" => "success", "id" => $record->id, "name" => $record->name, "isbn" => $record->isbn, "authors" => explode(',', $record->authors),
                "number_of_pages" => $record->number_of_pages, "country" => $record->country, "release_date" => $record->release_date);
                    array_push($main_array, $arr);
                }

                return json_encode($main_array);
            }else{
               return false;
            }


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $params = $request->data;
        $response = array();
        $data = array('name' => $params['name'], 'isbn' => $params['isbn'], 'authors' => $params['authors'],
        'country' => $params['country'], 'number_of_pages' => $params['number_of_pages'], 'publisher'=> $params['publisher'],
        'release_date' => $params['release_data']);
        $insert = book_store::create($data);
        if ($insert){
            $data['authors'] = explode(',', $params['authors']);
            $response = array("status_code" => 201, "status" => "success", "data" => $data);
        }
        return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
   {
        $response = array();
        $main_array = array();
        $record = book_store::findOrFail($id);
        //return $record->name;
        if ($record){
            $arr = array("id" => $record->id, "name" => $record->name, "isbn" => $record->isbn, "authors" => explode(',', $record->authors),
            "number_of_pages" => $record->number_of_pages, "country" => $record->country, "release_date" => $record->release_date);

        }
        $response = array("status_code" => 200, "status" => "success", "data" => $arr);
        array_push($main_array, $response);
        return json_encode($main_array);


    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $records = '';
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $record, $id)
    {
        //
        //print_r($request->all());
        $response = false;


        if ($id){
            $arr = array("id" => $id, "name" => $record->name, "isbn" => $record->isbn, "authors" => explode(',', $record->authors),
            "number_of_pages" => $record->number_of_pages, "country" => $record->country, "release_date" => $record->release_date);
            $sql = book_store::where('id', $id)->update($arr);

            if ($sql) {
                $response = array("status_code" => 200, "status" => "success", "message" => "The book \"" . $record->name . "\" Book was updated successfully",
            "data" => $arr);
            $response = json_encode($response);
            }
        }
        return $response;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $sql = book_store::where('id', $id)->delete();
        $response = json_encode('failed');
        if ($sql){
            $response = array("status_code" => 204, "status" => "success", "data"=>[]);

        }
        return json_encode($response);

    }
}
