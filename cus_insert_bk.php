<?php
include "cus_connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
    $session = $_POST['session'] ?? null;
    $session_date = $_POST['session_date'] ?? null;
    $session_from_time = $_POST['session_from_time'] ?? null;
    $session_to_time = $_POST['session_to_time'] ?? null;

    if (empty($session) || empty($session_date) || empty($session_from_time) || empty($session_to_time)) {
        echo "All fields are required.";
        exit;
    }

    $checkStmt = $conn->prepare(
        "SELECT id FROM game_booking 
         WHERE session = ? AND session_date = ? AND session_from_time = ? AND session_to_time = ?"
    );
    $checkStmt->bind_param("ssss", $session, $session_date, $session_from_time, $session_to_time);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        echo "Booking already exists.";
        $checkStmt->close();
        $conn->close();
        exit;
    }
    $checkStmt->close();

    $stmt = $conn->prepare(
        "INSERT INTO `game_booking` 
        (`session`, `session_date`, `session_from_time`, `session_to_time`, `created_at`, `updated_at`) 
        VALUES (?, ?, ?, ?, NOW(), NOW())"
    );
    $stmt->bind_param("ssss", $session, $session_date, $session_from_time, $session_to_time);

    if ($stmt->execute()) {
        $last_id = $stmt->insert_id;
        echo "Success.";
    } else {
        error_log("Database error: " . $stmt->error, 0);
        echo "Error while inserting data. Please try again.";
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request.";
}
?>
