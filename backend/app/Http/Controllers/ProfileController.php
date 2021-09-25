<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Symfony\Component\ErrorHandler\Debug;

class ProfileController extends Controller
{
    public function index(User $user)
    {
        $follows = (auth()->user()) ? auth()->user()->following->contains($user->profile) : false;

        $postCount = Cache::remember(
            'count.posts.' . $user->id,
            now()->addSeconds(10),
            function () use ($user) {
                return $user->posts->count();
            }
        );

        $followersCount = Cache::remember(
            'count.followers.' . $user->id,
            now()->addSeconds(10),
            function () use ($user) {
                return $user->profile->followers->count();
            }
        );

        $followingCount = Cache::remember(
            'count.following.' . $user->id,
            now()->addSeconds(10),
            function () use ($user) {
                return $user->following->count();
            }
        );

        foreach ($user->posts as $post) {
            $post->images;
        }
        return response()->json([
            'user' => $user,
            'follow' => $follows,
            'postCount' => $postCount,
            'followersCount' => $followersCount,
            'followingCount' => $followingCount,
        ], 200);
    }

    public function edit(User $user)
    {
        if ($user->id == auth()->user()->id) {
            return response()->json([
                'profile' => $user->profile
            ], 200);
        } else {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }
    }

    public function update(Request $request, User $user)
    {
        // Log::debug($request->get('website'));
        $profile = $request->validate([
            'bio' => ['sometimes', 'string', 'nullable'],
            'website' => ['sometimes', 'string', 'nullable'],
            'description' => ['sometimes', 'string', 'nullable'],
            'image' => ['sometimes', 'image', 'nullable']
        ]);

        Log::debug($request->file('image'));

        if ($request->file('image')) {
            $originalName = $request->file('image')->getClientOriginalName();
            $imagePath = $request->file('image')->storeAs('/profile', $originalName, 'public');
            // $image = Image::make(public_path("storage/{$imagePath}"))->fit(300, 300);
            // $image->save();
            $imageArray = ['image' => $imagePath];
        }
        // Log::debug($imageArray);
        auth()->user()->profile->update(array_merge(
            $profile,
            $imageArray ?? [],
        ));

        return response()->json([
            'message' => 'Update success',
            // 'user' => auth()->user()
        ], 200);
    }

    // public function search (Request $request){
    //     Log::debug($request->q);
    // }

    public function search(Request $request)
    {
        $q = $request->q;

        $users = Cache::remember(
            'search.result.' . $q,
            now()->addSeconds(10),
            function () use ($q) {
                $user =  User::where('username', 'LIKE', '%' . $q . '%')->orWhere('email', 'LIKE', '%' . $q . '%')->get();
                foreach ($user as $u) {
                    $u->profile->image;
                }

                return $user;
            }
        );
        // $users = User::where('username', 'LIKE', '%' . $q . '%')->orWhere('email', 'LIKE', '%' . $q . '%')->get();
        // if (count($user) > 0)
        //     return view('profiles.search')->withDetails($user)->withQuery($q);
        // return view('profiles.search')->withMessage('No results found.');

        return response()->json([
            'profiles' => $users
        ], 200);
    }

    
}
