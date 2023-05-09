<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Attribute;
use App\Models\Company;

class Category extends Model
{
    use HasFactory;
    
    public $timestamps = false;
    protected $fillable = [
        'name_hu',
        'name_en',
        'parent_category_id'
    ];

    protected $appends = ['parent_category', 'child_categories'];
    protected $with = ['attributes'];
    
    public function parent_category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_category_id', 'id');
    }

    public function child_categories(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_category_id', 'id');
    }

    public function attributes(): BelongsToMany 
    {
        return $this->belongsToMany(Attribute::class);
    }

    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'company_categories');
    }

    public function getParentCategoryAttribute()
    {
        return $this->parent_category()->get()->map->only('id', 'name_hu', 'name_en', 'attributes', 'parent_category')->first();
    }

    protected function getChildCategoriesAttribute()
    {
        return $this->child_categories()->get();
        
    }

        
    public function getAllParentAttributes()
    {
        $allAttributes = collect();
        if($this->parent_category_id){
            $parent = Category::find($this->parent_category_id);
            while ($parent) {
                $allAttributes = $allAttributes->merge($parent->attributes()->get());
                if(isset($parent->parent_category_id)){
                    $parent = Category::find($parent->parent_category_id);
                }
                else {
                    $parent = null;
                }
            }
        }
        
        return $allAttributes;
    }

    public function getAllChildAttributes()
    {
        $allAttributes = collect();

        $getChildAttributes = function($category) use (&$getChildAttributes, &$allAttributes) {
            $childCategories = $category->child_categories()->get();

            foreach ($childCategories as $childCategory) {
                $allAttributes = $allAttributes->merge($childCategory->attributes()->get());
                $getChildAttributes($childCategory);
            }
        };

        $getChildAttributes($this);

        return $allAttributes;
    }


}
