class AddFieldsToProducts < ActiveRecord::Migration
	def change
		# add_column :products,  :artist_id, :integer, :default => 0
		# add_column :products,  :description, :text
		# add_column :products,  :stock, :integer, :default => 0
		add_column :products,  :color, :string
		add_column :products,  :size, :string
		add_column :products,  :category_id, :integer
		add_column :products,  :frame, :string
		add_column :products,  :art_path, :string
  end
end
