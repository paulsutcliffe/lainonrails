require 'spec_helper'

describe "productos/new" do
  before(:each) do
    assign(:producto, stub_model(Producto,
      :nombre => "MyString",
      :descripcion => "MyText"
    ).as_new_record)
  end

  it "renders new producto form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => productos_path, :method => "post" do
      assert_select "input#producto_nombre", :name => "producto[nombre]"
      assert_select "textarea#producto_descripcion", :name => "producto[descripcion]"
    end
  end
end
