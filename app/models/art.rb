class Art < ActiveRecord::Base
  has_many :order_items

  # before_save :traits_present

  default_scope { where(active: true) }

  private

  def traits_present
    check_if_nill(params[:color])
    check_if_nill(params[:category])
    check_if_nill(params[:size])
   end

  def check_if_nill(string)
    if string.blank?
      return false
    end

    return true
  end
  
end
