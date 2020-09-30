<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user')->insert([
            'id' => '1',
            'user_name' => "demo",
            'user_role_id' => 1,
            'password' => Crypt::encryptString('123'),
            'email' => 'demo@gmail.com',
            'created_by_id' => '1',
            'status' => '1'
        ]);
    }
}
