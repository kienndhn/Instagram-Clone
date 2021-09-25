<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class FollowController extends Controller
{
    public function __construct()

    {
        $this->middleware('auth');
    }

    public function store(User $user)
    {
        auth()->user()->following()->toggle($user->profile->id);

        return response()->json([
            "message" => "success",
            // "state" => auth()->user()->following()->toggle($user->profile->id)
        ], 200);
    }

    public function followers(User $user)
    {
        // $q=$request->q;

        $auth = auth()->user();

        $followers = Cache::remember(
            'followers.' . $user,
            now()->addSeconds(10),
            function () use ($user, $auth) {
                $followers = $user->profile->followers;
                foreach ($followers as $f) {
                    $f->profile;

                    $f = $f->setAttribute(
                        'is_follow',
                        DB::table('profile_user')
                            ->where('profile_user.profile_id', "=", $f->user_id)
                            ->where('profile_user.user_id', '=', $auth->id)
                            ->exists()
                    );
                }

                return $followers;
            }
        );

        $subset = $followers->map(function ($follower) {
            // return $followers->only(['id', 'name', 'username', $followers->profile]);

            return [
                "id" => $follower->id,
                "is_follow" => $follower->is_follow,
                "name" => $follower->name,
                "username" => $follower->username,
                "image" => $follower->profile->image,
            ];
        });

        return response()->json([
            'followers' => $subset
        ], 200);
    }

    public function following(User $user)
    {
        $auth = auth()->user();

        $following = Cache::remember(
            'following.' . $user->id,
            now()->addSeconds(10),
            function () use ($user, $auth) {
                $following = $user->following;
                foreach ($following as $f) {
                    $f->user;
                    $f = $f->setAttribute(
                        'is_follow',
                        DB::table('profile_user')
                            ->where('profile_user.profile_id', "=", $f->user_id)
                            ->where('profile_user.user_id', '=', $auth->id)
                            ->exists()
                    );
                }
                return $following;
            }
        );

        $subset = $following->map(function ($f) {
            // return $followers->only(['id', 'name', 'username', $followers->profile]);

            return [
                "id" => $f->user->id,
                "is_follow" => $f->is_follow,
                "name" => $f->user->name,
                "username" => $f->user->username,
                "image" => $f->image,
            ];
        });

        return response()->json([
            "following" => $subset,
        ], 200);
    }
}
