class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
      t.string  :added_by
      t.string   :username
      t.string   :first_name
      t.string   :phone
      t.string   :email
      t.timestamps
    end
  end
end
