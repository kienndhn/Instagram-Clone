<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    //
    // public function index()
    // {
    //     return Comment::all();
    // }

    public function store(Request $request)
    {
        $post = Post::findOrFail($request->post_id);

        $comment = Comment::create([
            'body' => $request->body,
            'user_id' => Auth::id(),
            'post_id' => $post->id,
        ]);

        $c= Db::table('users')->where('users.id', $comment->user_id)
        ->join('profiles', 'users.id', '=', 'profiles.user_id')
        ->select('users.username', 'users.name', 'profiles.image')->get();
        
        $post->comments_number += 1;
        $post->save();

        $comment->setAttribute('name', $c[0]->name);
        $comment->setAttribute('username', $c[0]->username);
        $comment->setAttribute('image', $c[0]->image);

        return response()->json([
            "message" => "comment success",
            "comment" => [$comment]
        ], 200);
    }

    public function index(Post $post, Request $request)
    {
        $page = $request->page;

        $comments = DB::table('comments')->where('post_id', $post->id)
            ->join('users', 'comments.user_id', '=', 'users.id')
            ->join('profiles', 'comments.user_id', '=', 'profiles.user_id')
            ->select("comments.*", "users.username", "users.name", "profiles.image")
            ->offset($page * 5 - 5)
            ->limit(5)
            ->get();

        return response()->json([
            "comments" => $comments
        ], 200);
    }
}
