import ClayLightsaberRack from '../ClayLightsaberRack';

let component;

describe('ClayLightsaberRack', function() {
  afterEach(() => {
    if (component) {
      component.dispose();
    }
  });

  it('should render the default markup', () => {
    component = new ClayLightsaberRack();

    expect(component).toMatchSnapshot();
  });

  it('should render a ClayLightsaberRack with classes', () => {
    component = new ClayLightsaberRack({
      elementClasses: 'my-custom-class',
    });

    expect(component).toMatchSnapshot();
  });

  it('should render a ClayLightsaberRack with id', () => {
    component = new ClayLightsaberRack({
      id: 'myId',
    });

    expect(component).toMatchSnapshot();
  });

});
