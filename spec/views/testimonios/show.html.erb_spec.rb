require 'spec_helper'

describe "testimonios/show" do
  before(:each) do
    @testimonio = assign(:testimonio, stub_model(Testimonio,
      :nombre => "Nombre",
      :descripcion => "MyText",
      :video_link => "Video Link",
      :tipo => "Tipo"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Nombre/)
    rendered.should match(/MyText/)
    rendered.should match(/Video Link/)
    rendered.should match(/Tipo/)
  end
end
