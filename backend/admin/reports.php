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

// Handle report status update
if (isset($_POST['update_status'])) {
    $report_id = filter_input(INPUT_POST, 'report_id', FILTER_SANITIZE_NUMBER_INT);
    $new_status = filter_input(INPUT_POST, 'new_status', FILTER_SANITIZE_STRING);
    $query = "UPDATE reports SET status = :status WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":status", $new_status);
    $stmt->bindParam(":id", $report_id);
    $stmt->execute();
}

// Handle report deletion
if (isset($_POST['delete_report'])) {
    $report_id = filter_input(INPUT_POST, 'report_id', FILTER_SANITIZE_NUMBER_INT);
    $query = "DELETE FROM reports WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":id", $report_id);
    $stmt->execute();
}

// Get all reports with user and content information
$query = "SELECT r.*, u.username as reporter_username, 
          CASE 
              WHEN r.content_type = 'recipe' THEN (SELECT title FROM recipes WHERE id = r.content_id)
              WHEN r.content_type = 'comment' THEN (SELECT content FROM comments WHERE id = r.content_id)
          END as reported_content
          FROM reports r 
          LEFT JOIN users u ON r.reporter_id = u.id 
          ORDER BY r.created_at DESC";
$stmt = $db->prepare($query);
$stmt->execute();
$reports = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report Management - CookIQ Admin</title>
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
        .reported-content {
            max-width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
                <a href="reports.php" class="active">
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
                <h2 class="mb-4">Report Management</h2>

                <!-- Report List -->
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Reporter</th>
                                <th>Content Type</th>
                                <th>Reported Content</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($reports as $report): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($report['id']); ?></td>
                                <td><?php echo htmlspecialchars($report['reporter_username']); ?></td>
                                <td>
                                    <span class="badge bg-<?php echo $report['content_type'] === 'recipe' ? 'primary' : 'info'; ?>">
                                        <?php echo ucfirst(htmlspecialchars($report['content_type'])); ?>
                                    </span>
                                </td>
                                <td>
                                    <div class="reported-content" title="<?php echo htmlspecialchars($report['reported_content']); ?>">
                                        <?php echo htmlspecialchars($report['reported_content']); ?>
                                    </div>
                                </td>
                                <td><?php echo htmlspecialchars($report['reason']); ?></td>
                                <td>
                                    <span class="badge bg-<?php 
                                        echo match($report['status']) {
                                            'pending' => 'warning',
                                            'resolved' => 'success',
                                            'dismissed' => 'secondary',
                                            default => 'primary'
                                        };
                                    ?>">
                                        <?php echo ucfirst(htmlspecialchars($report['status'])); ?>
                                    </span>
                                </td>
                                <td><?php echo htmlspecialchars($report['created_at']); ?></td>
                                <td>
                                    <form method="POST" class="d-inline">
                                        <input type="hidden" name="report_id" value="<?php echo $report['id']; ?>">
                                        <select name="new_status" class="form-select form-select-sm d-inline-block w-auto" onchange="this.form.submit()">
                                            <option value="pending" <?php echo $report['status'] === 'pending' ? 'selected' : ''; ?>>Pending</option>
                                            <option value="resolved" <?php echo $report['status'] === 'resolved' ? 'selected' : ''; ?>>Resolved</option>
                                            <option value="dismissed" <?php echo $report['status'] === 'dismissed' ? 'selected' : ''; ?>>Dismissed</option>
                                        </select>
                                        <input type="hidden" name="update_status" value="1">
                                    </form>
                                    <form method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete this report?');">
                                        <input type="hidden" name="report_id" value="<?php echo $report['id']; ?>">
                                        <button type="submit" name="delete_report" class="btn btn-danger btn-sm">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 