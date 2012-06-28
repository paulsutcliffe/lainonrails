require 'spec_helper'

describe "testimonios/new" do
  before(:each) do
    assign(:testimonio, stub_model(Testimonio,
      :nombre => "MyString",
      :descripcion => "MyText",
      :video_link => "MyString",
      :tipo => "MyString"
    ).as_new_record)
  end

  it "renders new testimonio form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => testimonios_path, :method => "post" do
      assert_select "input#testimonio_nombre", :name => "testimonio[nombre]"
      assert_select "textarea#testimonio_descripcion", :name => "testimonio[descripcion]"
      assert_select "input#testimonio_video_link", :name => "testimonio[video_link]"
      assert_select "input#testimonio_tipo", :name => "testimonio[tipo]"
    end
  end
end
