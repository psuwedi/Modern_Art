class CreateArtists < ActiveRecord::Migration
  def self.up
	create_table :artists do |t|
	t.column :name, :string, :null => false
	t.column :email, :string, :null => false, :default=> "via email"
	t.column :category, :string, :null => false, :default => "general"
	t.column :city, :string, :null => false
	t.column :phone, :string
	t.column :description, :text
	t.column :image, :string
	t.column :address, :string
	t.column :status, :string, :default=> 1
	t.column :country, :string
	t.column :created_at, :timestamp
	t.column :updated_at, :timestamp
   end

#	Artist.create :name => "Sam"

	end

	def self.down
	 drop_table :artists
	end
end


