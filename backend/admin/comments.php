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

// Handle comment visibility toggle
if (isset($_POST['toggle_visibility'])) {
    $comment_id = filter_input(INPUT_POST, 'comment_id', FILTER_SANITIZE_NUMBER_INT);
    $query = "UPDATE comments SET is_visible = NOT is_visible WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":id", $comment_id);
    $stmt->execute();
}

// Handle comment deletion
if (isset($_POST['delete_comment'])) {
    $comment_id = filter_input(INPUT_POST, 'comment_id', FILTER_SANITIZE_NUMBER_INT);
    $query = "DELETE FROM comments WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":id", $comment_id);
    $stmt->execute();
}

// Get all comments with user and recipe information
$query = "SELECT c.*, u.username, r.title as recipe_title 
          FROM comments c 
          LEFT JOIN users u ON c.user_id = u.id 
          LEFT JOIN recipes r ON c.recipe_id = r.id 
          ORDER BY c.created_at DESC";
$stmt = $db->prepare($query);
$stmt->execute();
$comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comment Management - CookIQ Admin</title>
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
        .comment-text {
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
                <a href="comments.php" class="active">
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
                <h2 class="mb-4">Comment Management</h2>

                <!-- Comment List -->
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Recipe</th>
                                <th>Comment</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($comments as $comment): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($comment['id']); ?></td>
                                <td><?php echo htmlspecialchars($comment['username']); ?></td>
                                <td><?php echo htmlspecialchars($comment['recipe_title']); ?></td>
                                <td>
                                    <div class="comment-text" title="<?php echo htmlspecialchars($comment['content']); ?>">
                                        <?php echo htmlspecialchars($comment['content']); ?>
                                    </div>
                                </td>
                                <td>
                                    <span class="badge bg-<?php echo $comment['is_visible'] ? 'success' : 'danger'; ?>">
                                        <?php echo $comment['is_visible'] ? 'Visible' : 'Hidden'; ?>
                                    </span>
                                </td>
                                <td><?php echo htmlspecialchars($comment['created_at']); ?></td>
                                <td>
                                    <form method="POST" class="d-inline">
                                        <input type="hidden" name="comment_id" value="<?php echo $comment['id']; ?>">
                                        <button type="submit" name="toggle_visibility" class="btn btn-warning btn-sm">
                                            <i class="bi bi-eye<?php echo $comment['is_visible'] ? '-slash' : ''; ?>"></i>
                                        </button>
                                    </form>
                                    <form method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete this comment?');">
                                        <input type="hidden" name="comment_id" value="<?php echo $comment['id']; ?>">
                                        <button type="submit" name="delete_comment" class="btn btn-danger btn-sm">
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