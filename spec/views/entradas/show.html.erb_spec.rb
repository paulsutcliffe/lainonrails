require 'spec_helper'

describe "entradas/show" do
  before(:each) do
    @entrada = assign(:entrada, stub_model(Entrada,
      :titulo => "Titulo",
      :contenido => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Titulo/)
    rendered.should match(/MyText/)
  end
end
