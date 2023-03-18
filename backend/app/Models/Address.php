<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Address extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $fillable = [
        'country',
        'postal_code',
        'city',
        'address_line_one',
        'address_line_two'
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
