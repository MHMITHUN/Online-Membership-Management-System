<?php
/**
 * API: Search and Filter Member Directory
 * Method: GET
 * Author: MD. Mahamudul Hasan
 */

require_once __DIR__ . '/../db_connect.php';

header('Access-Control-Allow-Origin: *');

$search = isset($_GET['q']) ? trim($_GET['q']) : '';
$sector = isset($_GET['sector']) ? trim($_GET['sector']) : '';
$status = isset($_GET['status']) ? trim($_GET['status']) : 'Active';

try {
    $sql = "
        SELECT 
            m.id, m.member_code, m.organization_name, m.membership_type,
            s.sector_name, m.contact_person, m.designation,
            m.contact_email, m.contact_phone, m.website_url,
            m.office_address, m.registration_date, m.renewal_date,
            m.annual_fee_status, m.status
        FROM tbl_members m
        JOIN tbl_sectors s ON m.sector_id = s.id
        WHERE 1=1
    ";

    $params = [];

    if (!empty($status) && $status !== 'All') {
        $sql .= " AND m.status = :status";
        $params['status'] = $status;
    }

    if (!empty($sector) && $sector !== 'All') {
        $sql .= " AND s.sector_name = :sector";
        $params['sector'] = $sector;
    }

    if (!empty($search)) {
        $sql .= " AND (m.organization_name LIKE :search OR m.member_code LIKE :search OR m.contact_person LIKE :search OR m.office_address LIKE :search)";
        $params['search'] = '%' . $search . '%';
    }

    $sql .= " ORDER BY m.organization_name ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $members = $stmt->fetchAll();

    echo json_encode([
        'status' => 'success',
        'count'  => count($members),
        'data'   => $members
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
