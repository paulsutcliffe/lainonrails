require 'spec_helper'

describe "promociones/index" do
  before(:each) do
    assign(:promociones, [
      stub_model(Promocion,
        :nombre => "Nombre",
        :pais => "Pais"
      ),
      stub_model(Promocion,
        :nombre => "Nombre",
        :pais => "Pais"
      )
    ])
  end

  it "renders a list of promociones" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Nombre".to_s, :count => 2
    assert_select "tr>td", :text => "Pais".to_s, :count => 2
  end
end
