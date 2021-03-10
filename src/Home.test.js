import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Home from './Home';
import LargeButton from './components/LargeButton';

// TOFIX
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home />, div);
});

// TOFIX
test('Home test test', () => {
    const HomeComponent = <Home />;
    const Home = shallow(HomeComponent);
    expect(Home).toHaveTextContent();
});

// PASS
describe('Button', () => {
    it('should be defined', () => {
      expect(LargeButton).toBeDefined();
    });
    it('should render correctly', () => {
      const tree = shallow(
        <LargeButton text="TRY VISION FOR FREE" fontColor={fontColor.Blue} bgColor="white" />
      );
      expect(tree).toMatchSnapshot();
    });
});

// TOFIX
it('When active link clicked, will push correct filter message', () => {
    let passedFilterType = '';
    const handleOnTotalsFilter = (filterType) => {
        passedFilterType = filterType;
    };
    const accounts = {};
    const wrapper = shallow(<LargeButton accounts={accounts} filterHeader="" onTotalsFilter={handleOnTotalsFilter} />);

    const button = wrapper.find('#archived-button');
    button.simulate('click');
    expect(passedFilterType).toBe(TotalsFilterType.archived);
});

// TOFIX
describe('test button click', () => {
    it('test button', () => {
      const mockCallBack = jest.fn();
  
      const button = shallow((<LargeButton onClick={mockCallBack}>Ok!</LargeButton>));
      button.find('button').simulate('click');
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });
  });

// const title = 'Test Title';
// let wrapped = shallow(<Title>{title}</Title>);
// describe('Title', () => {
//   it('should render the Title Component correctly', () => {   
//     expect(wrapped).toMatchSnapshot();
//   });
//   it('renders the Titles children', () => { 
//     expect(wrapped.find('h1').text()).toEqual(title);
//   });
// });