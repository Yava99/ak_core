INSERT INTO app_healthcheck (name)
SELECT 'core-db-seed'
WHERE NOT EXISTS (
  SELECT 1 FROM app_healthcheck WHERE name = 'core-db-seed'
);