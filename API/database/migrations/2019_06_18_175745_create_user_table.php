<?php

use App\Helper\BlueprintHelper;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            BlueprintHelper::BaseEntity($table);
            $table->bigInteger("user_role_id")->unsigned()->index();
            $table->foreign("user_role_id")->references("id")->on("user_role")->onDelete("restrict");
            $table->string("user_name");
            $table->string("password");
            $table->longText("email")->nullable();
            $table->string('api_token', 100)->nullable();
            $table->rememberToken();
            $table->timestamp('email_verified_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user');
    }
}
