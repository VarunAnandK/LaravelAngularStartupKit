<?php

namespace App\Http\Model;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use OwenIt\Auditing\Contracts\Auditable;

class user extends Authenticatable implements Auditable
{
    use Notifiable, \OwenIt\Auditing\Auditable;
    protected $table = 'user';
    protected $guarded = [];
    public $timestamps = false;

    public function user_role()
    {
        return  $this->belongsTo('App\Http\Model\user_role', "user_role_id", "id");
    }
    protected  static function boot()
    {
        static::creating(function ($model) {
            if (Auth::id() == null) {
                if ($model->created_by_id == 0 || $model->created_by_id == null)
                    $model->created_by_id = Auth::id();
            } else {
                $model->created_by_id = Auth::id();
            }
        });

        static::updating(function ($model) {
            if (Auth::id() == null) {
                if ($model->updated_by_id == 0 || $model->updated_by_id == null)
                    $model->updated_by_id = Auth::id();
            } else {
                $model->updated_by_id = Auth::id();
            }
            $model->updated_on = Carbon::now();
        });

        static::deleting(function ($model) {
            // Cache::forget($model->table);
        });


        parent::boot();
    }
}
