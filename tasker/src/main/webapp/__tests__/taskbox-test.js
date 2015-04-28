// __tests__/taskbox-test.js

jest.dontMock('../app/taskbox.jsx');
describe('TaskBox', function() {
    it('changes the text after click', function() {
        var React = require('react/addons');
        var CheckboxWithLabel = require('../app/taskbox.jsx');
        var TestUtils = React.addons.TestUtils;

        // Render a checkbox with label in the document
        var checkbox = TestUtils.renderIntoDocument(
            <TaskBox labelOn="On" labelOff="Off" />
        );

        // Verify that it's Off by default
        var label = TestUtils.findRenderedDOMComponentWithTag(
            checkbox, 'label');
        expect(label.getDOMNode().textContent).toEqual('Off');

        // Simulate a click and verify that it is now On
        var input = TestUtils.findRenderedDOMComponentWithTag(
            checkbox, 'input');
        TestUtils.Simulate.change(input);
        expect(label.getDOMNode().textContent).toEqual('On');
    });
});