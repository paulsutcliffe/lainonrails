require 'spec_helper'

describe "sucursales/new" do
  before(:each) do
    assign(:sucursal, stub_model(Sucursal,
      :nombre => "MyString",
      :direccion => "MyString",
      :telefonos => "MyString"
    ).as_new_record)
  end

  it "renders new sucursal form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => sucursales_path, :method => "post" do
      assert_select "input#sucursal_nombre", :name => "sucursal[nombre]"
      assert_select "input#sucursal_direccion", :name => "sucursal[direccion]"
      assert_select "input#sucursal_telefonos", :name => "sucursal[telefonos]"
    end
  end
end
