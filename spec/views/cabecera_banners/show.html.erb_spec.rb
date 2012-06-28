require 'spec_helper'

describe "cabecera_banners/show" do
  before(:each) do
    @cabecera_banner = assign(:cabecera_banner, stub_model(CabeceraBanner))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
  end
end
