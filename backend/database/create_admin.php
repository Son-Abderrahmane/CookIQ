<?php
require_once '../config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    // Admin credentials
    $admin_email = "admin@ingrecipes.com";
    $admin_password = "Admin@123"; // This will be hashed
    $admin_name = "Admin User";

    // Hash the password
    $hashed_password = password_hash($admin_password, PASSWORD_DEFAULT);

    // Check if admin already exists
    $query = "SELECT id FROM users WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":email", $admin_email);
    $stmt->execute();

    if ($stmt->rowCount() == 0) {
        // Insert admin user
        $query = "INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, 'admin')";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":name", $admin_name);
        $stmt->bindParam(":email", $admin_email);
        $stmt->bindParam(":password", $hashed_password);

        if ($stmt->execute()) {
            echo "Admin user created successfully!<br>";
            echo "Email: " . $admin_email . "<br>";
            echo "Password: " . $admin_password . "<br>";
        } else {
            echo "Error creating admin user.";
        }
    } else {
        echo "Admin user already exists!<br>";
        echo "Email: " . $admin_email . "<br>";
        echo "Password: " . $admin_password . "<br>";
    }
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?> 