require 'test_helper'

class PromotionControllerTest < ActionController::TestCase
  test "should get promotion" do
    get :promotion
    assert_response :success
  end

end
