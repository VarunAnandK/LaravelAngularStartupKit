<?php

namespace App\Http\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\user_role;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    public function __construct()
    { }
    public function List()
    {
        $data = user_role::where('id', ">", "1")->get();
        return response($data);
    }
    public function WithList()
    {
        $data = user_role::where('id', ">", "1")->get();
        return response($data);
    }
    public function ById($id)
    {
        $data = user_role::find($id);
        return response($data);
    }
    public function Insert(Request $request)
    {
        $data = new user_role();
        $data = $request->only($data->fillable);
        if (user_role::where('id', '!=', $data["id"])->where('name', $data["name"])->count() > 0) {
            return response(["Type" => "E", "Message" => "Record already exits"]);
        } else {
            $result = user_role::create($data);
            return response(["Type" => "S", "Message" => "Created successfully", "Id" => $result["id"]]);
        }
    }
    public function Update(Request $request, $id)
    {
        $data = new user_role();
        $data =  $request->only($data->fillable);
        if (user_role::where('id', '!=', $data["id"])->where('name', $data["name"])->count() > 0) {
            return response(["Type" => "E", "Message" => "Record already exits"]);
        } else {
            user_role::findOrFail($id)->update($data);
            return response(["Type" => "S", "Message" => "Updated successfully", "Id" => $id]);
        }
    }
    public function Delete($id)
    {
        user_role::findOrFail($id)->delete();
        return response(["Type" => "S", "Message" => "Deleted successfully"]);
    }
}
