<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('user/register', function (Request $request) {
    $credentials = $request->only('name', 'email', 'password');
    
    $rules = [
      'name' => 'required|max:255',
      'password' => 'required|max:30|min:8',
      'email' => 'required|email|max:255|unique:USER'
    ];

    $validator = Validator::make($credentials, $rules);
    
    if($validator->fails()) {
      return response()->json(['success'=> false, 'error'=> $validator->messages()]);
    }

    $name = $request->name;
    $email = $request->email;
    $password = $request->password;
    
    $id = (DB::table('USER')->count() + 1);

    DB::table('USER')->insert([
      'id' => $id,
      'name' => $name,
      'email' => $email,
      'password' => $password
    ]);
    
    return response()->json([
      'success' => true,
      'userid' => $id
    ]);
});
Route::post('user/add', function (Request $request) {
  
});


Route::get('foo', function () {
    return 'Hello World';
});