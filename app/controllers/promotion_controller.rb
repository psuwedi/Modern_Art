class PromotionController < ApplicationController
  def promotion
  	@arts = Art.all.where(promotion: 'yes').limit(100).order("updated_at DESC")
  end
end
