<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('public/{filename}', function ($filename) {
    $path = public_path("css") . '\\' . $filename;
    if (!File::exists($path)) {
        abort(404);
    }
    $file = File::get($path);
    $response = Response::make($file, 200);
    $response->header("Content-Type", "application/octet-stream");
    return $response;
});

Route::get('images/{filename}', function ($filename) {
    $path = storage_path() . '\\images\\' . $filename;
    if (!File::exists($path)) {
        abort(404);
    }
    $file = File::get($path);
    $response = Response::make($file, 200);
    $response->header("Content-Type", "application/octet-stream");
    return $response;
});


Route::get('Report/{filename}', function ($filename) {
    $path = public_path("Reports") . '\\' . $filename;
    if (!File::exists($path)) {
        abort(404);
    }
    $file = File::get($path);
    $response = Response::make($file, 200);
    $response->header("Content-Type", "application/octet-stream");
    return $response;
});

Route::any('{all}', function () {
    return \File::get(public_path() . '/index.html');
})->where('all', '.*');
