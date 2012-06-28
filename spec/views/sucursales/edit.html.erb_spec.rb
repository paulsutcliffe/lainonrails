require 'spec_helper'

describe "sucursales/edit" do
  before(:each) do
    @sucursal = assign(:sucursal, stub_model(Sucursal,
      :nombre => "MyString",
      :direccion => "MyString",
      :telefonos => "MyString"
    ))
  end

  it "renders the edit sucursal form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => sucursales_path(@sucursal), :method => "post" do
      assert_select "input#sucursal_nombre", :name => "sucursal[nombre]"
      assert_select "input#sucursal_direccion", :name => "sucursal[direccion]"
      assert_select "input#sucursal_telefonos", :name => "sucursal[telefonos]"
    end
  end
end
