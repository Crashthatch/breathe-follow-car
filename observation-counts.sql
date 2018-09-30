SELECT vehicle_id, COUNT(observations.id) as observation_count
FROM observations
LEFT JOIN sites ON site_id = sites.id 
LEFT JOIN vehicles ON vehicle_id = vehicles.id
GROUP BY vehicle_id
ORDER BY observation_count DESC 
LIMIT 1000