require 'spec_helper'

describe "entradas/index" do
  before(:each) do
    assign(:entradas, [
      stub_model(Entrada,
        :titulo => "Titulo",
        :contenido => "MyText"
      ),
      stub_model(Entrada,
        :titulo => "Titulo",
        :contenido => "MyText"
      )
    ])
  end

  it "renders a list of entradas" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Titulo".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
