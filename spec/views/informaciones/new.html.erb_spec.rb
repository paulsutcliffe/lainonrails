require 'spec_helper'

describe "informaciones/new" do
  before(:each) do
    assign(:informacion, stub_model(Informacion,
      :telefono_fijo => "MyString",
      :llamada_gratuita => "MyString",
      :email => "MyString",
      :facebook => "MyString"
    ).as_new_record)
  end

  it "renders new informacion form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => informaciones_path, :method => "post" do
      assert_select "input#informacion_telefono_fijo", :name => "informacion[telefono_fijo]"
      assert_select "input#informacion_llamada_gratuita", :name => "informacion[llamada_gratuita]"
      assert_select "input#informacion_email", :name => "informacion[email]"
      assert_select "input#informacion_facebook", :name => "informacion[facebook]"
    end
  end
end
