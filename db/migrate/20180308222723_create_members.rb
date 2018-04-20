class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|

      t.integer  :approved_by
      t.string   :membership_no
      t.integer  :auth_id, null: false
      t.integer   :status, :default => 0
      t.timestamps
      
    end
  end
end
