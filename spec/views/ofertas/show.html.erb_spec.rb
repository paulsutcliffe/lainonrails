require 'spec_helper'

describe "ofertas/show" do
  before(:each) do
    @oferta = assign(:oferta, stub_model(Oferta))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
  end
end
