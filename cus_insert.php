<?php
ob_start();
header('Content-Type: text/plain; charset=utf-8');
include "cus_connection.php";

function convertTimeToMinutes($time) {
    $time = trim($time);
    
    if (preg_match('/(\d{1,2}):(\d{2})\s*(AM|PM)/i', $time, $matches)) {
        $hour = (int)$matches[1];
        $minute = (int)$matches[2];
        $period = strtoupper($matches[3]);
        
        if ($period === 'PM' && $hour < 12) {
            $hour += 12;
        } elseif ($period === 'AM' && $hour === 12) {
            $hour = 0;
        }
        
        return $hour * 60 + $minute;
    }
    
    if (preg_match('/(\d{1,2}):(\d{2})/', $time, $matches)) {
        $hour = (int)$matches[1];
        $minute = (int)$matches[2];
        return $hour * 60 + $minute;
    }
    
    return 0;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
    try {
        $session = $_POST['session'] ?? null;
        $session_date = $_POST['session_date'] ?? null;
        $session_from_time = $_POST['session_from_time'] ?? null;
        $session_to_time = $_POST['session_to_time'] ?? null;

        error_log("=== RECEIVED DATA ===");
        error_log("Session: " . ($session ?? 'NULL'));
        error_log("Date: " . ($session_date ?? 'NULL'));
        error_log("From Time: " . ($session_from_time ?? 'NULL'));
        error_log("To Time: " . ($session_to_time ?? 'NULL'));

        if (empty($session) || empty($session_date) || empty($session_from_time) || empty($session_to_time)) {
            echo "All fields are required.";
            exit;
        }

        if (!$conn) {
            error_log("Database connection failed");
            echo "Database connection error.";
            exit;
        }

        $checkStmt = $conn->prepare(
            "SELECT id, session_from_time, session_to_time FROM game_booking 
            WHERE session = ? 
            AND session_date = ?"
        );
        
        if (!$checkStmt) {
            error_log("Prepare statement failed: " . $conn->error);
            echo "Database prepare error.";
            exit;
        }
        
        $checkStmt->bind_param("ss", $session, $session_date);
        
        if (!$checkStmt->execute()) {
            error_log("Execute failed: " . $checkStmt->error);
            echo "Database execute error.";
            exit;
        }
        
        $checkStmt->store_result();
        $checkStmt->bind_result($id, $existing_from, $existing_to);

        error_log("=== CHECKING FOR CONFLICTS ===");
        error_log("Number of existing bookings found: " . $checkStmt->num_rows);

        $conflict = false;
        while ($checkStmt->fetch()) {
            $existing_from_minutes = convertTimeToMinutes($existing_from);
            $existing_to_minutes = convertTimeToMinutes($existing_to);
            $new_from_minutes = convertTimeToMinutes($session_from_time);
            $new_to_minutes = convertTimeToMinutes($session_to_time);
            
            if ($existing_to_minutes <= $existing_from_minutes) {
                $existing_to_minutes += 1440; 
            }
            if ($new_to_minutes <= $new_from_minutes) {
                $new_to_minutes += 1440; 
            }
            
            error_log("=== TIME COMPARISON ===");
            error_log("Existing: {$existing_from} ({$existing_from_minutes}) to {$existing_to} ({$existing_to_minutes})");
            error_log("New: {$session_from_time} ({$new_from_minutes}) to {$session_to_time} ({$new_to_minutes})");
            
            if ($existing_from_minutes < $new_to_minutes && $existing_to_minutes > $new_from_minutes) {
                error_log("CONFLICT DETECTED!");
                $conflict = true;
                break;
            }
        }
        $checkStmt->close();

        if ($conflict) {
            echo "Booking already exists for this time slot.";
            $conn->close();
            exit;
        }

        $stmt = $conn->prepare(
            "INSERT INTO `game_booking` 
            (`session`, `session_date`, `session_from_time`, `session_to_time`, `created_at`, `updated_at`) 
            VALUES (?, ?, ?, ?, NOW(), NOW())"
        );
        
        if (!$stmt) {
            error_log("Insert prepare statement failed: " . $conn->error);
            echo "Database insert prepare error.";
            exit;
        }
        
        $stmt->bind_param("ssss", $session, $session_date, $session_from_time, $session_to_time);

        if ($stmt->execute()) {
            ob_clean();
            error_log("Sending success response: 'Success.'");
            echo "Success.";
            ob_end_flush();
            exit;
        } else {
            error_log("Insert execute failed: " . $stmt->error);
            echo "Error while inserting data. Please try again.";
        }

        $stmt->close();
        $conn->close();
        
    } catch (Exception $e) {
        error_log("Exception occurred: " . $e->getMessage());
        echo "An unexpected error occurred. Please try again.";
    }
} else {
    echo "Invalid request.";
}
?>
