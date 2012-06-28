require 'spec_helper'

describe "testimonios/edit" do
  before(:each) do
    @testimonio = assign(:testimonio, stub_model(Testimonio,
      :nombre => "MyString",
      :descripcion => "MyText",
      :video_link => "MyString",
      :tipo => "MyString"
    ))
  end

  it "renders the edit testimonio form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => testimonios_path(@testimonio), :method => "post" do
      assert_select "input#testimonio_nombre", :name => "testimonio[nombre]"
      assert_select "textarea#testimonio_descripcion", :name => "testimonio[descripcion]"
      assert_select "input#testimonio_video_link", :name => "testimonio[video_link]"
      assert_select "input#testimonio_tipo", :name => "testimonio[tipo]"
    end
  end
end
