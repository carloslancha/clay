import ClayLightsaber from '../ClayLightsaber';

let component;

describe('ClayLightsaber', function() {
  afterEach(() => {
    if (component) {
      component.dispose();
    }
  });

  it('should render the default markup', () => {
    component = new ClayLightsaber();

    expect(component).toMatchSnapshot();
  });

  it('should render a ClayLightsaber with classes', () => {
    component = new ClayLightsaber({
      elementClasses: 'my-custom-class',
    });

    expect(component).toMatchSnapshot();
  });

  it('should render a ClayLightsaber with id', () => {
    component = new ClayLightsaber({
      id: 'myId',
    });

    expect(component).toMatchSnapshot();
  });

});
