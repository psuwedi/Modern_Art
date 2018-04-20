class Art < ApplicationRecord

	belongs_to :artist

	validates_presence_of :artist
	validates_numericality_of :price, :message=>"Error Message"
end




