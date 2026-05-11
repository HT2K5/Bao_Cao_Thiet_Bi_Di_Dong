<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

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
   GET PRODUCTS
========================= */

$sql = "

SELECT

  products.*,

  categories.name AS category_name

FROM products

LEFT JOIN categories
ON products.category_id = categories.id

";

$result =
  $conn->query($sql);

$products = [];

while (
  $row =
    $result->fetch_assoc()
) {

  /* =========================
     GET NUTRITION
  ========================= */

  $nutrition_sql = "

    SELECT
      label,
      value

    FROM nutrition_values

    WHERE product_id = " .
    $row["id"];

  $nutrition_result =
    $conn->query(
      $nutrition_sql
    );

  $nutrition = [];

  if ($nutrition_result) {

    while (
      $n =
        $nutrition_result
          ->fetch_assoc()
    ) {

      $nutrition[] = $n;
    }
  }

  $row["nutrition"] =
    $nutrition;

  /* =========================
     FORMAT DATA
  ========================= */

  $row["id"] =
    (int) $row["id"];

  $row["category_id"] =
    (int) $row["category_id"];

  $row["price"] =
    (float) $row["price"];

  $row["rating"] =
    (float) $row["rating"];

  $row["stock"] =
    (int) $row["stock"];

  $products[] =
    $row;
}

/* =========================
   RESPONSE
========================= */

echo json_encode(
  $products,
  JSON_UNESCAPED_UNICODE
);

$conn->close();

?>