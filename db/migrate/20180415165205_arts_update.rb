class ArtsUpdate < ActiveRecord::Migration
  def self.up
	create_table :arts do |t|
		t.column :title, :string, :limit => 32, :null => false
		t.column :artist_id, :integer, :default => 0
		t.column :description, :text
		t.column :stock, :integer, :default => 0
   		t.decimal :price, precision: 12, scale: 3
   		t.boolean :active
    	t.string :name
    	t.string :color
    	t.string :size
    	t.string :category_id
    	t.string :frame
    	t.string :art_path
    	t.decimal :price, precision: 19, scale: 2, :default => 0.00
    	t.integer :stock_level , :default => 0
    	t.string  :promotion, :default => "no"
		t.column :created_at, :timestamp
		t.column :updated_at, :timestamp
    end
  end

 def self.down
  drop_table :arts
 end



end


