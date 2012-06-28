require 'spec_helper'

describe "contactos/index" do
  before(:each) do
    assign(:contactos, [
      stub_model(Contacto,
        :nombre => "Nombre",
        :apellido => "Apellido",
        :email => "Email",
        :telefono => "Telefono",
        :direccion => "Direccion",
        :distrito => "Distrito",
        :ciudad => "Ciudad",
        :provincia => "Provincia",
        :mensaje => "MyText"
      ),
      stub_model(Contacto,
        :nombre => "Nombre",
        :apellido => "Apellido",
        :email => "Email",
        :telefono => "Telefono",
        :direccion => "Direccion",
        :distrito => "Distrito",
        :ciudad => "Ciudad",
        :provincia => "Provincia",
        :mensaje => "MyText"
      )
    ])
  end

  it "renders a list of contactos" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Nombre".to_s, :count => 2
    assert_select "tr>td", :text => "Apellido".to_s, :count => 2
    assert_select "tr>td", :text => "Email".to_s, :count => 2
    assert_select "tr>td", :text => "Telefono".to_s, :count => 2
    assert_select "tr>td", :text => "Direccion".to_s, :count => 2
    assert_select "tr>td", :text => "Distrito".to_s, :count => 2
    assert_select "tr>td", :text => "Ciudad".to_s, :count => 2
    assert_select "tr>td", :text => "Provincia".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
