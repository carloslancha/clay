import ClayComponent from 'clay-component';
import defineWebComponent from 'metal-web-component';
import Soy from 'metal-soy';
import {Config} from 'metal-state';

import templates from './ClayLightsaber.soy.js';

/**
 * Metal ClayLightsaber component.
 */
class ClayLightsaber extends ClayComponent {
    _handleHiltClick() {
        this.emit('hiltClicked');
    }
}

/**
 * State definition.
 * @static
 * @type {!Object}
 */
ClayLightsaber.STATE = {
    /**
	 * Flag to indicate if the lightsaber is on or not.
	 * @instance
	 * @memberof ClayLightsaber
	 * @type {?bool}
	 * @default false
	 */
    active: Config.bool().value(false),

    /**
	 * Color of the lightsaber.
	 * @instance
	 * @memberof ClayLightsaber
	 * @type {?string}
	 * @default blue
	 */
    color: Config.oneOf(['red','blue','purple','green']).value('blue'),

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
