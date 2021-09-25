<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LikeController extends Controller
{
    //

    public function like(Post $post)
    {
        $user = Auth::User();

        $like = Like::where('user_id', $user->id)->where('post_id', $post->id)->first();

        if ($like) {
            // $like->state = !$like->state;
            $like->delete();
            $post->likes -= 1;
        } else {
            $like = Like::create([
                "user_id" => $user->id,
                "post_id" => $post->id,
                "state" => True
            ]);

            $post->likes += 1;
        }

        $post->save();

        return response()->json([
            // 'state' => $like ? true : false,
            'numberLike' => $post->likes
        ], 200);
    }

    public function index(Post $post, Request $request)
    {
        $number = $request->number;

        $user = auth()->user();

        $likes = Like::where("post_id", $post->id)
            ->join('users', 'users.id', '=', 'likes.user_id')
            ->join('profiles', 'profiles.user_id', '=', 'likes.user_id')
            ->select('likes.post_id', 'likes.user_id', 'users.name', 'users.username', 'profiles.image')
            ->offset($number * 6 - 6)
            ->limit(6)
            ->get();

        foreach ($likes as $like) {
            $like = $like->setAttribute(
                'is_follow',
                DB::table('profile_user')
                    ->where('profile_user.profile_id', "=", $like->user_id)
                    ->where('profile_user.user_id', '=', $user->id)
                    ->exists()
            );
        }

        return response()->json([
            'likes' => $likes
        ], 200);
    }
}
