import React from 'react';
import {shallow, mount} from 'enzyme';

import QueryBuilder from './QueryBuilder';

describe('<QueryBuilder />', () => {

    it('should exist', () => {
        expect(QueryBuilder).to.exist;
    });

    describe('when rendered', () => {
        it('should render the root RuleGroup', () => {
            const dom = shallow(<QueryBuilder />);
            expect(dom.find('RuleGroup')).to.have.length(1);
        });

        it('should show the list of combinators in the RuleGroup', () => {
            const dom = mount(<QueryBuilder />);
            const options = dom.find('select option');
            expect(options).to.have.length(2); // and, or
        });

    });

    describe('when initial query is provided', () => {
        let dom;

        beforeEach(() => {
            const fields = [
                {name: 'firstName', label: 'First Name'},
                {name: 'lastName', label: 'Last Name'},
                {name: 'age', label: 'Age'},
            ];

            const query = {
                combinator: 'and',
                id: '111',
                rules: [
                    {
                        id: '222',
                        field: 'firstName',
                        value: 'Test',
                        operator: '='
                    }
                ]
            };

            dom = mount(<QueryBuilder query={query} fields={fields}/>);
        });

        it('should contain a <Rule />', () => {

            const rule = dom.find('Rule');
            expect(rule).to.have.length(1);
        });

        it('should have the Rule with the correct props', () => {
            const rule = dom.find('Rule');

            expect(rule.props().field).to.equal('firstName');
            expect(rule.props().value).to.equal('Test');
            expect(rule.props().operator).to.equal('=');
        });

        it('should have a select control with the provided fields', () => {
            const rule = dom.find('Rule');

            expect(rule.find('.rule-fields option')).to.have.length(3);
        });

        it('should have an field selector with the correct field', () => {
            const rule = dom.find('Rule');

            expect(rule.find('.rule-fields').props().value).to.equal('firstName');
        });

        it('should have an operator selector with the correct operator', () => {
            const rule = dom.find('Rule');

            expect(rule.find('.rule-operators').props().value).to.equal('=');
        });

        it('should have an input control with the correct value', () => {
            const rule = dom.find('Rule');

            expect(rule.find('input').props().value).to.equal('Test');
        });

    });

    describe('when initial operators are provided', () => {

        let dom;
        beforeEach(() => {
            const operators = [
                {name: 'null', label: 'Custom Is Null'},
                {name: 'notNull', label: 'Is Not Null'},
                {name: 'in', label: 'In'},
                {name: 'notIn', label: 'Not In'},
            ];

            const fields = [
                {name: 'firstName', label: 'First Name'},
                {name: 'lastName', label: 'Last Name'},
                {name: 'age', label: 'Age'},
            ];

            const query = {
                combinator: 'and',
                id: '111',
                rules: [
                    {
                        id: '222',
                        field: 'firstName',
                        value: 'Test',
                        operator: '='
                    }
                ]
            };

            dom = mount(<QueryBuilder operators={operators}
                                      fields={fields}
                                      query={query}/>);
        });

        it('should use the given operators', () => {
            const operatorOptions = dom.find('Rule').find('.rule-operators option');

            expect(operatorOptions.length).to.equal(4);
        });

        it('should match the label of the first operator', () => {
            const operatorOption = dom.find('Rule').find('.rule-operators option').first();

            expect(operatorOption.text()).to.equal('Custom Is Null');
        });
    });
});
