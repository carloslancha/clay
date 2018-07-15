import 'clay-lightsaber';

import Component from 'metal-component';
import defineWebComponent from 'metal-web-component';
import Soy from 'metal-soy';
import {Config} from 'metal-state';

import templates from './ClayLightsaberRack.soy.js';

/**
 * Metal ClayLightsaberRack component.
 */
class ClayLightsaberRack extends Component {
}

/**
 * State definition.
 * @static
 * @type {!Object}
 */
ClayLightsaberRack.STATE = {
    /**
	 * CSS classes to be applied to the element.
	 * @instance
	 * @memberof ClayLightsaberRack
	 * @type {?string|undefined}
	 * @default undefined
	 */
	elementClasses: Config.string(),

    /**
     * Id to be applied to the element.
     * @instance
     * @memberof ClayLightsaberRack
     * @type {?string|undefined}
     * @default undefined
     */
    id: Config.string(),

    /**
     * List of lighsabers
     */
    lightsabers: Config.arrayOf(Config.shapeOf({
        active: Config.bool(),
        color: Config.oneOf(['red','blue','purple','green']).value('blue'), 
    })).required(),
};

defineWebComponent('clay-lightsaber-rack', ClayLightsaberRack);

Soy.register(ClayLightsaberRack, templates);

export {ClayLightsaberRack};
export default ClayLightsaberRack;
