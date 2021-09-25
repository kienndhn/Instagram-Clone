<?php

namespace App\Http\Controllers;

use App\Models\User;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {

            $error = ['email' => 'Email not exist'];

            return response()->json(
                [
                    'errors' => $error
                ],
                503
            );
            // throw new \Exception('email not found');
        }

        if (!Hash::check($request->password, $user->password)) {
            $error = ['password' => 'Password incorrect'];
            return response()->json(
                [
                    'error' => $error
                ],
                503
            );
        }

        $tokenResult = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message'=>'Login Success',
            'access_token' => $tokenResult,
            'token_type' => 'Bearer',
            'name' => $user->name,
            'username' => $user->username,
            'image' => $user->profile->image
        ], 200);
    }

    public function register(Request $request)
    {
        Log::debug($request);;
        // return $request;
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'username' => $validatedData['username'],
            'password' => Hash::make($validatedData['password']),
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message'=>'Register Success',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'name' => $user->name,
            'username' => $user->username,
            'image' => $user->profile->image
        ], 200);
    }

    public function logout()
    {
        // Auth::user()->tokens()->where('id',$id)->delete();

        $user = Auth::user();

        $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();

        return response()->json([
            'message' => 'Logout Success'
        ], 200);
    }
}
