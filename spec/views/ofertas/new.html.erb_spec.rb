require 'spec_helper'

describe "ofertas/new" do
  before(:each) do
    assign(:oferta, stub_model(Oferta).as_new_record)
  end

  it "renders new oferta form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => ofertas_path, :method => "post" do
    end
  end
end
