<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DashboardController extends Controller
{
    function index()
    {
        $posts = Post::query()->where('user_id', Auth::user()->id)->get();
        return inertia('Admin/Dashboard', compact('posts'));
    }
    function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'kategori' => 'required',
            'image' => 'required|image',
        ]);
        $file_path = $request->file('image')->store();
        $post = new Post();
        $post->nama = $request->nama;
        $post->kategori = $request->kategori;
        $post->user_id = Auth::user()->id;
        $post->image = $file_path;
        $post->save();
    }
    function update(Post $post, Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'kategori' => 'required',
        ]);

        $post->nama = $request->nama;
        $post->kategori = $request->kategori;

        if ($request->file('image') != null) {
            $request->validate([
                'image' => 'image'
            ]);
            // delete old photo
            Storage::delete($post->image);

            // insert new photo
            $file_path = $request->file('image')->store();
            $post->image = $file_path;
        }
        $post->save();
    }
    function destroy(Post $post)
    {
        // delete image first
        Storage::delete($post->image);
        // delete record
        $post->delete();
    }
}
