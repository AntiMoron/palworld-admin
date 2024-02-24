#!/bin/bash
# Name of the database file
DB_FILE="palserver.db"

# SQL statements to create the database and table
SQL_COMMANDS=$(cat <<EOF
CREATE TABLE game_character (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  steam_id TEXT NOT NULL,
  player_id TEXT NOT NULL,
  player_uid TEXT NOT NULL,
  instance_id TEXT NOT NULL,
  exp INTEGER,
  level INTEGER,
  hp INTEGER,
  mp INTEGER,
  max_hp INTEGER,
  max_mp INTEGER,
  talent_hp INTEGER,
  talent_melee INTEGER,
  talent_shot INTEGER,
  talent_defense INTEGER,
  passive_skill_list TEXT,
  owner_time DateTime,
  owner_player_uid TEXT,
  is_player INTEGER NOT NULL,
  last_login_at DATETIME NOT NULL,
  nickname TEXT NOT NULL,
  status TEXT NOT NULL,
  craft_speed INTEGER,
  craft_speeds TEXT
);

CREATE TABLE game_group (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id TEXT NOT NULL UNIQUE,
  group_name TEXT NOT NULL UNIQUE,
  group_type TEXT NOT NULL
);

CREATE TABLE char_group_rel (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  instance_id INTEGER NOT NULL,
  group_id TEXT NOT NULL,
  created_at DATETIME  NOT NULL,
  FOREIGN KEY (instance_id) REFERENCES game_character(instance_id),
  FOREIGN KEY (group_id) REFERENCES game_group(group_id)
);
EOF
)

# Create the database file
sqlite3 "$DB_FILE" <<EOF
$SQL_COMMANDS
EOF

# Output success message
echo "Database file '$DB_FILE' inited successfully."
