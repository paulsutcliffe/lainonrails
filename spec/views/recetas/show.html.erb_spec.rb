require 'spec_helper'

describe "recetas/show" do
  before(:each) do
    @receta = assign(:receta, stub_model(Receta,
      :nombre => "Nombre",
      :ingredientes => "MyText",
      :preparacion => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Nombre/)
    rendered.should match(/MyText/)
    rendered.should match(/MyText/)
  end
end
