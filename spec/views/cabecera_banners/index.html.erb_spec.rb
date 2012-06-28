require 'spec_helper'

describe "cabecera_banners/index" do
  before(:each) do
    assign(:cabecera_banners, [
      stub_model(CabeceraBanner),
      stub_model(CabeceraBanner)
    ])
  end

  it "renders a list of cabecera_banners" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
  end
end
