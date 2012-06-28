require 'spec_helper'

describe "recetas/index" do
  before(:each) do
    assign(:recetas, [
      stub_model(Receta,
        :nombre => "Nombre",
        :ingredientes => "MyText",
        :preparacion => "MyText"
      ),
      stub_model(Receta,
        :nombre => "Nombre",
        :ingredientes => "MyText",
        :preparacion => "MyText"
      )
    ])
  end

  it "renders a list of recetas" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Nombre".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
