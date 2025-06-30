<?php
$host = "localhost";
$username = "root";
$password = "";

try {
    // Create connection without database
    $conn = new PDO("mysql:host=$host", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create database if it doesn't exist
    $sql = "CREATE DATABASE IF NOT EXISTS ingrecipes";
    $conn->exec($sql);
    echo "Database created successfully<br>";
    
    // Select the database
    $conn->exec("USE ingrecipes");
    
    echo "Database setup completed. Now running table creation...<br>";
    
    // Include the setup script to create tables
    include 'setup.php';
    
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?> 