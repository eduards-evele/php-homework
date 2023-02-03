<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
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

Route::post('/register', [AuthController::class, 'createUser']);
Route::post('/login', [AuthController::class, 'loginUser'])->name('login');


Route::group(['middleware' => ['auth:sanctum']], function () {
  
  Route::post('/item/register', function(Request $request) {
    $credentials = $request->only('name', 'quantity', 'available', 'description');
    
    $rules = [
      'name' => 'required|max:255|unique:item',
      'quantity' => 'required|numeric',
      'available' => 'required|boolean',
      'description' => 'required|max:255'
    ];

    $validator = Validator::make($credentials, $rules);
    
    if($validator->fails()) {
      return response()->json(['success'=> false, 'error'=> $validator->messages()]);
    }

    $name = $request->name;
    $quantity = $request->quantity;
    $owner_id = auth('sanctum')->user()->id;
    $available = $request->available;
    $description = $request->description;
    $id = (DB::table('item')->count() + 1);

    DB::table('item')->insert([
      'id' => $id,
      'name' => $name,
      'QUANTITY' => $quantity,
      'owner_id' => $owner_id,
      'available' => $available,
      'description' => $description
    ]);

    return response()->json([
      'success' => true,
      'userid' => $owner_id
    ]);

  } );
  Route::post('/item/update', function(Request $request) {
    $credentials = $request->only('id', 'name', 'quantity', 'available', 'description');
    
    $rules = [
      'id' => 'required|numeric',
      'name' => 'max:255|unique:item',
      'quantity' => 'nullable|numeric',
      'available' => 'nullable|boolean',
      'description' => '|max:255'
    ];

    $validator = Validator::make($credentials, $rules);
    
    if($validator->fails()) {
      return response()->json(['success'=> false, 'error'=> $validator->messages()]);
    }

    $name = $request->name;
    $quantity = $request->quantity;
    $owner_id = auth('sanctum')->user()->id;
    $item_owner_id = DB::table('item')->select('owner_id')->where('id', $request->id)->first()->owner_id;
    $available = $request->available;
    $description = $request->description;
    if($owner_id == $item_owner_id) {
      $updated_row = DB::table('item')->select('*')->where('id', $request->id)->first();
      
      //return $updated_row;
      $updated = DB::table('item')->where('id', $request->id)->where('owner_id', $owner_id)->update([
        'name' => ($name == null) ? $updated_row->NAME : $name,
        'quantity' => ($quantity == null) ? $updated_row->QUANTITY : $quantity,
        'available' => ($available == null) ? $updated_row->AVAILABLE: $available,
        'description' => ($description == null) ? $updated_row->DESCRIPTION : $description,
      ]);
      return response()->json([
        'success' => true,
        'userid' => $owner_id
      ]);
    }
  
    else {
      return response()->json([
        'success' => false,
        'item_id' => 'item not owned'
      ]);
      
    }

  } );
  Route::post('/item/delete', function(Request $request) {
    $params = $request->only('id');
    $owner_id = auth('sanctum')->user()->id;
    $item_owner_id = DB::table('item')->select('owner_id')->where('id', $request->id)->first()->owner_id;
   
    if($owner_id == $item_owner_id) {
      DB::table('item')
      ->where('id', $request->id)
      ->where('owner_id', $owner_id)
      ->delete();
      return response()->json([
        'success' => true,
        'item_id' => $request->id
      ]);
    }
    else {
      return response()->json([
        'success' => false,
        'item_id' => 'item not owned'
      ]);
    }
    
  } );
});