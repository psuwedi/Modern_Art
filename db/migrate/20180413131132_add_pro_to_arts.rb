class AddProToArts < ActiveRecord::Migration
  def change
    add_column :arts, :promotion, :string, :default => "no"
  end
end
