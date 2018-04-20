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

ActiveRecord::Schema.define(version: 20180417171029) do

  create_table "appointments", force: :cascade do |t|
    t.integer  "customer_id", limit: 4
    t.integer  "employee_id", limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "artists", force: :cascade do |t|
    t.string   "name",        limit: 255,                         null: false
    t.string   "email",       limit: 255,   default: "via email", null: false
    t.string   "category",    limit: 255,   default: "general",   null: false
    t.string   "city",        limit: 255,                         null: false
    t.string   "phone",       limit: 255
    t.text     "description", limit: 65535
    t.string   "image",       limit: 255
    t.string   "address",     limit: 255
    t.string   "status",      limit: 255,   default: "1"
    t.string   "country",     limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "arts", force: :cascade do |t|
    t.string   "title",       limit: 32,                                            null: false
    t.integer  "artist_id",   limit: 4,                              default: 0
    t.text     "description", limit: 65535
    t.integer  "stock",       limit: 4,                              default: 0
    t.decimal  "price",                     precision: 19, scale: 2, default: 0.0
    t.boolean  "active"
    t.string   "name",        limit: 255
    t.string   "color",       limit: 255
    t.string   "size",        limit: 255
    t.string   "category_id", limit: 255
    t.string   "frame",       limit: 255
    t.string   "art_path",    limit: 255
    t.integer  "stock_level", limit: 4,                              default: 0
    t.string   "promotion",   limit: 255,                            default: "no"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "auths", force: :cascade do |t|
    t.string   "email",           limit: 255
    t.string   "username",        limit: 255
    t.string   "password_digest", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "categories", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "path",       limit: 255
    t.string   "subject",    limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "colors", force: :cascade do |t|
    t.string   "art_color",  limit: 255, default: "white"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "customers", force: :cascade do |t|
    t.string   "approved_by", limit: 255,   default: "via email"
    t.string   "email",       limit: 255
    t.string   "surname",     limit: 255
    t.string   "firstname",   limit: 255
    t.text     "description", limit: 65535
    t.string   "city",        limit: 255
    t.string   "phone",       limit: 255
    t.string   "image",       limit: 255
    t.string   "address",     limit: 255
    t.integer  "status",      limit: 4,     default: 1
    t.string   "country",     limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "employees", force: :cascade do |t|
    t.string   "added_by",   limit: 255
    t.string   "username",   limit: 255
    t.string   "first_name", limit: 255
    t.string   "phone",      limit: 255
    t.string   "email",      limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "frames", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "members", force: :cascade do |t|
    t.integer  "approved_by",   limit: 4
    t.string   "membership_no", limit: 255
    t.integer  "auth_id",       limit: 4,               null: false
    t.integer  "status",        limit: 4,   default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "newsletters", force: :cascade do |t|
    t.string   "email",      limit: 255, default: "0", null: false
    t.integer  "status",     limit: 4,   default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "order_items", force: :cascade do |t|
    t.integer  "art_id",      limit: 4
    t.integer  "order_id",    limit: 4
    t.decimal  "unit_price",            precision: 12, scale: 3
    t.integer  "quantity",    limit: 4
    t.decimal  "total_price",           precision: 12, scale: 3
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "order_items", ["art_id"], name: "index_order_items_on_art_id", using: :btree
  add_index "order_items", ["order_id"], name: "index_order_items_on_order_id", using: :btree

  create_table "order_statuses", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "orders", force: :cascade do |t|
    t.decimal  "subtotal",                    precision: 12, scale: 3
    t.decimal  "tax",                         precision: 12, scale: 3
    t.decimal  "shipping",                    precision: 12, scale: 3
    t.decimal  "total",                       precision: 12, scale: 3
    t.integer  "order_status_id", limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email",           limit: 255,                          default: "new_customer"
  end

  add_index "orders", ["order_status_id"], name: "index_orders_on_order_status_id", using: :btree

  create_table "payments", force: :cascade do |t|
    t.integer  "order_id",   limit: 4
    t.decimal  "amount",                 precision: 19, scale: 2, default: 0.0
    t.string   "status",     limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "products", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "title",       limit: 255
    t.decimal  "price",                   precision: 12, scale: 3
    t.boolean  "active"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "color",       limit: 255
    t.string   "size",        limit: 255
    t.integer  "category_id", limit: 4
    t.string   "frame",       limit: 255
    t.string   "art_path",    limit: 255
  end

  create_table "sizes", force: :cascade do |t|
    t.string   "size",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "",         null: false
    t.string   "encrypted_password",     limit: 255, default: "",         null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,          null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.string   "role",                   limit: 255, default: "customer", null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
