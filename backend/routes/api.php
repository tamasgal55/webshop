<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AttributeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/test', [UserController::class, 'relationshipTestEndpoint']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/refresh', [AuthenticatedSessionController::class, 'show']);

Route::put('/users/language', [UserController::class, 'updateLanguage']);

Route::get('/user/profile', [UserController::class, 'getUserProfile']);
Route::put('/user/profile', [UserController::class, 'updateUserProfile']);
Route::get('/user/model_data', [UserController::class, 'getModelData']);

Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);

Route::get('/company/category', [CompanyController::class, 'getCategories']);
Route::get('/company/{id}', [CompanyController::class, 'show']);
Route::get('/company', [CompanyController::class, 'index']);
Route::post('/company', [CompanyController::class, 'store']);
Route::post('/company/category', [CompanyController::class, 'saveCategories']);

Route::get('/category/tree', [CategoryController::class, 'getCategoryTree']);
Route::get('/category/{id}', [CategoryController::class, 'show']);
Route::get('/category', [CategoryController::class, 'index']);
Route::post('/category', [CategoryController::class, 'store']);
Route::delete('/category/{id}', [CategoryController::class, 'destroy']);
Route::patch('/category/{id}', [CategoryController::class, 'update']);

Route::get('/attribute', [AttributeController::class, 'index']);
Route::post('/attribute', [AttributeController::class, 'store']);
Route::delete('/attribute/{id}', [AttributeController::class, 'destroy']);
Route::patch('/attribute/{id}', [AttributeController::class, 'update']);