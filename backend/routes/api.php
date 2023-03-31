<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;


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

Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);

Route::get('/categories', [CategoryController::class, 'index']);
