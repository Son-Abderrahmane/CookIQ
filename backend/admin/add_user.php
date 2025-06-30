<?php
require_once '../config/database.php';
require_once '../config/Session.php';

$session = new Session();
$session->requireAdmin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->getConnection();

    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];
    $role = filter_input(INPUT_POST, 'role', FILTER_SANITIZE_STRING);

    // Validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = "Invalid email format";
    } elseif (strlen($password) < 8) {
        $_SESSION['error'] = "Password must be at least 8 characters long";
    } elseif (!in_array($role, ['admin', 'user'])) {
        $_SESSION['error'] = "Invalid role";
    } else {
        // Check if email already exists
        $query = "SELECT id FROM users WHERE email = :email";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $_SESSION['error'] = "Email already exists";
        } else {
            // Hash password and create user
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $query = "INSERT INTO users (email, password, role) VALUES (:email, :password, :role)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":password", $hashed_password);
            $stmt->bindParam(":role", $role);

            if ($stmt->execute()) {
                $_SESSION['success'] = "User created successfully";
            } else {
                $_SESSION['error'] = "Failed to create user";
            }
        }
    }
}

header('Location: dashboard.php');
exit();
?> 