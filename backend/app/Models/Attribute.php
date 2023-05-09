<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Category;

class Attribute extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'name_hu',
        'name_en',
        'type',
        'unit'
    ];

    protected $with = ['categories'];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class)->select(['categories.name_hu', 'categories.name_en']);
    }
}
