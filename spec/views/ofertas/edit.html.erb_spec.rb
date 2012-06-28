require 'spec_helper'

describe "ofertas/edit" do
  before(:each) do
    @oferta = assign(:oferta, stub_model(Oferta))
  end

  it "renders the edit oferta form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => ofertas_path(@oferta), :method => "post" do
    end
  end
end
