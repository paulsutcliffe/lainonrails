require 'spec_helper'

describe "ofertas/index" do
  before(:each) do
    assign(:ofertas, [
      stub_model(Oferta),
      stub_model(Oferta)
    ])
  end

  it "renders a list of ofertas" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
  end
end
