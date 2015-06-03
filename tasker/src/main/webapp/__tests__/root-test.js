'use strict';
import React from 'react/addons';
import expect from 'chai';
import TaskBox from '../app/js/components/TaskBox.jsx';
let { TestUtils } = React.addons;

describe('root', () => {
    it('renders without problems', function () {
        let item = {
            id: '111111',
            value: 'test value',
            complete: false
        };
        let taskbox = TestUtils.renderIntoDocument(
            <TaskBox
                id='0000000'
                key='444444444'
                item={item}
                ta='ta'
                u='u'
                />
        );
        //console.log(expect(taskbox));
        //expect(taskbox).to.be.an('object')
    });
});