require 'spec_helper'

describe "promociones/edit" do
  before(:each) do
    @promocion = assign(:promocion, stub_model(Promocion,
      :nombre => "MyString",
      :pais => "MyString"
    ))
  end

  it "renders the edit promocion form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => promociones_path(@promocion), :method => "post" do
      assert_select "input#promocion_nombre", :name => "promocion[nombre]"
      assert_select "input#promocion_pais", :name => "promocion[pais]"
    end
  end
end
