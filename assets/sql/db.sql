CREATE TABLE 
  `app`.`recipes` (
    `id` INT NOT NULL AUTO_INCREMENT , 
    `title` TINYTEXT NOT NULL , 
    `tags` TEXT NOT NULL , 
    `textContent` TEXT NOT NULL , 
    `image` TEXT NOT NULL , 
    PRIMARY KEY (`id`)
  ) 
  ENGINE = InnoDB
; 