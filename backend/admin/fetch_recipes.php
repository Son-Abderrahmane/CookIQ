<?php
require_once '../config/database.php';
session_start();

// Check if user is logged in and is admin
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: ../auth/login.php');
    exit();
}

// Function to fetch recipes from API
function fetchRecipesFromAPI() {
    // Using TheMealDB API as an example
    $api_url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    
    // Fetch some popular recipes
    $search_terms = ['chicken', 'beef', 'pasta', 'fish', 'vegetarian'];
    $recipes = [];
    
    foreach ($search_terms as $term) {
        $response = file_get_contents($api_url . urlencode($term));
        $data = json_decode($response, true);
        
        if (isset($data['meals']) && is_array($data['meals'])) {
            foreach ($data['meals'] as $meal) {
                // Format ingredients
                $ingredients = [];
                for ($i = 1; $i <= 20; $i++) {
                    $ingredient = $meal['strIngredient' . $i];
                    $measure = $meal['strMeasure' . $i];
                    if (!empty($ingredient)) {
                        $ingredients[] = $measure . ' ' . $ingredient;
                    }
                }
                
                $recipes[] = [
                    'title' => $meal['strMeal'],
                    'ingredients' => implode("\n", $ingredients),
                    'instructions' => $meal['strInstructions'],
                    'image_url' => $meal['strMealThumb']
                ];
            }
        }
    }
    
    return $recipes;
}

// Function to save recipes to database
function saveRecipesToDatabase($recipes) {
    $database = new Database();
    $db = $database->getConnection();
    
    $success_count = 0;
    $error_count = 0;
    
    foreach ($recipes as $recipe) {
        try {
            // Check if recipe already exists
            $check_query = "SELECT id FROM recipes WHERE title = :title";
            $check_stmt = $db->prepare($check_query);
            $check_stmt->bindParam(":title", $recipe['title']);
            $check_stmt->execute();
            
            if ($check_stmt->rowCount() == 0) {
                // Insert new recipe
                $query = "INSERT INTO recipes (title, ingredients, instructions, image_url, is_visible) 
                         VALUES (:title, :ingredients, :instructions, :image_url, 1)";
                
                $stmt = $db->prepare($query);
                $stmt->bindParam(":title", $recipe['title']);
                $stmt->bindParam(":ingredients", $recipe['ingredients']);
                $stmt->bindParam(":instructions", $recipe['instructions']);
                $stmt->bindParam(":image_url", $recipe['image_url']);
                
                if ($stmt->execute()) {
                    $success_count++;
                } else {
                    $error_count++;
                }
            }
        } catch (PDOException $e) {
            $error_count++;
        }
    }
    
    return ['success' => $success_count, 'error' => $error_count];
}

// Main execution
$recipes = fetchRecipesFromAPI();
$result = saveRecipesToDatabase($recipes);

// Redirect back to recipes page with status message
$message = "Successfully added {$result['success']} new recipes. ";
if ($result['error'] > 0) {
    $message .= "Failed to add {$result['error']} recipes.";
}

header("Location: recipes.php?message=" . urlencode($message));
exit();
?> 