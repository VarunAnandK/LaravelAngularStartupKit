<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class audits extends Model
{
    protected $table = 'audits';
    protected $guarded = [];
    public $timestamps = false;
}
