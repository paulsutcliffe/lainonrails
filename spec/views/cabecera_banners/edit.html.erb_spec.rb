require 'spec_helper'

describe "cabecera_banners/edit" do
  before(:each) do
    @cabecera_banner = assign(:cabecera_banner, stub_model(CabeceraBanner))
  end

  it "renders the edit cabecera_banner form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => cabecera_banners_path(@cabecera_banner), :method => "post" do
    end
  end
end
