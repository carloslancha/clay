import Component from 'metal-component';
import defineWebComponent from 'metal-web-component';
import Soy from 'metal-soy';
import {Config} from 'metal-state';

import templates from './ClayLightsaber.soy.js';

/**
 * Metal ClayLightsaber component.
 */
class ClayLightsaber extends Component {
}

/**
 * State definition.
 * @static
 * @type {!Object}
 */
ClayLightsaber.STATE = {
    /**
	 * CSS classes to be applied to the element.
	 * @instance
	 * @memberof ClayLightsaber
	 * @type {?string|undefined}
	 * @default undefined
	 */
	elementClasses: Config.string(),

    /**
     * Id to be applied to the element.
     * @instance
     * @memberof ClayLightsaber
     * @type {?string|undefined}
     * @default undefined
     */
    id: Config.string(),
};

defineWebComponent('clay-lightsaber', ClayLightsaber);

Soy.register(ClayLightsaber, templates);

export {ClayLightsaber};
export default ClayLightsaber;
