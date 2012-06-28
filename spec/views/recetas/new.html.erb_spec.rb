require 'spec_helper'

describe "recetas/new" do
  before(:each) do
    assign(:receta, stub_model(Receta,
      :nombre => "MyString",
      :ingredientes => "MyText",
      :preparacion => "MyText"
    ).as_new_record)
  end

  it "renders new receta form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => recetas_path, :method => "post" do
      assert_select "input#receta_nombre", :name => "receta[nombre]"
      assert_select "textarea#receta_ingredientes", :name => "receta[ingredientes]"
      assert_select "textarea#receta_preparacion", :name => "receta[preparacion]"
    end
  end
end
