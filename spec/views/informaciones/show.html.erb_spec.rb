require 'spec_helper'

describe "informaciones/show" do
  before(:each) do
    @informacion = assign(:informacion, stub_model(Informacion,
      :telefono_fijo => "Telefono Fijo",
      :llamada_gratuita => "Llamada Gratuita",
      :email => "Email",
      :facebook => "Facebook"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Telefono Fijo/)
    rendered.should match(/Llamada Gratuita/)
    rendered.should match(/Email/)
    rendered.should match(/Facebook/)
  end
end
