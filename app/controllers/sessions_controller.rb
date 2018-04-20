class SessionsController < Devise::SessionsController

  # def after_sign_in_path_for(resource)
  #   if resource.role == "dealer"
  #     dashboard_dealer_path 
  #   elsif resource.role == "admin"
  #     admin_dashboard_path
  #  else
  #    dashboard_customer_path
  #  end
  # end


end
