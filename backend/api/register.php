<?php
/**
 * API: Member Registration & Status Approval
 * Author: MD. Mahamudul Hasan
 */

require_once __DIR__ . '/../db_connect.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON input.']);
    exit;
}

$action = $input['action'] ?? 'register';

if ($action === 'register') {
    $org_name = trim($input['organization_name'] ?? '');
    $type     = $input['membership_type'] ?? 'Corporate Member';
    $sector_id= intval($input['sector_id'] ?? 1);
    $person   = trim($input['contact_person'] ?? '');
    $desig    = trim($input['designation'] ?? 'Representative');
    $email    = trim($input['contact_email'] ?? '');
    $phone    = trim($input['contact_phone'] ?? '');
    $address  = trim($input['office_address'] ?? '');
    $website  = trim($input['website_url'] ?? '');

    if (empty($org_name) || empty($email) || empty($phone)) {
        http_response_code(422);
        echo json_encode(['status' => 'error', 'message' => 'Organization name, email, and phone are mandatory.']);
        exit;
    }

    try {
        $randCode = 'BSREA-' . strtoupper(substr($type, 0, 4)) . '-' . rand(100, 999);
        $today    = date('Y-m-d');
        $renew    = date('Y-m-d', strtotime('+1 year'));

        $stmt = $pdo->prepare("
            INSERT INTO tbl_members 
            (member_code, organization_name, membership_type, sector_id, contact_person, designation, contact_email, contact_phone, website_url, office_address, registration_date, renewal_date, annual_fee_status, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Due', 'Pending Approval')
        ");

        $stmt->execute([
            $randCode, $org_name, $type, $sector_id, $person, $desig, $email, $phone, $website, $address, $today, $renew
        ]);

        echo json_encode([
            'status'      => 'success',
            'message'     => 'Registration submitted successfully. Pending Secretariat review.',
            'member_code' => $randCode
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} elseif ($action === 'update_status') {
    $member_id = intval($input['member_id'] ?? 0);
    $new_status= $input['status'] ?? 'Active';

    if (!$member_id) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Missing member_id.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("UPDATE tbl_members SET status = ?, annual_fee_status = 'Paid' WHERE id = ?");
        $stmt->execute([$new_status, $member_id]);

        echo json_encode(['status' => 'success', 'message' => "Member status updated to {$new_status}."]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}
