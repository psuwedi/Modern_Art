class AddFieldsToUsers < ActiveRecord::Migration
  def change
    # add_column :users, :username, :string
    # add_column :users, :full_name, :string
    # add_column :users, :dob, :datetime
    #  add_column :users, :sex, :string
    add_column :users, :role, :string
    #  add_column :users, :active, :integer, :default => 0
    # add_column :users, :image_path, :string

    # add_column :users, :phone, :string

    # add_column :users, :district, :string

    # add_column :users, :country, :string

    # add_column :users, :city, :string

    # add_column :users, :address, :string

    # add_column :users, :subject, :text

  end
end
