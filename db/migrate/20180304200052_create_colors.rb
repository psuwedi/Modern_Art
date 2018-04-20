class CreateColors < ActiveRecord::Migration
  def change
    create_table :colors do |t|
      t.string :art_color, :default => "white"
      t.timestamps
    end
  end
end
