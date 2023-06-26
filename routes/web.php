<?php

use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::get('/register', 'registerPage')->name('register');
    Route::post('/register', 'registerAction')->name('register.action');

    Route::get('/login', 'loginPage')->name('login');
    Route::post('/login', 'loginAction')->name('login.action');
});

Route::get('/', function () {
    return Inertia::render('Client/Index');
})->name('index');
Route::get('/wizard-form', function () {
    return Inertia::render('Client/Wizard');
});
Route::middleware('auth')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::controller(DashboardController::class)->group(function () {
        Route::get('/admin', 'index');
        Route::post('/admin', 'store');
        Route::put('/admin/{post}', 'update')->name('post.update');
        Route::delete('/admin/{post}', 'destroy');
    });
});
