<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        if (!$request->token_name)
            return $request->user();

        return [
            'user' => $request->user(),
            'token' => $request->user()->createToken($request->token_name)->plainTextToken
        ];
    });

    Route::post('/tokens/create', function (Request $request) {
        return ['token' => $request->user()->createToken($request->token_name)->plainTextToken];
    });

    Route::post('/user/data', function (Request $request) {
        return [
            'user' => $request->user(),
            'token' => $request->user()->createToken($request->token_name)->plainTextToken
        ];
    });

    Route::resource('/tasks', TaskController::class);
    Route::put('/tasks/toggle/{task}', [TaskController::class, 'toggle_state'])->name('tasks.toggle');
});