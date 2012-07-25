require 'spec_helper'

describe "promociones/new" do
  before(:each) do
    assign(:promocion, stub_model(Promocion,
      :nombre => "MyString",
      :pais => "MyString"
    ).as_new_record)
  end

  it "renders new promocion form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => promociones_path, :method => "post" do
      assert_select "input#promocion_nombre", :name => "promocion[nombre]"
      assert_select "input#promocion_pais", :name => "promocion[pais]"
    end
  end
end
