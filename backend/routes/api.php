<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/login', '\App\Http\Controllers\AuthController@login')->name('login');

Route::post('/register', [\App\Http\Controllers\AuthController::class, "register"]);

Route::middleware('auth:sanctum')->group(function () {
    
    Route::get('/', [App\Http\Controllers\PostController::class, "index"]);

    Route::post('/logout', [\App\Http\Controllers\AuthController::class, "logout"]);

    Route::put('/profile/{user}', [App\Http\Controllers\ProfileController::class, "update"]);

    Route::get('/profile/{user}', [\App\Http\Controllers\ProfileController::class, "index"]);

    Route::get('/profile/{user}/edit', [App\Http\Controllers\ProfileController::class, "edit"]);

    Route::any('/search', [App\Http\Controllers\ProfileController::class, "search"]);

    Route::post('/post', [App\Http\Controllers\PostController::class, "store"]);

    Route::get('/post/{post}', [\App\Http\Controllers\PostController::class, "show"]);

    Route::post('/comments/store', [App\Http\Controllers\CommentController::class, "store"]);

    Route::get('/comments/{post}', [App\Http\Controllers\CommentController::class, "index"]);

    Route::post('/follow/{user}', [App\Http\Controllers\FollowController::class, "store"]);

    Route::get('/follow/{user}', [\App\Http\Controllers\FollowController::class, "followers"]);

    Route::get('/following/{user}', [\App\Http\Controllers\FollowController::class, "following"]);

    Route::post('/like/{post}', [App\Http\Controllers\LikeController::class, "like"]);

    Route::get('/like/{post}', [App\Http\Controllers\LikeController::class, 'index']);
});



// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
