<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_role')->insert([
            'id' => '1',
            'name' => "Super Admin",
            'landing_page' => 'Admin/Dashboard',
            'created_by_id' => '1',
            'status' => '1'
        ]);
    }
}
