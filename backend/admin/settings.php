<?php
require_once '../config/database.php';
session_start();

// Check if user is logged in and is admin
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: ../auth/login.php');
    exit();
}

// Connect to database
$database = new Database();
$db = $database->getConnection();

// Handle settings update
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['update_settings'])) {
        $api_key = filter_input(INPUT_POST, 'api_key', FILTER_SANITIZE_STRING);
        $maintenance_mode = isset($_POST['maintenance_mode']) ? 1 : 0;
        $enable_comments = isset($_POST['enable_comments']) ? 1 : 0;
        $enable_ratings = isset($_POST['enable_ratings']) ? 1 : 0;

        $query = "UPDATE settings SET 
                  api_key = :api_key,
                  maintenance_mode = :maintenance_mode,
                  enable_comments = :enable_comments,
                  enable_ratings = :enable_ratings
                  WHERE id = 1";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(":api_key", $api_key);
        $stmt->bindParam(":maintenance_mode", $maintenance_mode);
        $stmt->bindParam(":enable_comments", $enable_comments);
        $stmt->bindParam(":enable_ratings", $enable_ratings);
        $stmt->execute();

        $success_message = "Settings updated successfully!";
    }
}

// Get current settings
$query = "SELECT * FROM settings WHERE id = 1";
$stmt = $db->prepare($query);
$stmt->execute();
$settings = $stmt->fetch(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings - IngRecipes Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        .sidebar {
            min-height: 100vh;
            background-color: #343a40;
            padding-top: 20px;
        }
        .sidebar a {
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            display: block;
        }
        .sidebar a:hover {
            background-color: #495057;
        }
        .sidebar a.active {
            background-color: #0d6efd;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-3 col-lg-2 sidebar">
                <h3 class="text-white text-center mb-4">Admin Panel</h3>
                <a href="dashboard.php">
                    <i class="bi bi-speedometer2"></i> Dashboard
                </a>
                <a href="recipes.php">
                    <i class="bi bi-book"></i> Recipes
                </a>
                <a href="users.php">
                    <i class="bi bi-people"></i> Users
                </a>
                <a href="comments.php">
                    <i class="bi bi-chat"></i> Comments
                </a>
                <a href="reports.php">
                    <i class="bi bi-flag"></i> Reports
                </a>
                <a href="mealplans.php">
                    <i class="bi bi-calendar"></i> Meal Plans
                </a>
                <a href="settings.php" class="active">
                    <i class="bi bi-gear"></i> Settings
                </a>
                <a href="../auth/logout.php" class="mt-5">
                    <i class="bi bi-box-arrow-right"></i> Logout
                </a>
            </div>

            <!-- Main Content -->
            <div class="col-md-9 col-lg-10 p-4">
                <h2 class="mb-4">Settings</h2>

                <?php if (isset($success_message)): ?>
                <div class="alert alert-success">
                    <?php echo $success_message; ?>
                </div>
                <?php endif; ?>

                <div class="card">
                    <div class="card-body">
                        <form method="POST">
                            <div class="mb-3">
                                <label for="api_key" class="form-label">API Key</label>
                                <input type="text" class="form-control" id="api_key" name="api_key" 
                                       value="<?php echo htmlspecialchars($settings['api_key']); ?>" required>
                                <div class="form-text">Your API key for external recipe services.</div>
                            </div>

                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="maintenance_mode" 
                                           name="maintenance_mode" <?php echo $settings['maintenance_mode'] ? 'checked' : ''; ?>>
                                    <label class="form-check-label" for="maintenance_mode">Maintenance Mode</label>
                                </div>
                                <div class="form-text">Enable this to show a maintenance page to regular users.</div>
                            </div>

                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="enable_comments" 
                                           name="enable_comments" <?php echo $settings['enable_comments'] ? 'checked' : ''; ?>>
                                    <label class="form-check-label" for="enable_comments">Enable Comments</label>
                                </div>
                                <div class="form-text">Allow users to comment on recipes.</div>
                            </div>

                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="enable_ratings" 
                                           name="enable_ratings" <?php echo $settings['enable_ratings'] ? 'checked' : ''; ?>>
                                    <label class="form-check-label" for="enable_ratings">Enable Ratings</label>
                                </div>
                                <div class="form-text">Allow users to rate recipes.</div>
                            </div>

                            <button type="submit" name="update_settings" class="btn btn-primary">Save Settings</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 