<?php
require_once '../config/database.php';

// Connect to database
$database = new Database();
$db = $database->getConnection();

// Admin credentials
$email = 'admin@cookiq.com';
$password = 'admin123';
$role = 'admin';

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

try {
    // Check if user with this email already exists
    $query = "SELECT id FROM users WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // Update existing user to admin
        $query = "UPDATE users SET 
                  password = :password,
                  role = :role
                  WHERE email = :email";
    } else {
        // Create new admin user
        $query = "INSERT INTO users (email, password, role) 
                  VALUES (:email, :password, :role)";
    }

    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $hashed_password);
    $stmt->bindParam(":role", $role);
    
    if ($stmt->execute()) {
        echo "Admin account created/updated successfully!<br>";
        echo "Email: " . $email . "<br>";
        echo "Password: " . $password . "<br>";
        echo "<a href='login.php'>Go to Login</a>";
    } else {
        echo "Error creating admin account.";
    }
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?> 