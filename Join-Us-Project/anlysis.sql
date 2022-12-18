SELECT COUNT(*) FROM users;

-- Earliest registration 
SELECT TO_CHAR(MIN(created_at)::DATE , 'Mon dd yyyy') FROM users;

-- email of earliest user
SELECT * FROM users 
WHERE created_at = (SELECT MIN(created_at) FROM users);

-- no of users joined every month
SELECT TO_CHAR((created_at)::DATE , 'Month') AS month , COUNT(*) as users_joined 
FROM users
GROUP by month 
ORDER BY users_joined DESC;

-- users wtih yahoo email
SELECT COUNT(email) FROM users
WHERE email LIKE '%yahoo%';

-- users with different email account
SELECT 
CASE 
	WHEN email LIKE '%@yahoo%' THEN 'yahoo'
	WHEN email LIKE '%@gmail%' THEN 'gmail'
	WHEN email LIKE '%@hotmail%' THEN 'hotmail'
    ELSE 'other'
END as provider , 
COUNT(email) as total_users 
FROM users
GROUP BY provider
ORDER BY total_users DESC;




