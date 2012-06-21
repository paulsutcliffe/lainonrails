require 'test_helper'

class MetasControllerTest < ActionController::TestCase
  setup do
    @meta = metas(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:metas)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create meta" do
    assert_difference('Meta.count') do
      post :create, :meta => @meta.attributes
    end

    assert_redirected_to meta_path(assigns(:meta))
  end

  test "should show meta" do
    get :show, :id => @meta.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @meta.to_param
    assert_response :success
  end

  test "should update meta" do
    put :update, :id => @meta.to_param, :meta => @meta.attributes
    assert_redirected_to meta_path(assigns(:meta))
  end

  test "should destroy meta" do
    assert_difference('Meta.count', -1) do
      delete :destroy, :id => @meta.to_param
    end

    assert_redirected_to metas_path
  end
end
