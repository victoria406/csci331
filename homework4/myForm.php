<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Data</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<table border="1">
    <tr>
        <th>Field</th>
        <th>Value</th>
    </tr>
    <?php
    foreach ($_POST as $key => $value) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($key) . "</td>";

        if (is_array($value)) {
            echo "<td>" . implode(", ", array_map('htmlspecialchars', $value)) . "</td>";
        } else {
            echo "<td>" . htmlspecialchars($value) . "</td>";
        }

        echo "</tr>";
    }
    ?>
</table>
</body>
</html>
