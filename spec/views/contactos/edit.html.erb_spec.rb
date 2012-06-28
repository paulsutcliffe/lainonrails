require 'spec_helper'

describe "contactos/edit" do
  before(:each) do
    @contacto = assign(:contacto, stub_model(Contacto,
      :nombre => "MyString",
      :apellido => "MyString",
      :email => "MyString",
      :telefono => "MyString",
      :direccion => "MyString",
      :distrito => "MyString",
      :ciudad => "MyString",
      :provincia => "MyString",
      :mensaje => "MyText"
    ))
  end

  it "renders the edit contacto form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => contactos_path(@contacto), :method => "post" do
      assert_select "input#contacto_nombre", :name => "contacto[nombre]"
      assert_select "input#contacto_apellido", :name => "contacto[apellido]"
      assert_select "input#contacto_email", :name => "contacto[email]"
      assert_select "input#contacto_telefono", :name => "contacto[telefono]"
      assert_select "input#contacto_direccion", :name => "contacto[direccion]"
      assert_select "input#contacto_distrito", :name => "contacto[distrito]"
      assert_select "input#contacto_ciudad", :name => "contacto[ciudad]"
      assert_select "input#contacto_provincia", :name => "contacto[provincia]"
      assert_select "textarea#contacto_mensaje", :name => "contacto[mensaje]"
    end
  end
end
