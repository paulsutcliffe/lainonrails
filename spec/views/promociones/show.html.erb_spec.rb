require 'spec_helper'

describe "promociones/show" do
  before(:each) do
    @promocion = assign(:promocion, stub_model(Promocion,
      :nombre => "Nombre",
      :pais => "Pais"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Nombre/)
    rendered.should match(/Pais/)
  end
end
