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

// Get statistics
$stats = [
    'users' => 0,
    'recipes' => 0,
    'reports' => 0,
    'comments' => 0
];

// Count users
try {
    $query = "SELECT COUNT(*) as count FROM users";
    $stmt = $db->query($query);
    $stats['users'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
} catch (PDOException $e) {
    $stats['users'] = 0;
}

// Count recipes
try {
    $query = "SELECT COUNT(*) as count FROM recipes";
    $stmt = $db->query($query);
    $stats['recipes'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
} catch (PDOException $e) {
    $stats['recipes'] = 0;
}

// Count reports
try {
    $query = "SELECT COUNT(*) as count FROM reports";
    $stmt = $db->query($query);
    $stats['reports'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
} catch (PDOException $e) {
    $stats['reports'] = 0;
}

// Count comments
try {
    $query = "SELECT COUNT(*) as count FROM comments";
    $stmt = $db->query($query);
    $stats['comments'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
} catch (PDOException $e) {
    $stats['comments'] = 0;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - IngRecipes</title>
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
        .stat-card {
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        body {
            background-color: #f8f9fa;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-3 col-lg-2 sidebar">
                <h3 class="text-white text-center mb-4">Admin Panel</h3>
                <a href="dashboard.php" class="active">
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
                <a href="settings.php">
                    <i class="bi bi-gear"></i> Settings
                </a>
                <a href="../auth/logout.php" class="mt-5">
                    <i class="bi bi-box-arrow-right"></i> Logout
                </a>
            </div>
            
            <!-- Main Content -->
            <div class="col-md-9 col-lg-10 p-4">
                <h2 class="mb-4">Dashboard</h2>
                
                <!-- Statistics Cards -->
                <div class="row">
                    <div class="col-md-3">
                        <div class="stat-card bg-primary text-white">
                            <h3><?php echo $stats['users']; ?></h3>
                            <p>Total Users</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-success text-white">
                            <h3><?php echo $stats['recipes']; ?></h3>
                            <p>Total Recipes</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-warning text-white">
                            <h3><?php echo $stats['reports']; ?></h3>
                            <p>Active Reports</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card bg-info text-white">
                            <h3><?php echo $stats['comments']; ?></h3>
                            <p>Total Comments</p>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="row mt-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5>Quick Actions</h5>
                            </div>
                            <div class="card-body">
                                <a href="recipes.php" class="btn btn-primary me-2">Manage Recipes</a>
                                <a href="users.php" class="btn btn-success me-2">Manage Users</a>
                                <a href="reports.php" class="btn btn-warning">View Reports</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5>Recent Activity</h5>
                            </div>
                            <div class="card-body">
                                <p>No recent activity to display.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 