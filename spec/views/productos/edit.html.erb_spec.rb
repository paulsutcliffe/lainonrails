require 'spec_helper'

describe "productos/edit" do
  before(:each) do
    @producto = assign(:producto, stub_model(Producto,
      :nombre => "MyString",
      :descripcion => "MyText"
    ))
  end

  it "renders the edit producto form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => productos_path(@producto), :method => "post" do
      assert_select "input#producto_nombre", :name => "producto[nombre]"
      assert_select "textarea#producto_descripcion", :name => "producto[descripcion]"
    end
  end
end
