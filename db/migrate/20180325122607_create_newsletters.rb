class CreateNewsletters < ActiveRecord::Migration
  def change
    create_table :newsletters do |t|
      t.string  :email, null: false, :default => 0
      t.integer   :status, :default => 0
      t.timestamps
    end
  end
end
