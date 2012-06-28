require 'spec_helper'

describe "contactos/show" do
  before(:each) do
    @contacto = assign(:contacto, stub_model(Contacto,
      :nombre => "Nombre",
      :apellido => "Apellido",
      :email => "Email",
      :telefono => "Telefono",
      :direccion => "Direccion",
      :distrito => "Distrito",
      :ciudad => "Ciudad",
      :provincia => "Provincia",
      :mensaje => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Nombre/)
    rendered.should match(/Apellido/)
    rendered.should match(/Email/)
    rendered.should match(/Telefono/)
    rendered.should match(/Direccion/)
    rendered.should match(/Distrito/)
    rendered.should match(/Ciudad/)
    rendered.should match(/Provincia/)
    rendered.should match(/MyText/)
  end
end
