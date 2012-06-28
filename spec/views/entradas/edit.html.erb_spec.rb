require 'spec_helper'

describe "entradas/edit" do
  before(:each) do
    @entrada = assign(:entrada, stub_model(Entrada,
      :titulo => "MyString",
      :contenido => "MyText"
    ))
  end

  it "renders the edit entrada form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => entradas_path(@entrada), :method => "post" do
      assert_select "input#entrada_titulo", :name => "entrada[titulo]"
      assert_select "textarea#entrada_contenido", :name => "entrada[contenido]"
    end
  end
end
