<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

/* =========================
   CONNECT DB
========================= */

$conn = new mysqli(
  "localhost",
  "root",
  "",
  "farmdirect"
);

if ($conn->connect_error) {

  die(json_encode([
    "error" =>
      $conn->connect_error
  ]));
}

$conn->set_charset("utf8");

/* =========================
   GET CATEGORIES
========================= */

$sql = "

SELECT

  id,
  name,
  icon

FROM categories

ORDER BY id ASC

";

$result =
  $conn->query($sql);

if (!$result) {

  die(json_encode([
    "sql_error" =>
      $conn->error
  ]));
}

$categories = [];

while (
  $row =
    $result->fetch_assoc()
) {

  $row["id"] =
    (int) $row["id"];

  $categories[] =
    $row;
}

/* =========================
   RESPONSE
========================= */

echo json_encode(
  $categories,
  JSON_UNESCAPED_UNICODE |
  JSON_PRETTY_PRINT
);

$conn->close();

?>