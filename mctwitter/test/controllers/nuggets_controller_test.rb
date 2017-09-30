require 'test_helper'

class NuggetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @nugget = nuggets(:one)
  end

  test "should get index" do
    get nuggets_url
    assert_response :success
  end

  test "should get new" do
    get new_nugget_url
    assert_response :success
  end

  test "should create nugget" do
    assert_difference('Nugget.count') do
      post nuggets_url, params: { nugget: { message: @nugget.message } }
    end

    assert_redirected_to nugget_url(Nugget.last)
  end

  test "should show nugget" do
    get nugget_url(@nugget)
    assert_response :success
  end

  test "should get edit" do
    get edit_nugget_url(@nugget)
    assert_response :success
  end

  test "should update nugget" do
    patch nugget_url(@nugget), params: { nugget: { message: @nugget.message } }
    assert_redirected_to nugget_url(@nugget)
  end

  test "should destroy nugget" do
    assert_difference('Nugget.count', -1) do
      delete nugget_url(@nugget)
    end

    assert_redirected_to nuggets_url
  end
end
