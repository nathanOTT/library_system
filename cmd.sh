### library_system

psql -U your_rolename -d your_database -f /Users/timeless/library_dataset/sql-files/books.sql

psql -U your_username -d your_database -f /Users/timeless/library_dataset/sql-files/users.sql
psql -U your_username -d your_database -f /Users/timeless/library_dataset/sql-files/books.sql
psql -U your_username -d your_database -f /Users/timeless/library_dataset/sql-files/ratings.sql

COPY users FROM '/path/path/path/processed/clean_users.csv' DELIMITER ',' CSV HEADER;
COPY books FROM '/path/path/path/processed/processed/clean_books.csv' DELIMITER ',' CSV HEADER;
COPY ratings FROM '/path/path/path/processed/clean_ratings.csv' DELIMITER ',' CSV HEADER;

SELECT COUNT(*) FROM books;
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM ratings;

npx drizzle-kit generate


COPY users FROM '/path/path/path/processed/clean_users.csv' DELIMITER ',' CSV HEADER;
COPY books FROM '/path/path/path/processed/processed/clean_books.csv' DELIMITER ',' CSV HEADER;
COPY ratings FROM '/path/path/path/processed/clean_ratings.csv' DELIMITER ',' CSV HEADER;