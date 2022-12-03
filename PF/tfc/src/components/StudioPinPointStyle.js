// https://github.dev/google-map-react/old-examples/blob/master/web/flux/components/examples/x_simple/simple_map_page.jsx

const K_WIDTH = 30;
const K_HEIGHT = 30;

const StudioPinPointStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '5px solid #f44336',
  borderRadius: K_HEIGHT,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 10,
  fontWeight: 'bold',
  padding: 4,
};

export {StudioPinPointStyle};
