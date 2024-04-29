<?php

spl_autoload_register(function ($class) {
    $prefix = "App";
    $base_dir = __DIR__ ."/src/";
    $len = strlen($prefix);
    if(strncmp($prefix, $class, $len) !== 0) {
        return;
    }
    $relavite_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relavite_class) . '.php';
    if(file_exists($file)) {
        require $file;
    }

});
