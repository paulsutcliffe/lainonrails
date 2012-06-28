require 'spec_helper'

describe "informaciones/index" do
  before(:each) do
    assign(:informaciones, [
      stub_model(Informacion,
        :telefono_fijo => "Telefono Fijo",
        :llamada_gratuita => "Llamada Gratuita",
        :email => "Email",
        :facebook => "Facebook"
      ),
      stub_model(Informacion,
        :telefono_fijo => "Telefono Fijo",
        :llamada_gratuita => "Llamada Gratuita",
        :email => "Email",
        :facebook => "Facebook"
      )
    ])
  end

  it "renders a list of informaciones" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Telefono Fijo".to_s, :count => 2
    assert_select "tr>td", :text => "Llamada Gratuita".to_s, :count => 2
    assert_select "tr>td", :text => "Email".to_s, :count => 2
    assert_select "tr>td", :text => "Facebook".to_s, :count => 2
  end
end
