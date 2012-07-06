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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120705082647) do

  create_table "admins", :force => true do |t|
    t.string   "email",                                 :default => "", :null => false
    t.string   "encrypted_password",     :limit => 128, :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                         :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "admins", ["email"], :name => "index_admins_on_email", :unique => true
  add_index "admins", ["reset_password_token"], :name => "index_admins_on_reset_password_token", :unique => true

  create_table "ads", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "ad_file_name"
    t.string   "ad_content_type"
    t.integer  "ad_file_size"
    t.datetime "ad_updated_at"
  end

  create_table "banners", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "banner_file_name"
    t.string   "banner_content_type"
    t.integer  "banner_file_size"
    t.datetime "banner_updated_at"
  end

  create_table "cabecera_banners", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "cabecera_banner_file_name"
    t.string   "cabecera_banner_content_type"
    t.integer  "cabecera_banner_file_size"
    t.datetime "cabecera_banner_updated_at"
  end

  create_table "contactos", :force => true do |t|
    t.string   "nombre"
    t.string   "apellido"
    t.string   "email"
    t.string   "telefono"
    t.string   "direccion"
    t.string   "distrito"
    t.string   "ciudad"
    t.string   "provincia"
    t.text     "mensaje"
    t.string   "pais"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "entradas", :force => true do |t|
    t.string   "titulo"
    t.text     "contenido"
    t.string   "slug"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "foto_file_name"
    t.string   "foto_content_type"
    t.integer  "foto_file_size"
    t.datetime "foto_updated_at"
  end

  add_index "entradas", ["slug"], :name => "index_entradas_on_slug"

  create_table "informacion_translations", :force => true do |t|
    t.integer  "informacion_id"
    t.string   "locale"
    t.string   "llamada_gratuita"
    t.string   "facebook"
    t.string   "email"
    t.string   "telefono_fijo"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "informacion_translations", ["informacion_id"], :name => "index_informacion_translations_on_informacion_id"
  add_index "informacion_translations", ["locale"], :name => "index_informacion_translations_on_locale"

  create_table "informaciones", :force => true do |t|
    t.string   "telefono_fijo"
    t.string   "llamada_gratuita"
    t.string   "email"
    t.string   "facebook"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "metas", :force => true do |t|
    t.string   "keywords"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ofertas", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "oferta_file_name"
    t.string   "oferta_content_type"
    t.integer  "oferta_file_size"
    t.datetime "oferta_updated_at"
  end

  create_table "productos", :force => true do |t|
    t.string   "nombre"
    t.text     "descripcion"
    t.string   "slug"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
  end

  add_index "productos", ["slug"], :name => "index_productos_on_slug"

  create_table "recetas", :force => true do |t|
    t.string   "nombre"
    t.text     "ingredientes"
    t.text     "preparacion"
    t.string   "slug"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "snapshot_file_name"
    t.string   "snapshot_content_type"
    t.integer  "snapshot_file_size"
    t.datetime "snapshot_updated_at"
  end

  add_index "recetas", ["slug"], :name => "index_recetas_on_slug"

  create_table "slides", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "slide_file_name"
    t.string   "slide_content_type"
    t.integer  "slide_file_size"
    t.datetime "slide_updated_at"
  end

  create_table "sucursal_translations", :force => true do |t|
    t.integer  "sucursal_id"
    t.string   "locale"
    t.string   "nombre"
    t.string   "direccion"
    t.string   "telefonos"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sucursal_translations", ["locale"], :name => "index_sucursal_translations_on_locale"
  add_index "sucursal_translations", ["sucursal_id"], :name => "index_sucursal_translations_on_sucursal_id"

  create_table "sucursales", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "nombre"
    t.string   "direccion"
    t.string   "telefonos"
  end

  create_table "testimonios", :force => true do |t|
    t.string   "nombre"
    t.text     "descripcion"
    t.string   "video_link"
    t.string   "tipo"
    t.string   "slug"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "imagen_file_name"
    t.string   "imagen_content_type"
    t.integer  "imagen_file_size"
    t.datetime "imagen_updated_at"
  end

  add_index "testimonios", ["slug"], :name => "index_testimonios_on_slug"

  create_table "usuarios", :force => true do |t|
    t.string   "email",                                 :default => "", :null => false
    t.string   "encrypted_password",     :limit => 128, :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                         :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "nombre"
    t.string   "apellido"
    t.string   "telefono"
    t.float    "altura"
    t.float    "peso"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "usuarios", ["confirmation_token"], :name => "index_usuarios_on_confirmation_token", :unique => true
  add_index "usuarios", ["email"], :name => "index_usuarios_on_email", :unique => true
  add_index "usuarios", ["reset_password_token"], :name => "index_usuarios_on_reset_password_token", :unique => true

end
