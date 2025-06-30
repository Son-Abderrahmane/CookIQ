<?php
require_once '../config/database.php';
require_once '../config/Session.php';

$session = new Session();
$session->requireAdmin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->getConnection();

    $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_STRING);
    $ingredients = filter_input(INPUT_POST, 'ingredients', FILTER_SANITIZE_STRING);
    $instructions = filter_input(INPUT_POST, 'instructions', FILTER_SANITIZE_STRING);

    // Validation
    if (empty($title)) {
        $_SESSION['error'] = "Title is required";
    } elseif (empty($ingredients)) {
        $_SESSION['error'] = "Ingredients are required";
    } elseif (empty($instructions)) {
        $_SESSION['error'] = "Instructions are required";
    } else {
        $query = "INSERT INTO recipes (title, ingredients, instructions) VALUES (:title, :ingredients, :instructions)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":title", $title);
        $stmt->bindParam(":ingredients", $ingredients);
        $stmt->bindParam(":instructions", $instructions);

        if ($stmt->execute()) {
            $_SESSION['success'] = "Recipe created successfully";
        } else {
            $_SESSION['error'] = "Failed to create recipe";
        }
    }
}

header('Location: dashboard.php');
exit();
?> 