require 'spec_helper'

describe "sucursales/show" do
  before(:each) do
    @sucursal = assign(:sucursal, stub_model(Sucursal,
      :nombre => "Nombre",
      :direccion => "Direccion",
      :telefonos => "Telefonos"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Nombre/)
    rendered.should match(/Direccion/)
    rendered.should match(/Telefonos/)
  end
end
