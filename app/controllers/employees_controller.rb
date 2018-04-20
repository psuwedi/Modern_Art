class EmployeesController < ApplicationController
  def index
		@employees = Employee.all
    render json: @employees
	end




  def new
    @employee = Employee.new
  end

  def create
    @employee = Employee.new(employee_params)
    if @employee.save
      redirect_to root_url, notice: 'New Employee Entry Was Created'
    else
      render :new
    end
  end
  #
  #
  #
	# def create
	#   Employee.create(employee_params)
	# end
	def destroy
		Employee.destroy(params[:id])
	end

	def update
		Employee = Employee.find(params["id"])
		Employee.update_attributes(employee_params)
		render json: Employee
	end

	private

	def employee_params
		params.require(:Employee).permit(:email, :Employeename, :password_digest)
	end

end
