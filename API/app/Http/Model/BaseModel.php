<?php

namespace App\Http\Model;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use OwenIt\Auditing\Contracts\Auditable;

class BaseModel extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    public static function boot()
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
