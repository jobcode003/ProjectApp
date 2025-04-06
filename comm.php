<?php
$conn = new mysqli("localhost", "root", "", "userlogin");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');

$action = $_GET['action'];

if ($action == 'getProducts') {
    $res = $conn->query("SELECT * FROM products");
    $products = [];
    while ($row = $res->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode($products);
} elseif ($action == 'checkout') {
    $cart = json_decode(file_get_contents("php://input"), true);
    // In real app, insert to database
    echo json_encode("Order placed successfully!");
}
