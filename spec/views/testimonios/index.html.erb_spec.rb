require 'spec_helper'

describe "testimonios/index" do
  before(:each) do
    assign(:testimonios, [
      stub_model(Testimonio,
        :nombre => "Nombre",
        :descripcion => "MyText",
        :video_link => "Video Link",
        :tipo => "Tipo"
      ),
      stub_model(Testimonio,
        :nombre => "Nombre",
        :descripcion => "MyText",
        :video_link => "Video Link",
        :tipo => "Tipo"
      )
    ])
  end

  it "renders a list of testimonios" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Nombre".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "Video Link".to_s, :count => 2
    assert_select "tr>td", :text => "Tipo".to_s, :count => 2
  end
end
