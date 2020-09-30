<?php

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


Route::middleware('APIToken')->group(function () {
    Route::get('UserList', 'UserController@WithList');
    Route::get('UserById/{id}', 'UserController@ById');
    Route::post('UserInsert', 'UserController@Insert');
    Route::post('UserUpdate/{id}', 'UserController@Update');
    Route::get('UserDelete/{id}', 'UserController@Delete');
    Route::post('ChangePassword', 'UserController@ChangePassword');

    Route::get('UserRoleList', 'UserRoleController@List');
    Route::get('UserRoleById/{id}', 'UserRoleController@ById');
    Route::post('UserRoleInsert', 'UserRoleController@Insert');
    Route::post('UserRoleUpdate/{id}', 'UserRoleController@Update');
    Route::get('UserRoleDelete/{id}', 'UserRoleController@Delete');
});
Route::post('Login', 'UserController@Login');
Route::post('ResetPassword', 'UserController@ResetPassword');
