<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include_once ('DBConnect.php');
// $objDb = new DbConnect;
// $conn = $objDb->connect();
// var_dump($conn);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case "GET":
        // $statement = $conn->prepare("SELECT * FROM books");
        $statement = $db_con->prepare("SELECT * FROM reviews");
        $statement->execute();
        $list = $statement->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($list);
        break;

    case "POST":
        $review = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO reviews(name, comment, rate, created_at) VALUES(:name, :comment, :rate, :created_at)";
        $stmt = $db_con->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam('name', $review->name);
        $stmt->bindParam('comment', $review->comment);
        $stmt->bindParam('rate', $review->rate);
        $stmt->bindParam('created_at', $created_at);

        if($stmt->execute()){
            $response = ['status'=>1, 'message' => 'Record created successfully.'];
        }else{
            $response = ['status'=>0, 'message' => 'Failed to create record.'];
        }
        break;
}