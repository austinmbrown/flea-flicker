# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170921003233) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "favorite_teams", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "favorite_teams", ["team_id"], name: "index_favorite_teams_on_team_id", using: :btree
  add_index "favorite_teams", ["user_id"], name: "index_favorite_teams_on_user_id", using: :btree

  create_table "games", force: :cascade do |t|
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "stattleship_id"
    t.string   "label"
    t.string   "score"
    t.string   "scoreline"
    t.string   "status"
    t.integer  "away_team_score"
    t.integer  "home_team_score"
    t.integer  "week"
    t.datetime "kickoff"
    t.integer  "away_team_id"
    t.integer  "home_team_id"
    t.integer  "winning_team_id"
  end

  create_table "picks", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "game_id"
    t.integer  "picked_team_id"
    t.boolean  "correct"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.boolean  "fav_pick",       default: false
  end

  add_index "picks", ["game_id"], name: "index_picks_on_game_id", using: :btree
  add_index "picks", ["user_id"], name: "index_picks_on_user_id", using: :btree

  create_table "teams", force: :cascade do |t|
    t.string   "location"
    t.string   "name"
    t.string   "stattleship_id"
    t.string   "logo_url"
    t.integer  "wins",           default: 0
    t.integer  "losses",         default: 0
    t.integer  "ties",           default: 0
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "first_name"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
