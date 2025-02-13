#!/bin/bash

# Define database name and user
DB_NAME="library_system"
DB_USER="postgres"

# Define paths to SQL files and processed CSV files
SQL_DIR="/Users/nathanielani/library_dataset/sql-files"
PROCESSED_DIR="/Users/nathanielani/library_dataset/processed"

# Run SQL schema files to create tables
psql -U $DB_USER -d $DB_NAME -f "$SQL_DIR/users.sql"
psql -U $DB_USER -d $DB_NAME -f "$SQL_DIR/books.sql"
psql -U $DB_USER -d $DB_NAME -f "$SQL_DIR/ratings.sql"

# Load data from CSV files into the database
psql -U $DB_USER -d $DB_NAME -c "\COPY users(user_id, location, age) FROM '$PROCESSED_DIR/clean_users.csv' DELIMITER ',' CSV HEADER;"
psql -U $DB_USER -d $DB_NAME -c "\COPY books(book_id, title, author, year_published) FROM '$PROCESSED_DIR/clean_books.csv' DELIMITER ',' CSV HEADER;"
psql -U $DB_USER -d $DB_NAME -c "\COPY ratings(user_id, book_id, rating) FROM '$PROCESSED_DIR/clean_ratings.csv' DELIMITER ',' CSV HEADER;"

# Verify if data is loaded correctly
psql -U $DB_USER -d $DB_NAME -c "SELECT COUNT(*) FROM users;"
psql -U $DB_USER -d $DB_NAME -c "SELECT COUNT(*) FROM books;"
psql -U $DB_USER -d $DB_NAME -c "SELECT COUNT(*) FROM ratings;"

# Run Drizzle Kit for database migration (if needed)
npx drizzle-kit generate
