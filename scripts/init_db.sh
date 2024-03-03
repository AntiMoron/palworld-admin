#!/bin/bash
# Name of the database file
DB_FILE="palserver.db"

rm -rf $DB_FILE

# SQL statements to create the database and table
SQL_COMMANDS=$(cat <<EOF
CREATE TABLE game_character (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  instance_id TEXT NOT NULL,
  player_uid TEXT,
  exp INTEGER,
  physical_health INTEGER,
  level INTEGER,
  hp INTEGER,
  full_stomach INTEGER,
  steam_id TEXT,
  gender TEXT,
  mp INTEGER,
  shield_max_hP INTEGER,
  max_hp INTEGER,
  max_sp INTEGER,
  max_mp INTEGER,
  talent_hp INTEGER,
  talent_melee INTEGER,
  talent_shot INTEGER,
  talent_defense INTEGER,
  passive_skill_list TEXT,
  owner_time DateTime,
  owner_player_uid TEXT,
  is_player INTEGER NOT NULL,
  owned_time TEXT,
  last_login_at DATETIME NOT NULL,
  nick_name TEXT NOT NULL,
  status TEXT,
  craft_speed INTEGER,
  craft_speeds TEXT,
  equip_waza TEXT,
  mastered_waza TEXT
);

CREATE TABLE game_group (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id TEXT NOT NULL UNIQUE,
  group_name TEXT NOT NULL UNIQUE,
  guild_name TEXT,
  group_type TEXT NOT NULL,
  base_camp_level INTEGER,
  base_ids TEXT,
  admin_player_uid TEXT NOT NULL
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
