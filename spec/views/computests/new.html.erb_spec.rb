require 'spec_helper'

describe "computests/new" do
  before(:each) do
    assign(:computest, stub_model(Computest,
      :imc => 1.5,
      :peso_ideal => 1.5,
      :usuario_id => 1
    ).as_new_record)
  end

  it "renders new computest form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => computests_path, :method => "post" do
      assert_select "input#computest_imc", :name => "computest[imc]"
      assert_select "input#computest_peso_ideal", :name => "computest[peso_ideal]"
      assert_select "input#computest_usuario_id", :name => "computest[usuario_id]"
    end
  end
end
