<?php
  class Files {
    public function upload($file): array {
      if (!isset($_FILES["image"]))
        return [false, null];

      $fileName = uniqid();
      $fileType = strtolower( pathinfo("../../uploads/" . basename($_FILES["image"]["name"]), PATHINFO_EXTENSION) );
      $targetPath = "../../uploads/$fileName.$fileType";
      
      return [move_uploaded_file($_FILES["image"]["tmp_name"], $targetPath), basename($targetPath)];
    }
  }
?>