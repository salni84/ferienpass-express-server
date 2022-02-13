$data = [
'name_kind' => $submission->params['name_kind'],
'vorname_kind'  => $submission->params['vorname_kind'],
'address'  => $submission->params['address'],
'location'  => $submission->params['location'],
'notes'  => $submission->params['notes'],
'email'  => $submission->params['email'],
'name_parent'  => $submission->params['name_parent'],
'vorname_parent'  => $submission->params['vorname_parent'],
$data = [
'name_kind' => $submission->params['name_kind'],
'vorname_kind'  => $submission->params['vorname_kind'],
'address'  => $submission->params['address'],
'location'  => $submission->params['location'],
'notes'  => $submission->params['notes'],
'email'  => $submission->params['email'],
'name_parent'  => $submission->params['name_parent'],
'vorname_parent'  => $submission->params['vorname_parent'],
'mobilephone'  => $submission->params['mobilephone'],
'wish_course'  => $submission->params['wish_course'],
'foto_permission'  => $submission->params['foto_permission'],
'car'  => $submission->params['car'],
'course_prio_1'  => $submission->params['course_prio_1'],
'course_prio_2'  => $submission->params['course_prio_2'],
'course_prio_3'  => $submission->params['course_prio_3'],
'course_prio_4'  => $submission->params['course_prio_4'],
'course_prio_5'  => $submission->params['course_prio_5'],
'verguenstigungen_oev'  => $submission->params['verguenstigungen_oev'],
'begleitkurs'  => $submission->params['begleitkurs'],
'notfallnummer'  => $submission->params['notfallnummer'],
'birthdate'  => $submission->params['birthdate'],
];

$url = 'https://ferienpass-server.herokuapp.com/newOrder';

$jsondata = json_encode($data);


$response = JHttpFactory::getHttp()->post($url, $jsondata);

if ($response->code == 200)
{
// Your code..
}
