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

// Handle recipe visibility toggle
if (isset($_POST['toggle_visibility'])) {
    $recipe_id = filter_input(INPUT_POST, 'recipe_id', FILTER_SANITIZE_NUMBER_INT);
    $current_status = filter_input(INPUT_POST, 'current_status', FILTER_SANITIZE_NUMBER_INT);
    $new_status = $current_status ? 0 : 1;
    
    $query = "UPDATE recipes SET is_visible = :status WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":status", $new_status);
    $stmt->bindParam(":id", $recipe_id);
    $stmt->execute();
}

// Handle recipe deletion
if (isset($_POST['delete_recipe'])) {
    $recipe_id = filter_input(INPUT_POST, 'recipe_id', FILTER_SANITIZE_NUMBER_INT);
    $query = "DELETE FROM recipes WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":id", $recipe_id);
    $stmt->execute();
}

// Get all recipes
$query = "SELECT * FROM recipes ORDER BY created_at DESC";
$stmt = $db->prepare($query);
$stmt->execute();
$recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipe Management - IngRecipes Admin</title>
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
        .recipe-image {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 5px;
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
                <a href="recipes.php" class="active">
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
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Recipe Management</h2>
                    <div>
                        <a href="fetch_recipes.php" class="btn btn-success me-2">
                            <i class="bi bi-cloud-download"></i> Fetch New Recipes
                        </a>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addRecipeModal">
                            <i class="bi bi-plus-circle"></i> Add Recipe
                        </button>
                    </div>
                </div>

                <?php if (isset($_GET['message'])): ?>
                <div class="alert alert-info alert-dismissible fade show" role="alert">
                    <?php echo htmlspecialchars($_GET['message']); ?>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <?php endif; ?>

                <!-- Recipe List -->
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Ingredients</th>
                                <th>Instructions</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($recipes as $recipe): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($recipe['id']); ?></td>
                                <td>
                                    <?php if (!empty($recipe['image_url'])): ?>
                                        <img src="<?php echo htmlspecialchars($recipe['image_url']); ?>" class="recipe-image" alt="Recipe Image">
                                    <?php else: ?>
                                        <div class="recipe-image bg-light d-flex align-items-center justify-content-center">
                                            <i class="bi bi-image text-muted"></i>
                                        </div>
                                    <?php endif; ?>
                                </td>
                                <td><?php echo htmlspecialchars($recipe['title']); ?></td>
                                <td>
                                    <div class="text-truncate" style="max-width: 200px;">
                                        <?php echo htmlspecialchars($recipe['ingredients']); ?>
                                    </div>
                                </td>
                                <td>
                                    <div class="text-truncate" style="max-width: 200px;">
                                        <?php echo htmlspecialchars($recipe['instructions']); ?>
                                    </div>
                                </td>
                                <td>
                                    <form method="POST" class="d-inline">
                                        <input type="hidden" name="recipe_id" value="<?php echo $recipe['id']; ?>">
                                        <input type="hidden" name="current_status" value="<?php echo $recipe['is_visible']; ?>">
                                        <button type="submit" name="toggle_visibility" class="btn btn-sm <?php echo $recipe['is_visible'] ? 'btn-success' : 'btn-secondary'; ?>">
                                            <?php echo $recipe['is_visible'] ? 'Visible' : 'Hidden'; ?>
                                        </button>
                                    </form>
                                </td>
                                <td><?php echo htmlspecialchars($recipe['created_at']); ?></td>
                                <td>
                                    <button class="btn btn-primary btn-sm" onclick="editRecipe(<?php echo $recipe['id']; ?>)">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <form method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete this recipe?');">
                                        <input type="hidden" name="recipe_id" value="<?php echo $recipe['id']; ?>">
                                        <button type="submit" name="delete_recipe" class="btn btn-danger btn-sm">
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

    <!-- Add Recipe Modal -->
    <div class="modal fade" id="addRecipeModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add New Recipe</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form action="add_recipe.php" method="POST" enctype="multipart/form-data">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="title" name="title" required>
                        </div>
                        <div class="mb-3">
                            <label for="ingredients" class="form-label">Ingredients</label>
                            <textarea class="form-control" id="ingredients" name="ingredients" rows="3" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="instructions" class="form-label">Instructions</label>
                            <textarea class="form-control" id="instructions" name="instructions" rows="5" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="image" class="form-label">Recipe Image</label>
                            <input type="file" class="form-control" id="image" name="image" accept="image/*">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Add Recipe</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        function editRecipe(id) {
            // Implement edit functionality
            window.location.href = `edit_recipe.php?id=${id}`;
        }
    </script>
</body>
</html> 