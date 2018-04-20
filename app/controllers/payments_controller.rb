class PaymentsController < ApplicationController
	skip_before_action :verify_authenticity_token
    before_action :check_valid_user, except: [:login]
	def check_valid_user
		if user_signed_in?
			if current_user.role == "admin" or current_user.role == "employee"
       			true
			else
       			flash[:error] =  'Please login first'
				render  "/cms/login"
			end
       	else
       		flash[:error] =  'Please login first'
       		render  "/cms/login"
    	end
  	end

  	def index
  		date = Date.today - 30.days
  		@orders = Order.all.where(updated_at: date...date)
  		@payments = Payment.all.where(updated_at: date...date)
  		render "/ims/payment"
  	end

end
