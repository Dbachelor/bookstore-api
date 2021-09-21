<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\book_store;

class BookService{

    public function sendPostReq($url, $params){


        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $headers = array(
        "Accept: application/json",
        "Content-Type: application/json",
        );
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
        //for debug only!
        // curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        // curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        $resp = curl_exec($curl);
        curl_close($curl);
        return $resp;




    }
    public function sendGetReq($url, $column, $params=''){

        //$url = "https://reqbin.com/echo";
        // if (!empty($params)) {
        //     $url = $url . "?$column=" . $params;
        // }
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        //for debug only!
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        $resp = curl_exec($curl);
        curl_close($curl);
        //var_dump($resp);
        return $resp;
    }
    public function sendData($res){
        //array_unshift("status_code": 200, $data);
        $array = array();
        $array_main = array("status_code" =>200, "status"=> "success");
        if(!empty($res)){
            $data = json_decode($res, true);
            for($i = 0; $i < count($data); $i++){
                $arr = array("name" => $data[$i]["name"], "isbn" => $data[$i]['isbn'], "authors" => implode(',', $data[$i]['authors']),
                "number_of_pages" => $data[$i]['numberOfPages'], "publisher" => $data[$i]['publisher'],
                 "country" => $data[$i]['country'], "release_date" => $data[$i]['released']);
                 //check if this book already exists in our db
                 $checker = book_store::where('isbn', $data[$i]['isbn'])->count();
                 if ($checker == 0 ){
                    $r = book_store::create($arr);

                 }
                 $arr['authors'] = explode(',',implode(',', $data[$i]['authors']));

                 array_push($array, $arr);
            }
            $array_main["data"] = $array;
            $data_ = $array_main;

        }else{
            $array_main["data"] = [];
        }

        return json_encode($data_);
    }

}

?>
