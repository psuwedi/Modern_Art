class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.integer :customer_id
      t.integer  :employee_id
      t.timestamps
    end
  end
end
