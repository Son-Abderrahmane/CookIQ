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

// Handle meal plan deletion
if (isset($_POST['delete_mealplan'])) {
    $mealplan_id = filter_input(INPUT_POST, 'mealplan_id', FILTER_SANITIZE_NUMBER_INT);
    $query = "DELETE FROM meal_plans WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":id", $mealplan_id);
    $stmt->execute();
}

// Get all meal plans with user information
$query = "SELECT mp.*, u.username 
          FROM meal_plans mp 
          LEFT JOIN users u ON mp.user_id = u.id 
          ORDER BY mp.created_at DESC";
$stmt = $db->prepare($query);
$stmt->execute();
$mealplans = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Get all recipes for the dropdown
$query = "SELECT id, title FROM recipes WHERE is_visible = 1 ORDER BY title";
$stmt = $db->prepare($query);
$stmt->execute();
$recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meal Plan Management - CookIQ Admin</title>
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
        .meal-plan-description {
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
                <a href="reports.php">
                    <i class="bi bi-flag"></i> Reports
                </a>
                <a href="mealplans.php" class="active">
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
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Meal Plan Management</h2>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addMealPlanModal">
                        <i class="bi bi-plus-circle"></i> Create Meal Plan
                    </button>
                </div>

                <!-- Meal Plan List -->
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($mealplans as $mealplan): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($mealplan['id']); ?></td>
                                <td><?php echo htmlspecialchars($mealplan['username']); ?></td>
                                <td><?php echo htmlspecialchars($mealplan['title']); ?></td>
                                <td>
                                    <div class="meal-plan-description" title="<?php echo htmlspecialchars($mealplan['description']); ?>">
                                        <?php echo htmlspecialchars($mealplan['description']); ?>
                                    </div>
                                </td>
                                <td><?php echo htmlspecialchars($mealplan['start_date']); ?></td>
                                <td><?php echo htmlspecialchars($mealplan['end_date']); ?></td>
                                <td><?php echo htmlspecialchars($mealplan['created_at']); ?></td>
                                <td>
                                    <a href="edit_mealplan.php?id=<?php echo $mealplan['id']; ?>" class="btn btn-primary btn-sm">
                                        <i class="bi bi-pencil"></i>
                                    </a>
                                    <form method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete this meal plan?');">
                                        <input type="hidden" name="mealplan_id" value="<?php echo $mealplan['id']; ?>">
                                        <button type="submit" name="delete_mealplan" class="btn btn-danger btn-sm">
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

    <!-- Add Meal Plan Modal -->
    <div class="modal fade" id="addMealPlanModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create New Meal Plan</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form action="add_mealplan.php" method="POST">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="title" name="title" required>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" id="description" name="description" rows="3"></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="start_date" class="form-label">Start Date</label>
                                    <input type="date" class="form-control" id="start_date" name="start_date" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="end_date" class="form-label">End Date</label>
                                    <input type="date" class="form-control" id="end_date" name="end_date" required>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Recipes</label>
                            <div class="recipe-list">
                                <?php foreach ($recipes as $recipe): ?>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="recipes[]" value="<?php echo $recipe['id']; ?>" id="recipe_<?php echo $recipe['id']; ?>">
                                    <label class="form-check-label" for="recipe_<?php echo $recipe['id']; ?>">
                                        <?php echo htmlspecialchars($recipe['title']); ?>
                                    </label>
                                </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Create Meal Plan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 