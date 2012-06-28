require 'spec_helper'

describe "entradas/new" do
  before(:each) do
    assign(:entrada, stub_model(Entrada,
      :titulo => "MyString",
      :contenido => "MyText"
    ).as_new_record)
  end

  it "renders new entrada form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => entradas_path, :method => "post" do
      assert_select "input#entrada_titulo", :name => "entrada[titulo]"
      assert_select "textarea#entrada_contenido", :name => "entrada[contenido]"
    end
  end
end
