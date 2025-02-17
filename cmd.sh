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

dd if=/dev/sda of=/dev/sdb bs=64K conv=noerror,sync status=progress

pg_dump -U timeless -d movie_recommendation -t core_user -t core_movie -t core_ratings -t core_links -t core_tags --data-only --column-inserts > movie_recommendation_data.sql

psql "postgresql://metalbraindb_owner:pGCX4A2DxhqK@ep-royal-credit-a273zrsp.eu-central-1.aws.neon.tech/metalbraindb?sslmode=require" -f movie_recommendation_data.sql

pg_dump -Fc -v -d <source_database_connection_string> -f <dump_file_name>

pg_dump -U timeless -h localhost -p 5432 -d movie_recommendation -Fc -f mvbackup.dump
pg_dump -U timeless -d movie_recommendation

pg_restore -v -d "postgresql://db_owner:******K@ep-royal-credit-a273zrsp.eu-central-1.aws.neon.tech/metalbraindb?sslmode=require" mvbackup.dump

psql "postgresql://neondb_owner:npg_2vQmyE7jeXdc@ep-old-star-a24879kl-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"
