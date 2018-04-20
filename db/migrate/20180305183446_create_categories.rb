class CreateCategories < ActiveRecord::Migration
  def self.up
    create_table :categories do |t|
      t.string   :name
      t.string   :path
      t.string   :subject
      t.timestamps
    end

    def self.up
      # drop.categories
    end
    
  end
end
