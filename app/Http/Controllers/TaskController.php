<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Task::class, 'task');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return TaskResource::collection($request->user()->tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        return new TaskResource($request->user()->tasks()->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task, Request $request)
    {
        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());
        return new TaskResource($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task, Request $request)
    {
        $task->delete();
        return response('', 204);
    }

    /**
     * Toggle the specified resource state on/of.
     */
    public function toggle_state(Task $task)
    {
        $this->authorize('toggleState', $task);
        $task->update(['is_done' => !$task->is_done]);
        return new TaskResource($task);
    }
}