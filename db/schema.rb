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

ActiveRecord::Schema.define(version: 20130716132701) do

  create_table "actions", force: true do |t|
    t.string "name"
  end

  create_table "data", force: true do |t|
    t.string  "olbudget"
    t.string  "aolbudget"
    t.string  "baseline"
    t.string  "standard"
    t.string  "oltarget"
    t.string  "optarget"
    t.string  "myr"
    t.string  "yer"
    t.string  "year"
    t.integer "indicator_id"
    t.string  "indicator_type"
    t.integer "operation_id"
    t.integer "ppg_id"
  end

  create_table "impact_indicators", force: true do |t|
    t.string  "objective"
    t.string  "name"
    t.integer "action_id"
  end

  create_table "operations", force: true do |t|
    t.string  "country"
    t.string  "iso"
    t.integer "lng"
    t.integer "lat"
  end

  create_table "perf_indicators", force: true do |t|
    t.string  "output"
    t.string  "name"
    t.integer "action_id"
  end

  create_table "ppgs", force: true do |t|
    t.string "name"
  end

end
