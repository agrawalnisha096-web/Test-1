add_action('et_pb_contact_form_submit', function ($fields, $error) {
    if ($error) return;
    $body = [];
    foreach ($fields as $id => $f) $body[$id] = is_array($f) ? ($f['value'] ?? '') : $f;
    // Keep the landing page URL the form already captured (it includes gclid/UTMs).
    // wp_get_referer() returns false here because Divi posts back to the same page.
    if (empty($body['landing_page'])) $body['landing_page'] = wp_get_referer() ?: home_url(add_query_arg([]));
    if (!empty($body['company'])) $body['business_name'] = $body['company'];
    wp_remote_post('PASTE-THE-WEBHOOK-URL-HERE', [
        'timeout' => 5,
        'headers' => ['Content-Type' => 'application/json'],
        'body' => wp_json_encode($body),
    ]);
}, 10, 2);
