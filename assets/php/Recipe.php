<?php
  require_once "Database.php";
  require_once "Files.php";
  
  require_once "../../config.php";
  
  class Recipe {
    function getAll() {
      $database = new Database(DATABASE);
      $conn = $database->openConnection();

      $stmt = $conn->prepare("SELECT `id`,`title`,`tags`,`image` FROM `app`.`recipes` ORDER BY `title` ASC;");
      $stmt->execute();
      
      $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
      $database->closeConnection();
      return $data;
    }

    function get($id) {
      $database = new Database(DATABASE);
      $conn = $database->openConnection();

      $stmt = $conn->prepare("SELECT * FROM `app`.`recipes` WHERE `id` = " . $id . ";");
      $stmt->execute();

      $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
      $database->closeConnection();
      return $data;
    }
    
    function insert($recipeObj) {
      $files = new Files();
      $result = $files->upload("image");

      $database = new Database(DATABASE);
      $conn = $database->openConnection();

      $stmt = $conn->prepare("INSERT INTO 
        `app`.`recipes` 
          (`title`, `tags`, `textContent`, `image`) 
        VALUES 
          (?,?,?,?);
      ");
      
      $stmt->execute([$recipeObj["title"], $recipeObj["tags"], $recipeObj["textContent"], ($result[1] === null) ? "" : $result[1]]);
      $database->closeConnection();
      return ["data" => $recipeObj, "imageUploadSuccessful" => $result[0]];
    }

    function update($id, $recipeObj) {
      $files = new Files();
      $result = $files->upload("image");

      $database = new Database(DATABASE);
      $conn = $database->openConnection();

      $stmt = $conn->prepare("
        UPDATE 
          `app`.`recipes`
        SET
          title = ?,
          tags = ?,
          textContent = ?,
          image = ?
        WHERE
          id = ?;
      ");

      $stmt->execute([$recipeObj["title"], $recipeObj["tags"], $recipeObj["textContent"], ($result[1] === null) ? "" : $result[1], $id]);
      $database->closeConnection();
      return ["data" => $recipeObj, "imageUploadSuccessful" => $result[0]];
    }

    function delete($id) {}
  }
?>