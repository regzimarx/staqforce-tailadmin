<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

abstract class Controller
{
    protected function inertia($component, $props = [])
    {
        return Inertia::render($component, $props);
    }
}
