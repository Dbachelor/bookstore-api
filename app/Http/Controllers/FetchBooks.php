<?php

namespace App\Http\Controllers;

use App\Models\book_store;
use Illuminate\Http\Request;
use App\Providers\BookService;

class FetchBooks extends Controller
{
    //
    public function __construct(BookService $bookService)
    {
        $this->bookService = $bookService;
        $this->url = "https://www.anapioficeandfire.com/api/books";
    }
    public function getBook(Request $req){
        $r = 1;
        $res = $this->bookService->sendGetReq($this->url, "name", $req->name);
        return $this->bookService->sendData($res);
    }
    public function postBook(Request $req){
        $param = array($req->id);
        $res = $this->bookService->sendGetReq("localhost:5000/api/v1/books", "id", $req->id);
        return $res;
    }
}
