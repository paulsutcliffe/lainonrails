require 'spec_helper'

describe "cabecera_banners/new" do
  before(:each) do
    assign(:cabecera_banner, stub_model(CabeceraBanner).as_new_record)
  end

  it "renders new cabecera_banner form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => cabecera_banners_path, :method => "post" do
    end
  end
end
