<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Category;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'contact_phone',
        'contact_email',
        'address_id',
        'image_id'
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class);
    }

    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'company_categories');
    }
}
