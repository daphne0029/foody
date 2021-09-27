<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Exception;

class UserFoodController extends Controller
{
    private $privateApiUrl;

    public function __construct()
    {
        $this->privateApiUrl = env('PRIVATE_API_URL');
    }

    public function foods(int $userId)
    {
        $response = Http::get("{$this->privateApiUrl}/users/{$userId}/foods");
        $response->throw();
        return $response->json();
    }

    public function food(int $userId, int $foodId)
    {
        $response = Http::get("{$this->privateApiUrl}/users/{$userId}/foods/{$foodId}");
        $response->throw();
        return $response->json();
    }

    public function deleteFood(int $userId, int $foodId)
    {
        $response = Http::delete("{$this->privateApiUrl}/users/{$userId}/foods/{$foodId}");
        $response->throw();
        return $response->json();
    }

    public function addFood(Request $request, int $userId, int $foodId)
    {
        $servingsPerWeek = $request->input('servingsPerWeek');
        
        $response = Http::put("{$this->privateApiUrl}/users/{$userId}/foods/{$foodId}", [
            'servingsPerWeek' => $servingsPerWeek
        ]);
        $response->throw();
        return $response->json();
    }
}
