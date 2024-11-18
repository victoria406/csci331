<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Listing</title>
</head>
<body>
    <h1>Just Added</h1>

    <?php
    // Enable error reporting
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    // See the contents of $_POST, submitted from index.html
    var_dump($_POST);

    // Collect input using POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $firstname = htmlspecialchars($_POST['first']);
        $lastname = htmlspecialchars($_POST['last']);
        $country = htmlspecialchars($_POST['country']);
        $latitude = htmlspecialchars($_POST['lat']);
        $longitude = htmlspecialchars($_POST['long']);
        echo "<p>Adding <strong>$firstname</strong> <strong>$lastname</strong> from <strong>$country</strong> - specifically La: <strong>$latitude</strong> | Lo: <strong>$longitude</strong>.</p>";

        // DATABASE OPERATIONS:
        // TODO: this MUST be updated to your own credentials to work on your MariaDB
        $servername = "localhost";   // same for local dev and school server
        $username = "user38";        // get this from the email
        $password = "38dade";        // get this from the email 
        $dbname = "db38";            // get this from the email

        try {
            // Create a PDO connection (PHP Data Object)
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

            // Set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            //$stmt_ps1 = $conn->prepare("ALTER TABLE `randuser` ADD lat varchar(15);");
            //$stmt_ps1->execute();
            //$stmt_ps2 = $conn->prepare("ALTER TABLE `randuser` ADD longi varchar(15);");
            //$stmt_ps2->execute();


            // Prepare SQL and bind parameters
            $stmt = $conn->prepare("INSERT INTO `randuser` (`first`,`last`,`country`,`lat`,`longi`) VALUES (:firstname, :lastname, :country, :lat, :long)");
            $stmt->bindParam(':firstname', $firstname);
            $stmt->bindParam(':lastname', $lastname);
            $stmt->bindParam(':country', $country);
            $stmt->bindParam(':lat', $latitude);
            $stmt->bindParam(':long', $longitude);

            echo "<div>";
            if ($stmt->execute()) {
                echo "<p>New record created successfully</p>";
            } else {
                echo "<p>Error: Unable to create a new record.</p>";
            }
            echo "</div>";

            // Select and display all users from the database
            $sql = "SELECT * FROM `randuser`";
            $result = $conn->query($sql);

            echo "<div>";
                echo "<table>";
                echo "<thead><tr><th>First Name</th><th>Last Name</th><th>Country</th><th>Latitude</th><th>Longitude</th></tr></thead><tbody>";

                // output data of each row
                while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                    echo "<tr><td> " . $row["first"] . " </td><td> " . $row["last"] . " </td><td> ". $row["country"] . " </td><td> " . $row["lat"] . " </td><td> ". $row["longi"] . " </td></tr>";
                }
                echo "</tbody></table>";
            echo "</div>";

        } catch (PDOException $e) {
            echo "<p>Error: " . $e->getMessage() . "</p>";
        }

        // Close the connection
        $conn = null;

    } else {
        echo "<p>No data was submitted.</p>";
    }
    ?>
</body>
</html>