<?php

namespace App\Http\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserController extends Controller
{
    private $apiToken;
    public function __construct()
    {
        $this->apiToken = uniqid(base64_encode(Str::random(60)));
    }

    public function List()
    {
        $data = user::get();
        return response($data);
    }
    public function WithList()
    {
        $data = user::with(['user_role'])->where("id", ">", 1)->get();
        return response($data);
    }
    public function ById($id)
    {
        $data = user::find($id);
        return response($data);
    }
    public function Insert(Request $request)
    {
        $data = new user();
        $data = $request->only($data->fillable);

        if (user::where('id', '!=', $data["id"])->where('user_name', $data["user_name"])->count() > 0) {
            return response(["Type" => "E", "Message" => $data["user_name"] . " already exits"]);
        } else {
            if (user::where('id', '!=', $data["id"])->where('email', $data["email"])->count() > 0) {
                return response(["Type" => "E", "Message" => $data["email"] . " already exits"]);
            } else {
                $data['password'] = Crypt::encryptString($data['password']);
                $result = user::create($data);
                return response(["Type" => "S", "Message" => "Created successfully", "Id" => $result["id"]]);
            }
        }
    }
    public function Update(Request $request, $id)
    {
        $data = new user();
        $data =  $request->only($data->fillable);
        if (user::where('id', '!=', $data["id"])->where('user_name', $data["user_name"])->count() > 0) {
            return response(["Type" => "E", "Message" => $data["user_name"] . " already exits"]);
        } else {
            if (user::where('id', '!=', $data["id"])->where('email', $data["email"])->count() > 0) {
                return response(["Type" => "E", "Message" => $data["email"] . " already exits"]);
            } else {
                user::findOrFail($id)->update($data);
                return response(["Type" => "S", "Message" => "Updated successfully", "Id" => $id]);
            }
        }
    }
    public function Delete($id)
    {
        user::findOrFail($id)->delete();
        return response(["Type" => "S", "Message" => "Deleted successfully"]);
    }


    public function Login(Request $request)
    {
        $user = new user();
        $user = $request->only($user->fillable);
        $data = user::where("user_name", $user["user_name"])->with(['user_role'])->first();
        if ($data) { // Check User name exists
            if ($data["user_role_id"] == 1) {
                if (Crypt::decryptString($data->password) ==  $user["password"]) { // check password match
                    if ($data->api_token == null || $data->api_token == "") {
                        DB::table('user')->where('id', $data->id)->update(["api_token" => $this->apiToken]); // update api token
                        $data->api_token = $this->apiToken;
                    }
                    return response(["Type" => "S", "Message" => "Login successfully", "AdditionalData" => ['User' =>  $data]]);
                } else {
                    return response(["Type" => "E", "Message" => "Password incorrect"]);
                }
            } else {
                return response(["Type" => "E", "Message" => "Invalid User"]);
            }
        } else {
            return response(["Type" => "E", "Message" => "User name incorrect"]);
        }
    }
    public function ResetPassword(Request $request)
    {
        // if (user::where("email", $request['email'])->count() > 0) {
        //     $new_password = rand(10000000, 99999999);
        //     $view = view('ForgotPassword', ["new_password" => $new_password]);
        //     $view->render();
        //     MailHelper::SendMail($request["email"], "Forgot password", $view);
        //     $data = user::where("email", $request['email'])->first();
        //     user::find($data["id"])->update(["password" => Crypt::encryptString($new_password)]);
        //     return response(["Type" => "S", "Message" => "Check mail, password reset sucessfully."]);
        // } else {
        //     return response(["Type" => "E", "Message" => "Email is incorrect"]);
        // }
    }

    public function ChangePassword(Request $request)
    {
        $user = user::find($request['id']);
        $userdata = new user();
        $userdata["password"] = Crypt::encryptString($request["confirmpassword"]);
        user::findOrFail($user["id"])->update($userdata->toArray());
        return response(["Type" => "S", "Message" => "User Change Password successfully"]);
    }

    public function Decrypt($data)
    {
        return Crypt::decryptString($data);
    }
}
