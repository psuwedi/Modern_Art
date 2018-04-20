class ImsController < ApplicationController
	skip_before_action :verify_authenticity_token
    # before_action :authenticate_user!
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
  		@stock_level = []
   		@levels = {}
  		@days = get_dates
  		@pending = []
  		@placed = []
  		@cancelled = []
  		@shipped = []
  		@days.each do |d|
  			get_stock(d)
  			get_orders(d)
  		end
  		@category = Category.all.map(&:name)
		@days = @days.reverse
		dashboard
 	end

 	def get_orders(date)
 		orders = Order.all.where(updated_at: date...date+1)
 		pending = 0
 		placed = 0
 		cancelled = 0
 		shipped = 0
 		
 		orders.each do |order|
 			status = order.order_status_id.to_i
 			if status == 1
 				pending += 1
 			elsif status == 2
 				placed += 1
 			elsif status == 4
 				cancelled += 1
 			else 
 				shipped += 1
 			end		
 		end 
 		# 
 		@pending << pending
 		@placed << placed
 		@cancelled << cancelled
 		@shipped << shipped

 	end



	def dashboard
 		
 		# category = Category.all
 		# stock = Art.where(updated_at: day.to_s... day.to_s + " 23:59:59")
 		# i = 0

 		@summary = {1 =>  {"name" => "orders", "weekly" => 2, "monthly" => 10}}
 	end


 	def get_stock(date)
 		stock = Art.where(updated_at: date...date+1).count rescue 0
 		@stock_level << stock 
 	end

 	def get_dates
 		days = []
 		start = Date.today
  		for i in 0..6
   			days << (start - i.days)
   		end
   		return days
 	end

 	def summary
 		dates = get_dates.reverse
 		day = dates[params["d"].to_i]
 		hash = {}
 		category = Category.all
 		stock = Art.where(updated_at: day.to_s... day.to_s + " 23:59:59")
 		stock.each do |s|
  			 n = category[s.category_id.to_i].name
             hash[n] = hash[n].to_i + s.stock_level.to_i
  		end

  		# raise hash.to_json
  		render :json=> hash
 	end

 	def stock
 		
 	end


 	def invoices
 		
 	end

 	def inquiries
 		
 	end
end
