require 'spec_helper'

describe "computests/index" do
  before(:each) do
    assign(:computests, [
      stub_model(Computest,
        :imc => 1.5,
        :peso_ideal => 1.5,
        :usuario_id => 1
      ),
      stub_model(Computest,
        :imc => 1.5,
        :peso_ideal => 1.5,
        :usuario_id => 1
      )
    ])
  end

  it "renders a list of computests" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.5.to_s, :count => 2
    assert_select "tr>td", :text => 1.5.to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
  end
end
