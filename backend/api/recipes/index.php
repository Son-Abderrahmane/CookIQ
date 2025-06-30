<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Get all recipes
        $query = "SELECT * FROM recipes";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($result);
        break;
        
    case 'POST':
        // Create new recipe
        $data = json_decode(file_get_contents("php://input"));
        
        if(isset($data->title) && isset($data->ingredients)) {
            $query = "INSERT INTO recipes (title, ingredients, instructions) VALUES (:title, :ingredients, :instructions)";
            $stmt = $db->prepare($query);
            
            $stmt->bindParam(":title", $data->title);
            $stmt->bindParam(":ingredients", $data->ingredients);
            $stmt->bindParam(":instructions", $data->instructions);
            
            if($stmt->execute()) {
                echo json_encode(["message" => "Recipe created successfully"]);
            } else {
                echo json_encode(["message" => "Unable to create recipe"]);
            }
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}
?> 