<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: application/json");
  header("Access-Control-Allow-Methods: GET,POST");

  require_once "Recipe.php";
  $recipe = new Recipe();

  $error = "Method Not Allowed";

  if (isset($_GET)) {
    if ($_GET["action"] == "list") {
      // deny other then get
      if ($_SERVER["REQUEST_METHOD"] !== "GET") {
        http_response_code(405);
        exit($error);
      }
      header("Access-Control-Allow-Origin: *");
      echo json_encode(["status" => 200, "result" => $recipe->getAll()]);
    }

    if ($_GET["action"] == "get") {
      // deny other then get
      if ($_SERVER["REQUEST_METHOD"] !== "GET") {
        http_response_code(405);
        exit($error);
      }
      echo json_encode(["status" => 200, "result" => $recipe->get($_GET["id"])]);
    }

    if ($_GET["action"] == "insert") {
      // deny other then post
      if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        http_response_code(405);
        exit($error);
      }
      $result = $recipe->insert($_POST);
      echo json_encode(["status" => 200]);
    }
    if ($_GET["action"] == "update") {
      // deny other then post
      if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        http_response_code(405);
        exit($error);
      }
      $result = $recipe->update($_GET["id"], $_POST);
    }
    if ($_GET["action"] == "delete") {}
  }
?>