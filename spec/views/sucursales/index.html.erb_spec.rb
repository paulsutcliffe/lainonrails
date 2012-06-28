require 'spec_helper'

describe "sucursales/index" do
  before(:each) do
    assign(:sucursales, [
      stub_model(Sucursal,
        :nombre => "Nombre",
        :direccion => "Direccion",
        :telefonos => "Telefonos"
      ),
      stub_model(Sucursal,
        :nombre => "Nombre",
        :direccion => "Direccion",
        :telefonos => "Telefonos"
      )
    ])
  end

  it "renders a list of sucursales" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Nombre".to_s, :count => 2
    assert_select "tr>td", :text => "Direccion".to_s, :count => 2
    assert_select "tr>td", :text => "Telefonos".to_s, :count => 2
  end
end
