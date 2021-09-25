<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Image;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Symfony\Component\ErrorHandler\Debug;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $postRequest = $request->validate([
            'caption' => ['string', 'required'],
            'image.*' => ['image', 'required']
        ]);

        // $originalName = $request->file('image')->getClientOriginalName();
        $post = auth()->user()->posts()->create([
            'caption' => $request['caption']
        ]);

        foreach ($request->file('image') as $image) {

            $originalName = $image->getClientOriginalName();
            $imagePath = $image->storeAs('/posts', $originalName, 'public');

            $img = new Image([
                'path' => $imagePath,
            ]);

            $post->images()->save($img);
        }

        return response()->json([
            'message' => 'post success'
        ], 200);
    }

    public function show(Post $post)
    {
        $post->images;
        // $post->comments;
        // $post->user->posts;
        $post->user->profile;
        // $posts = $post->user->posts->except($post->id);
        // foreach ($post->comments as $comment) {
        //     $comment->user->profile;
        // }
        // $post->like;
        $user = auth()->user();

        Log::debug($user);

        $state = $user ? (Like::where('user_id', $user->id)->where('post_id', $post->id)->first() ? true : false) : false;

        $post = $post->setAttribute('state', $state);

        $posts = $post->user->posts->except($post->id)->take(6);

        foreach($posts as $p) {
            $p->images;
        }

        // $posts= Post::where('user_id', $post->user_id);

        return response()->json([
            'post' => $post,
            'posts' => $posts
        ], 200);
    }

    public function index(Request $request)
    {
        $page = $request->page;

        $user = auth()->user();
        $user = Cache::remember(
            'user',
            now()->addSeconds(30),
            function () use ($user) {
                $image = $user->profile()->get("profiles.image");
                return $user->setAttribute('image', $image[0]->image);
            }
        );

        // $users_id = $user->following()->pluck('profiles.user_id');

        $users_id = Cache::remember(
            'users.id.' . $user->id,
            now()->addMinutes(1),
            function () use ($user) {
                return ($user->following()->pluck('profiles.user_id'))->push($user->id);
            }
        );

        $sugg_user = Cache::remember(
            "suggest.id." . $user->id,
            now()->addSeconds(10),
            function () use ($users_id) {
                return User::whereNotIn('users.id', $users_id->toArray())
                    ->with(array('profile' => function ($query) {
                        $query
                            ->select("profiles.user_id", "profiles.image")->get();
                    }))
                    ->select("users.id", "users.name", "users.username")
                    ->get();
            }
        );

        $posts = Post::whereIn('user_id', $users_id)
            ->orderBy("posts.id", "desc")
            ->with(
                array(
                    'images',
                    'comments' => function ($query) {
                        $query
                            ->join('users', 'users.id', '=', 'comments.user_id')
                            ->join('profiles', 'profiles.user_id', '=', 'comments.user_id')
                            ->select('comments.id', 'comments.post_id', 'comments.body', 'comments.created_at', 'profiles.image', 'users.name', 'users.username')
                            ->orderBy('comments.id', 'desc')
                            ->limit(2);
                    },
                    'user' => function ($query) {
                        $query
                            ->join('profiles', 'users.id', '=', 'profiles.id')
                            ->select(["users.id", "users.name", "users.username", "profiles.image"]);
                    }
                )
            )
            ->offset($page * 2 - 2)
            ->limit(2)
            ->get();

        foreach ($posts as $post) {
            $state = Like::where('user_id', $user->id)->where('post_id', $post->id)->first() ? true : false;

            $post = $post->setAttribute('state', $state);
        }

        return response()->json([
            "posts" => $posts,
            "user" => $user,
            "sugg_users" => $sugg_user
        ], 200);
    }
}
