#!/bin/bash
# Script to regenerate Ziggy routes
echo "Regenerating Ziggy routes..."
php artisan ziggy:generate resources/js/ziggy.js
echo "Routes regenerated successfully!"